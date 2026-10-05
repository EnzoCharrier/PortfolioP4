import { h } from './dom.js';

/** Menu principal : de vrais <button>, donc Entrée, Tab et le lecteur d'écran fonctionnent nativement. */
export class Menu {
  #buttons;
  #index = 0;
  #audio;

  constructor(list, sections, { audio, onChoose }) {
    this.#audio = audio;
    this.#buttons = sections.map((section, i) => {
      const button = h('button', { type: 'button', textContent: section.label });
      button.addEventListener('mouseenter', () => this.select(i));
      button.addEventListener('focus', () => this.select(i));
      button.addEventListener('click', () => {
        audio.beep(990);
        onChoose(section.id);
      });
      list.append(h('li', {}, button));
      return button;
    });
    this.#render();
  }

  select(i) {
    const next = (i + this.#buttons.length) % this.#buttons.length;
    if (next !== this.#index) {
      this.#index = next;
      this.#render();
      this.#audio.beep(520 + next * 60);
    }
    this.#buttons[next].focus({ preventScroll: true });
  }

  move(delta) {
    this.select(this.#index + delta);
  }

  focus() {
    this.#buttons[this.#index].focus();
  }

  #render() {
    this.#buttons.forEach((button, k) => {
      const on = k === this.#index;
      button.classList.toggle('sel', on);
      button.setAttribute('aria-current', String(on));
    });
  }
}
