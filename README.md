# Data Analyst / BI Portfolio

Bilingual (EN/VI), theme-aware portfolio for data analytics and BI case
studies. React + Vite + Tailwind CSS v4, optimised for Netlify.

TerraFirm Safety Analytics is the flagship case study; the site is structured
so further projects — AI Tutor, SQL work, other BI projects — drop in without
redesigning anything or touching the language and theme plumbing.

## Run locally

```bash
npm install
npm run dev
```

Production build and preview:

```bash
npm run build
npm run preview
```

## Adding a new project

1. Copy `src/content/_template/` to `src/content/<your-slug>/`, renaming
   `index.jsx.example` to `index.jsx`, and add a `copy.js` beside it
   (see `src/content/terrafirm/copy.js` for the shape).
2. Fill in the exported `meta` object and the bilingual `copy` object.
3. Register it in [`src/data/projects.js`](src/data/projects.js):

```js
import * as aiTutor from '../content/ai-tutor/index.jsx'

export const projectModules = [terrafirm, aiTutor]
```

The card, the `/projects/<slug>` route, category filters, the sticky section
nav, previous/next links, and both languages all follow from `meta` and
`copy`. No shared component contains project-specific logic.

## Bilingual content

Two helpers, deliberately separate:

| Helper | Use |
| --- | --- |
| `t('nav.projects')` | a UI string from `src/i18n/strings.js` |
| `tr(value)` | resolves a `{ en, vi }` content value, or passes a plain value through |

Any `meta` field may be a plain value (identical in both languages — tool
names, years, numbers) or a `{ en, vi }` object. Long-form case-study copy
lives in the project's `copy.js` as `{ en: {...}, vi: {...} }`, and the
content component selects the active language once — one component, two
languages, no duplicated markup.

Language is stored in `localStorage` under `portfolio-lang` and defaults to
English. URLs stay language-free; there are no `/en` or `/vi` routes.

## Theming

Light and dark are driven entirely by CSS variables in
[`src/index.css`](src/index.css). Components reference semantic roles only —
`surface`, `panel`, `panel-2`, `line`, `heading`, `body`, `muted`, `faint`,
`accent` — so a theme is a variable swap, never a second set of styles.

- First visit follows the OS preference; an explicit choice is stored under
  `portfolio-theme` and wins from then on.
- A small inline script in `index.html` applies the theme before first paint,
  so there is no flash of the wrong theme.
- Light keeps the professional navy identity; dark is charcoal navy, not pure
  black.
- Every text role clears WCAG AA against both surfaces.
- Chart series colours are a validated categorical pair in each theme.

## Project structure

```
src/
  i18n/                  LanguageContext, strings, pick helper
  theme/                 ThemeContext
  components/            Navbar, Footer, ProjectCard, toggles…
    case/CaseBlocks.jsx  case-study building blocks
  layouts/
    CaseStudyLayout.jsx  shared shell for every case study
  content/
    terrafirm/           meta (index.jsx) + bilingual copy (copy.js)
    _template/           starting point for new projects
  data/
    projects.js          the registry — the one file you edit to add work
    site.js              name, role, contact links, skills
  pages/                 Home, Projects, ProjectPage, About, NotFound
  hooks/                 useActiveSection
```

## Assets

- Report screenshots live in `public/projects/<slug>/`. See
  `public/projects/terrafirm/README.md` for the filename map and the
  intrinsic-dimensions rule.
- **The navbar CV link expects `public/cv.pdf`** — drop the file in, or change
  `cvUrl` in [`src/data/site.js`](src/data/site.js). Until then the link 404s.

## Deploying to Netlify

`netlify.toml` is configured (`npm run build` → `dist`, with an SPA fallback so
deep links to case studies resolve). Connect the repo and accept the detected
settings.
