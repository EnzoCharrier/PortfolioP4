import { CONFIG } from './config.js';
import { SECTIONS } from './content.js';
import { createScreen } from './views.js';
import { AudioManager } from './AudioManager.js';
import { TvStatic } from './TvStatic.js';
import { ScreenManager } from './ScreenManager.js';
import { Menu } from './Menu.js';
import { PerfMonitor } from './PerfMonitor.js';

const root = document.getElementById('app');
SECTIONS.forEach((section) => root.append(createScreen(section)));

const audio = new AudioManager();
const tv = new TvStatic(document.getElementById('tv'), {
  duration: CONFIG.transitionMs,
  downscale: CONFIG.staticDownscale,
});
const menu = new Menu(document.getElementById('menu-list'), SECTIONS, {
  audio,
  onChoose: (id) => screens.goTo(id),
});
const screens = new ScreenManager(root, tv, {
  initial: 'menu',
  // Gestion du focus : on place le focus sur le nouvel écran pour le clavier et les lecteurs d'écran.
  onShow: (id, el) => (id === 'menu' ? menu.focus() : el.querySelector('.banner').focus()),
});

const goHome = () => {
  audio.beep(400);
  screens.goTo('menu');
};

root.addEventListener('click', (e) => {
  if (e.target.closest('[data-back]')) goHome();
});

addEventListener('keydown', (e) => {
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  const onMenu = screens.current === 'menu';
  if (e.key === 'ArrowDown' && onMenu) {
    e.preventDefault();
    menu.move(1);
  } else if (e.key === 'ArrowUp' && onMenu) {
    e.preventDefault();
    menu.move(-1);
  } else if (e.key === 'Escape' && !onMenu) {
    goHome();
  } else if (e.key.toLowerCase() === 'm') {
    audio.toggleMute();
  }
});

menu.focus();
new PerfMonitor(CONFIG.perf, { debug: new URLSearchParams(location.search).has('fps') }).start();
