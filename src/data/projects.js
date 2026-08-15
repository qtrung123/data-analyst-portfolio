/**
 * Project registry.
 *
 * Every project lives in its own folder under `src/content/<slug>/` and exports:
 *   - `meta`    : the card + case-study header metadata (see shape below)
 *   - `default` : a React component rendering the case-study body
 *
 * To add a project: create the folder, then add one import + one entry here.
 * Nothing else in the site needs to change.
 *
 * meta shape:
 * {
 *   slug, title, subtitle, summary, category, year,
 *   status: 'flagship' | 'live' | 'in-progress' | 'archived',
 *   tools: string[],
 *   metrics: [{ label, value, note? }],   // shown as the case-study stat row
 *   cover: { from, to, glyph },           // gradient card art, no image needed
 *   links: [{ label, href, external? }],
 *   featured: boolean,
 * }
 */
import * as terrafirm from '../content/terrafirm/index.jsx'

// Order here = order on the site.
export const projectModules = [terrafirm]

export const projects = projectModules.map((m) => m.meta)

export const featuredProjects = projects.filter((p) => p.featured)

export function getProjectModule(slug) {
  return projectModules.find((m) => m.meta.slug === slug) ?? null
}

export function getProject(slug) {
  return projects.find((p) => p.slug === slug) ?? null
}

/** Adjacent projects, for the "next case study" footer link. */
export function getProjectNeighbours(slug) {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: null, next: null }
  return {
    prev: projects[i - 1] ?? null,
    next: projects[i + 1] ?? null,
  }
}

/** Unique category list for filter chips on the projects page. */
export function getCategories() {
  return [...new Set(projects.map((p) => p.category))].sort()
}
