import { auth } from "../services/Firebase/FirebaseConfig";
import { addTask, getTasks, deleteTask, updateTask } from "../services/Firebase/PostServiceFB";
import Store from "../flux/Store";
import { Actions } from "../flux/Actions";

export class DashboardPage extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addListeners();
    this.syncTasks();

    Store.addChangeListener(() => this.updateTaskList());
  }

  disconnectedCallback() {
    Store.removeChangeListener(() => this.updateTaskList());
  }

  async syncTasks() {
    const user = auth.currentUser;
    if (user) {
      const tasks = await getTasks(user.uid);
      Actions.setTasks(tasks);
    }
  }

  addListeners() {
    this.shadow.addEventListener("task-created", async (e: any) => {
      const user = auth.currentUser;
      if (user) {
        const newTask = { title: e.detail.title, description: e.detail.description };
        await addTask(user.uid, newTask);
        this.syncTasks();
      }
    });

    this.shadow.addEventListener("delete-task", async (e: any) => {
      await deleteTask(e.detail);
      this.syncTasks();
    });

    this.shadow.addEventListener("toggle-task", async (e: any) => {
      const task = Store.getTasks().find(t => t.id === e.detail);
      if (task) {
        await updateTask(task.id, { completed: !task.completed });
        this.syncTasks();
      }
    });
  }

  updateTaskList() {
    const tasks = Store.getTasks();
    const list = this.shadow.querySelector("task-list") as any;
    if (list) list.data = tasks;
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');
        :host {
          display: block;
          font-family: 'Orbitron', sans-serif;
          color: #eee;
          background-color: #0e0e0e;
          min-height: 100vh;
          padding: 2rem;
        }
        h2 {
          color: #ff4655;
          text-align: center;
          margin-bottom: 1.5rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-shadow:
            0 0 10px #ff4655,
            0 0 20px #ff4655;
        }
        task-form {
          display: block;
          margin-bottom: 2rem;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }
        task-list {
          display: block;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
      </style>
      <h2>Mis Tareas</h2>
      <task-form></task-form>
      <task-list></task-list>
    `;
  }
}

customElements.define("dashboard-page", DashboardPage);
