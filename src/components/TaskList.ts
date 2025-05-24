export class TaskList extends HTMLElement {
  tasks: any[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set data(tasks: any[]) {
    this.tasks = tasks;
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          max-width: 700px;
          margin: 0 auto;
        }
      </style>
      <div id="list">
        ${this.tasks.map(() => `<task-card></task-card>`).join("")}
      </div>
    `;

    const container = this.shadowRoot!.querySelector("#list")!;
    this.tasks.forEach((task, i) => {
      const card = container.children[i] as any;
      card.data = task;
    });
  }
}

customElements.define("task-list", TaskList);
