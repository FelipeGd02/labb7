import Dispatcher from "./Dispatcher";
export type State = {
  user: any;
  tasks: any[];
};


type Listener = () => void;

class Store {
  private user: any = null;
  private tasks: any[] = [];
  private listeners: Listener[] = [];

  constructor() {
    Dispatcher.register(this.handleAction.bind(this));
  }

  private handleAction(action: any) {
    switch (action.type) {
      case "LOGIN":
        this.user = action.payload;
        break;
      case "LOGOUT":
        this.user = null;
        this.tasks = [];
        break;
      case "SET_TASKS":
        this.tasks = action.payload;
        break;
      case "ADD_TASK":
        this.tasks.push(action.payload);
        break;
      case "DELETE_TASK":
        this.tasks = this.tasks.filter(t => t.id !== action.payload);
        break;
      case "TOGGLE_TASK":
        this.tasks = this.tasks.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        );
        break;
    }

    this.emitChange();
  }

  getUser() {
    return this.user;
  }

  getTasks() {
    return this.tasks;
  }

  addChangeListener(fn: Listener) {
    this.listeners.push(fn);
  }

  removeChangeListener(fn: Listener) {
    this.listeners = this.listeners.filter(l => l !== fn);
  }

  private emitChange() {
    this.listeners.forEach(fn => fn());
  }
}

export default new Store();
