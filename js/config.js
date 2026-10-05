/** Réglages centralisés : on change une valeur ici, pas dans dix fichiers. */
export const CONFIG = Object.freeze({
  transitionMs: 300,
  staticDownscale: 8,
  perf: Object.freeze({ minFps: 45, sampleMs: 500, firstCheck: 2, lastCheck: 4 }),
});
