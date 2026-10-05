/**
 * Bruitages synthétisés (aucun fichier audio).
 * Le contexte audio n'est créé qu'au premier geste de l'utilisateur, comme l'exigent les navigateurs :
 * avant ça, beep() ne fait rien (et Chrome n'affiche plus d'avertissement).
 */
export class AudioManager {
  #ctx = null;
  #muted = false;

  constructor() {
    const unlock = () => {
      const Ctx = window.AudioContext ?? window.webkitAudioContext;
      if (Ctx && !this.#ctx) this.#ctx = new Ctx();
      this.#ctx?.resume();
    };
    for (const type of ['keydown', 'pointerdown']) {
      addEventListener(type, unlock, { once: true });
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
