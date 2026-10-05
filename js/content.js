/** Contenu du portfolio : la seule chose à modifier pour changer les textes. */
export const SECTIONS = [
  {
    id: 'projects',
    label: 'Projets',
    kind: 'projects',
    items: [
      {
        title: 'Projet 1',
        description: 'Une phrase sur le problème résolu.',
        stack: ['Symfony', 'MySQL'],
        url: 'https://github.com/',
      },
      {
        title: 'Projet 2',
        description: 'Une phrase sur le problème résolu.',
        stack: ['C#', '.NET'],
        url: 'https://github.com/',
      },
    ],
  },
  {
    id: 'skills',
    label: 'Compétences',
    kind: 'skills',
    items: [
      { group: 'Back-end', list: ['PHP', 'Symfony', 'C#'] },
      { group: 'Front-end', list: ['HTML', 'CSS', 'JavaScript'] },
    ],
  },
  {
    id: 'about',
    label: 'À propos',
    kind: 'text',
    paragraphs: ['Écris ici ta présentation en 3 ou 4 phrases.'],
  },
  {
    id: 'contact',
    label: 'Contact',
    kind: 'links',
    items: [
      { label: 'toi@exemple.fr', url: 'mailto:toi@exemple.fr' },
      { label: 'GitHub', url: 'https://github.com/' },
    ],
  },
];
