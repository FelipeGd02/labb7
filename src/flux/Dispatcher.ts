type Callback = (payload: any) => void;

class Dispatcher {
  private callbacks: Callback[] = [];

  register(callback: Callback) {
    this.callbacks.push(callback);
  }

  dispatch(payload: any) {
    for (const cb of this.callbacks) {
      cb(payload);
    }
  }
}

export default new Dispatcher();
