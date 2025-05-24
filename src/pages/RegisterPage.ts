import { registerUser } from "../services/Firebase/UserServiceFB";
import { navigateTo } from "../utils/Navigate";

export class RegisterPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot?.querySelector("form")?.addEventListener("submit", this.handleRegister.bind(this));
  }

  async handleRegister(e: Event) {
    e.preventDefault();
    const email = (this.shadowRoot?.querySelector("#email") as HTMLInputElement).value;
    const password = (this.shadowRoot?.querySelector("#password") as HTMLInputElement).value;

    try {
      await registerUser(email, password);
      navigateTo("/dashboard");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #0e0e0e;
          font-family: 'Orbitron', sans-serif;
          color: #eee;
          padding: 1rem;
        }
        form {
          background: #121212;
          padding: 2rem;
          border-radius: 12px;
          box-shadow:
            0 0 10px #ff4655,
            0 0 20px #ff4655;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          width: 320px;
          text-align: center;
        }
        h2 {
          color: #ff4655;
          margin-bottom: 1rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-shadow: 0 0 10px #ff4655;
        }
        input {
          background: #222;
          border: 2px solid #ff4655;
          border-radius: 8px;
          padding: 0.75rem;
          font-size: 1rem;
          color: #eee;
          outline: none;
          transition: border-color 0.3s ease;
        }
        input:focus {
          border-color: #ff6f74;
          box-shadow: 0 0 8px #ff6f74;
        }
        button {
          background: transparent;
          border: 2px solid #ff4655;
          color: #ff4655;
          padding: 0.8rem 0;
          font-weight: 700;
          font-size: 1.1rem;
          border-radius: 8px;
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
        <h2>Registrar Cuenta</h2>
        <input id="email" type="email" placeholder="Correo electrónico" required />
        <input id="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Registrar</button>
      </form>
    `;
  }
}

customElements.define("register-page", RegisterPage);
