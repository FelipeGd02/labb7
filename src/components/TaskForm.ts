export class TaskForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot?.querySelector("form")?.addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const titleInput = this.shadowRoot?.querySelector<HTMLInputElement>("#title");
    const descriptionInput = this.shadowRoot?.querySelector<HTMLInputElement>("#description");

    const title = titleInput?.value.trim();
    const description = descriptionInput?.value.trim();

    if (title) {
      const event = new CustomEvent("task-created", {
        detail: { title, description },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
      titleInput!.value = "";
      descriptionInput!.value = "";
    }
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        form {
          display: flex;
          flex-direction: column;
          gap: 14px;
          background: #121212;
          padding: 1.2rem 1.5rem;
          border-radius: 12px;
          box-shadow:
            0 0 8px #ff4655,
            0 0 20px #ff4655;
        }
        input {
          background: #222;
          border: 2px solid #ff4655;
          border-radius: 10px;
          padding: 1rem;
          font-size: 1.1rem;
          color: #eee;
          outline: none;
          transition: border-color 0.3s ease;
        }
        input:focus {
          border-color: #ff6f74;
          box-shadow: 0 0 10px #ff6f74;
        }
        button {
          background: transparent;
          border: 2px solid #ff4655;
          color: #ff4655;
          padding: 1rem 0;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 10px;
          cursor: pointer;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          box-shadow:
            0 0 8px #ff4655,
            0 0 20px #ff4655;
          transition: all 0.3s ease;
        }
        button:hover {
          background: #ff4655;
          color: #111;
          box-shadow:
            0 0 20px #ff4655,
            0 0 40px #ff4655;
          transform: scale(1.05);
        }
      </style>

      <form>
        <input id="title" type="text" placeholder="Título de la tarea" required />
        <input id="description" type="text" placeholder="Descripción (opcional)" />
        <button type="submit">Agregar Tarea</button>
      </form>
    `;
  }
}

customElements.define("task-form", TaskForm);
