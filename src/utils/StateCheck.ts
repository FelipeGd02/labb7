import Store from "../flux/Store";

export function isUserLoggedIn(): boolean {
  return Store.getUser() !== null;
}

export function hasTasks(): boolean {
  return Store.getTasks().length > 0;
}
