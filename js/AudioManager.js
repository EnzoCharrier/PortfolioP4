/** Bruitages synthétisés (aucun fichier audio). Le contexte est réveillé au premier geste. */
export class AudioManager {
  #ctx = null;
  #muted = false;

  constructor() {
    const Ctx = window.AudioContext ?? window.webkitAudioContext;
    this.#ctx = Ctx ? new Ctx() : null;
    for (const type of ['keydown', 'pointerdown']) {
      addEventListener(type, () => this.#ctx?.resume(), { once: true });
    }
  }

  toggleMute() {
    this.#muted = !this.#muted;
    return this.#muted;
  }

  beep(freq = 660, duration = 0.07) {
    if (!this.#ctx || this.#muted) return;
    const osc = this.#ctx.createOscillator();
    const gain = this.#ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.05, this.#ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.#ctx.currentTime + duration);
    osc.connect(gain).connect(this.#ctx.destination);
    osc.start();
    osc.stop(this.#ctx.currentTime + duration);
  }
}
