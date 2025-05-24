export function navigateTo(path: string) {
  window.dispatchEvent(new CustomEvent("navigate", { detail: path }));
}
