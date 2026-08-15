# Data Analyst / BI Portfolio

A standalone portfolio site for data analytics and BI case studies. Built with
React + Vite + Tailwind CSS v4, optimised for Netlify.

TerraFirm Safety Analytics is the first (flagship) case study; the site is
structured so additional projects — AI Tutor, SQL analysis, other BI work — drop
in without redesigning anything.

## Run locally

```bash
npm install
npm run dev
```

Build and preview the production bundle:

```bash
npm run build
npm run preview
```

## Adding a new project

1. Copy `src/content/_template/index.jsx.example` to
   `src/content/<your-slug>/index.jsx`.
2. Fill in the exported `meta` object and write the case-study body using the
   blocks from `src/components/case/CaseBlocks.jsx`.
3. Register it in [`src/data/projects.js`](src/data/projects.js):

```js
import * as aiTutor from '../content/ai-tutor/index.jsx'

export const projectModules = [terrafirm, aiTutor]
```

That's it. The card, the `/projects/<slug>` route, the category filter, the
sticky section nav, and the previous/next links are all derived from `meta`.

## Project structure

```
src/
  components/            reusable UI (Navbar, Footer, ProjectCard, ProjectGrid…)
    case/CaseBlocks.jsx  case-study building blocks (sections, stats, tables…)
  layouts/
    CaseStudyLayout.jsx  shared shell for every case study
  content/
    terrafirm/           TerraFirm case study (meta + body)
    _template/           starting point for new projects
  data/
    projects.js          the project registry — the one file you edit to add work
    site.js              name, tagline, contact links, skills
  pages/                 Home, Projects, ProjectPage, About, NotFound
  hooks/                 useActiveSection (sticky nav highlighting)
```

## Case-study blocks

Available from `src/components/case/CaseBlocks.jsx`:

| Block | Use |
| --- | --- |
| `CaseSection` | Titled, anchored section (matches an entry in `meta.sections`) |
| `StatRow` | Headline numbers |
| `Callout` | Pulled-out insight or caveat (`accent`, `warn`, `neutral`) |
| `Bullets` | Consistent bullet list |
| `Steps` | Numbered methodology steps |
| `DataTable` | Simple table with optional caption |
| `CodeBlock` | SQL / DAX / Python snippet |
| `Figure` | Screenshot, with a labelled placeholder when `src` is omitted |

## Images

Put project screenshots in `public/projects/<slug>/` and reference them as
`/projects/<slug>/overview.png`. `Figure` renders a placeholder until you do.

## Theming

Colours, fonts, and spacing tokens live in the `@theme` block at the top of
[`src/index.css`](src/index.css). Changing them re-skins the whole site.

## Deploying to Netlify

`netlify.toml` is already configured (`npm run build` → `dist`, with an SPA
fallback so deep links to case studies resolve). Connect the repo in Netlify and
accept the detected settings — no further configuration needed.
