import Dispatcher from "./Dispatcher";

export const Actions = {
  login(user: any) {
    Dispatcher.dispatch({ type: "LOGIN", payload: user });
  },

  logout() {
    Dispatcher.dispatch({ type: "LOGOUT" });
  },

  setTasks(tasks: any[]) {
    Dispatcher.dispatch({ type: "SET_TASKS", payload: tasks });
  },

  addTask(task: any) {
    Dispatcher.dispatch({ type: "ADD_TASK", payload: task });
  },

  deleteTask(taskId: string) {
    Dispatcher.dispatch({ type: "DELETE_TASK", payload: taskId });
  },

  toggleTask(taskId: string) {
    Dispatcher.dispatch({ type: "TOGGLE_TASK", payload: taskId });
  }
};
