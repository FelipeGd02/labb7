import { navigateTo } from "../utils/Navigate";

export class LandingPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot?.querySelector("#login")?.addEventListener("click", () => navigateTo("/login"));
    this.shadowRoot?.querySelector("#register")?.addEventListener("click", () => navigateTo("/register"));
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');

        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: #0e0e0e;
          color: #eee;
          font-family: 'Orbitron', sans-serif;
          text-align: center;
          padding: 2rem;
        }

        h1 {
          font-size: 3.5rem;
          letter-spacing: 0.15em;
          margin-bottom: 0.5rem;
          color: #ff4655; /* rojo Valorant */
          text-shadow:
            0 0 10px #ff4655,
            0 0 20px #ff4655;
        }

        p {
          font-size: 1.3rem;
          margin-bottom: 2rem;
          color: #ccc;
          text-shadow: 0 0 5px #ff4655aa;
          max-width: 500px;
        }

        .btn-container {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        button {
          background: transparent;
          border: 2px solid #ff4655;
          color: #ff4655;
          padding: 1rem 2.5rem;
          font-size: 1.25rem;
          cursor: pointer;
          border-radius: 6px;
          font-weight: 700;
          transition: all 0.3s ease;
          box-shadow:
            0 0 5px #ff4655,
            0 0 10px #ff4655,
            0 0 20px #ff4655;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        button:hover {
          background: #ff4655;
          color: #111;
          box-shadow:
            0 0 20px #ff4655,
            0 0 40px #ff4655,
            0 0 60px #ff4655;
          transform: scale(1.05);
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 2.5rem;
          }
          button {
            padding: 0.8rem 2rem;
            font-size: 1rem;
          }
        }
      </style>

      <h1>GESTOR DE TAREAS</h1>
      <p>Organiza tus misiones diarias. ¡Mantén el control y domina el día!</p>
      <div class="btn-container">
        <button id="login">Iniciar Sesión</button>
        <button id="register">Registrarse</button>
      </div>
    `;
  }
}

customElements.define("landing-page", LandingPage);
