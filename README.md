# Portfolio style Persona 4

Portfolio en JavaScript natif (modules ES), sans bundler ni framework.

## Lancer

Ouvre le dossier dans VS Code et démarre **Live Server** (les modules ES exigent un serveur, pas `file://`).
Ajoute `?fps` à l'URL pour afficher le compteur de FPS.

## Structure

| Fichier                    | Rôle                                                               |
| -------------------------- | ------------------------------------------------------------------ |
| `js/content.js`            | Tous les textes et projets (seul fichier à éditer pour le contenu) |
| `js/config.js`             | Constantes de réglage                                              |
| `js/views.js`, `js/dom.js` | Construction du DOM à partir des données                           |
| `js/ScreenManager.js`      | Écran courant et transitions                                       |
| `js/Menu.js`               | Menu et sélection                                                  |
| `js/TvStatic.js`           | Effet de bruit de télé                                             |
| `js/AudioManager.js`       | Bruitages et sourdine (touche M)                                   |
| `js/PerfMonitor.js`        | Mesure du FPS et mode économique                                   |
| `js/main.js`               | Assemblage de l'ensemble                                           |

## Outils

```bash
npm install
npm run lint          # ESLint
npm run format        # Prettier
```

## Git

```bash
git init && git add . && git commit -m "feat: structure initiale du portfolio"
```

Commits courts au format `type: message` (`feat`, `fix`, `refactor`, `docs`, `chore`), une idée par commit.

## Conventions

- Un module = une responsabilité ; l'état interne des classes est privé (`#champ`).
- Le contenu vit dans `content.js`, jamais dans le code.
- Le DOM se construit avec `textContent`, jamais `innerHTML`.
- Animations : uniquement `transform` et `opacity`, et `prefers-reduced-motion` respecté.
