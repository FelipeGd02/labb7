export class TaskCard extends HTMLElement {
  task: any;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set data(task: any) {
    this.task = task;
    this.render();
  }

  render() {
    const { title, description, completed } = this.task;

    this.shadowRoot!.innerHTML = `
      <style>
        .card {
          background: ${completed ? "#321111" : "#121212"};
          border: 2px solid ${completed ? "#ff6f74" : "#ff4655"};
          padding: 1rem 1.2rem;
          border-radius: 12px;
          margin-bottom: 1rem;
          box-shadow:
            0 0 8px ${completed ? "#ff6f74" : "#ff4655"};
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #eee;
          font-family: 'Orbitron', sans-serif;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .info {
          flex-grow: 1;
          user-select: none;
        }
        strong {
          font-size: 1.15rem;
          color: ${completed ? "#ff6f74" : "#ff4655"};
        }
        small {
          display: block;
          margin-top: 0.25rem;
          color: #ccc;
          font-weight: 300;
        }
        button {
          background: transparent;
          border: 2px solid;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 0.3rem 0.6rem;
          cursor: pointer;
          margin-left: 0.7rem;
          transition: all 0.3s ease;
          letter-spacing: 0.07em;
          font-family: 'Orbitron', sans-serif;
        }
        #toggle {
          border-color: ${completed ? "#fbc02d" : "#43a047"};
          color: ${completed ? "#fbc02d" : "#43a047"};
          box-shadow:
            0 0 8px ${completed ? "#fbc02d" : "#43a047"};
        }
        #toggle:hover {
          background: ${completed ? "#fbc02d" : "#43a047"};
          color: #111;
          box-shadow:
            0 0 20px ${completed ? "#fbc02d" : "#43a047"};
        }
        #delete {
          border-color: #e53935;
          color: #e53935;
          box-shadow: 0 0 8px #e53935;
        }
        #delete:hover {
          background: #e53935;
          color: #111;
          box-shadow: 0 0 20px #e53935;
        }
      </style>
      <div class="card">
        <div class="info">
          <strong>${title}</strong>
          <small>${description || ""}</small>
        </div>
        <div>
          <button id="toggle">${completed ? "Desmarcar" : "Completar"}</button>
          <button id="delete">Eliminar</button>
        </div>
      </div>
    `;

    this.shadowRoot?.querySelector("#delete")?.addEventListener("click", () =>
      this.dispatchEvent(new CustomEvent("delete-task", {
        detail: this.task.id,
        bubbles: true,
        composed: true
      }))
    );

    this.shadowRoot?.querySelector("#toggle")?.addEventListener("click", () =>
      this.dispatchEvent(new CustomEvent("toggle-task", {
        detail: this.task.id,
        bubbles: true,
        composed: true
      }))
    );
  }
}

customElements.define("task-card", TaskCard);
