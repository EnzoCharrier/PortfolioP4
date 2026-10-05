import { h } from './dom.js';

const external = { target: '_blank', rel: 'noopener noreferrer' };

const BODY = {
  projects: (s) => [
    h(
      'ul',
      {},
      ...s.items.map((p) =>
        h(
          'li',
          {},
          h('a', { href: p.url, textContent: p.title, ...external }),
          h('p', { textContent: p.description }),
          h('small', { textContent: p.stack.join(', ') }),
        ),
      ),
    ),
  ],
  skills: (s) => [
    h(
      'dl',
      {},
      ...s.items.flatMap((g) => [
        h('dt', { textContent: g.group }),
        h('dd', { textContent: g.list.join(', ') }),
      ]),
    ),
  ],
  text: (s) => s.paragraphs.map((t) => h('p', { textContent: t })),
  links: (s) => [
    h('ul', {}, ...s.items.map((l) => h('li', {}, h('a', { href: l.url, textContent: l.label })))),
  ],
};

/** Construit l'écran d'une section à partir de ses données. */
export function createScreen(section) {
  const titleId = `${section.id}-title`;
  return h(
    'section',
    { id: section.id, className: 'screen', hidden: true, 'aria-labelledby': titleId },
    h('h2', { id: titleId, className: 'banner', tabIndex: -1 }, h('span', { textContent: section.label })),
    h('div', { className: 'panel' }, ...BODY[section.kind](section)),
    h('button', { type: 'button', className: 'hint', textContent: 'Échap : retour', 'data-back': '' }),
  );
}
