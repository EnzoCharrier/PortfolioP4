/** Transition « bruit de télé ». Les buffers sont alloués une seule fois. */
export class TvStatic {
  #canvas;
  #ctx;
  #duration;
  #downscale;
  #img;
  #px;

  constructor(canvas, { duration, downscale }) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext('2d');
    this.#duration = duration;
    this.#downscale = downscale;
    this.#resize();
    addEventListener('resize', () => this.#resize());
  }

  #resize() {
    this.#canvas.width = Math.ceil(innerWidth / this.#downscale);
    this.#canvas.height = Math.ceil(innerHeight / this.#downscale);
    this.#img = this.#ctx.createImageData(this.#canvas.width, this.#canvas.height);
    this.#px = new Uint32Array(this.#img.data.buffer);
  }

  #noise() {
    for (let i = 0; i < this.#px.length; i++) {
      const v = (Math.random() * 255) | 0;
      this.#px[i] = 0xff000000 | (v << 16) | (v << 8) | v; // gris opaque (symétrique : sans souci d'endianness)
    }
    this.#ctx.putImageData(this.#img, 0, 0);
  }

  /** Joue le bruit ; appelle `swap` à mi-parcours. Résolu quand la transition est finie. */
  play(swap) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      swap();
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const start = performance.now();
      let swapped = false;
      this.#canvas.hidden = false;
      const frame = (now) => {
        const elapsed = now - start;
        if (!swapped && elapsed >= this.#duration / 2) {
          swap();
          swapped = true;
        }
        if (elapsed < this.#duration) {
          this.#noise();
          requestAnimationFrame(frame);
        } else {
          this.#canvas.hidden = true;
          resolve();
        }
      };
      requestAnimationFrame(frame);
    });
  }
}
