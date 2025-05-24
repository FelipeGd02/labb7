import { auth } from "../services/Firebase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import "../pages/LandingPage";
import "../pages/LoginPage";
import "../pages/RegisterPage";
import "../pages/DashboardPage";

export class RootComponent extends HTMLElement {
  currentRoute: string = "/";
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.handleRouting();
    window.addEventListener("popstate", () => this.handleRouting());
    window.addEventListener("navigate", (e: any) => this.changeRoute(e.detail));
    onAuthStateChanged(auth, () => this.handleRouting());
  }

  changeRoute(route: string) {
    history.pushState({}, "", route);
    this.handleRouting();
  }

  handleRouting() {
    const route = window.location.pathname;

    const user = auth.currentUser;

    let pageTag = "";

    if (!user && route === "/dashboard") {
      return this.changeRoute("/login"); 
    }

    switch (route) {
      case "/":
        pageTag = "landing-page";
        break;
      case "/login":
        pageTag = "login-page";
        break;
      case "/register":
        pageTag = "register-page";
        break;
      case "/dashboard":
        pageTag = "dashboard-page";
        break;
      default:
        pageTag = "landing-page";
        break;
    }

    this.shadow.innerHTML = `<${pageTag}></${pageTag}>`;
  }
}

customElements.define("root-component", RootComponent);
