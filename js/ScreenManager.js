/** Gère l'écran affiché. Verrouille pendant une transition pour éviter les doubles déclenchements. */
export class ScreenManager {
  #screens;
  #current;
  #tv;
  #onShow;
  #busy = false;

  constructor(root, tv, { initial, onShow }) {
    this.#screens = new Map([...root.querySelectorAll('.screen')].map((el) => [el.id, el]));
    this.#current = initial;
    this.#tv = tv;
    this.#onShow = onShow;
  }

  get current() {
    return this.#current;
  }

  async goTo(id) {
    if (this.#busy || id === this.#current || !this.#screens.has(id)) return;
    this.#busy = true;
    try {
      await this.#tv.play(() => this.#swap(id));
    } finally {
      this.#busy = false;
    }
  }

  #swap(id) {
    this.#screens.get(this.#current).hidden = true;
    const next = this.#screens.get(id);
    next.hidden = false;
    this.#current = id;
    this.#onShow(id, next);
  }
}
