import { h } from './dom.js';

/** Mesure le FPS au démarrage ; s'il est trop bas, active le mode économique (classe `low-fx`). */
export class PerfMonitor {
  #cfg;
  #box = null;
  #frames = 0;
  #last = performance.now();
  #samples = 0;

  constructor(cfg, { debug = false } = {}) {
    this.#cfg = cfg;
    if (debug) {
      this.#box = h('div', { className: 'fps' });
      document.body.append(this.#box);
    }
  }

  start() {
    requestAnimationFrame((t) => this.#tick(t));
  }

  #tick(now) {
    const { sampleMs, firstCheck, lastCheck, minFps } = this.#cfg;
    this.#frames++;
    if (now - this.#last >= sampleMs) {
      const fps = Math.round((this.#frames * 1000) / (now - this.#last));
      this.#frames = 0;
      this.#last = now;
      this.#samples++;
      if (this.#box) this.#box.textContent = `${fps} FPS`;
      if (this.#samples >= firstCheck && this.#samples <= lastCheck && fps < minFps) {
        document.documentElement.classList.add('low-fx');
      }
    }
    // Hors mode debug, la boucle s'arrête après la phase de mesure : zéro coût ensuite.
    if (this.#box || this.#samples <= lastCheck) requestAnimationFrame((t) => this.#tick(t));
  }
}
