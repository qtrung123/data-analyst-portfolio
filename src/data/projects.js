/**
 * Project registry.
 *
 * Every project lives in its own folder under `src/content/<slug>/` and exports:
 *   - `meta`    : card + case-study header metadata (see shape below)
 *   - `default` : a React component rendering the case-study body
 *
 * To add a project: create the folder, then add one import + one entry here.
 * Nothing else in the site needs to change.
 *
 * Any user-facing string in `meta` may be either a plain value (identical in
 * both languages) or a `{ en, vi }` object — shared components resolve it via
 * the `tr` helper, so no component contains project-specific language logic.
 *
 * meta shape:
 * {
 *   slug, title, subtitle, summary,
 *   aliases?: string[],                  // extra URL segments that redirect to slug
 *   category, year,
 *   status: 'flagship' | 'live' | 'in-progress' | 'archived' | 'practice',
 *   tier?: 'practice',            // omit for primary work; 'practice' = shown
 *                                  // small, in the homepage More Work section
 *   tools: string[],                     // product names, not translated
 *   card: { problem, built, found },     // the three questions a card answers
 *   metrics: [{ label, value, note? }],  // 3-4, shown on the card and header
 *   cover: { from, to, glyph, image? },
 *   links: [{ label, href }],
 *   sections: [{ id, label }],
 *   featured: boolean,
 * }
 */
import * as terrafirm from '../content/terrafirm/index.jsx'
import * as onlineTicketBooking from '../content/online-ticket-booking/index.jsx'
import * as sqlDataWarehouse from '../content/sql-data-warehouse/index.jsx'
import * as hptana from '../content/hptana/index.jsx'

// Order here = order on the site.
export const projectModules = [terrafirm, onlineTicketBooking, sqlDataWarehouse, hptana]

export const projects = projectModules.map((m) => m.meta)

export const featuredProjects = projects.filter((p) => p.featured)

export function getProjectModule(slug) {
  return projectModules.find((m) => m.meta.slug === slug) ?? null
}

/**
 * Resolves a URL segment to a canonical project slug, honouring any short
 * aliases a project declares in `meta.aliases`. Returns null if unknown.
 */
export function resolveProjectSlug(slug) {
  const match = projectModules.find(
    (m) => m.meta.slug === slug || m.meta.aliases?.includes(slug),
  )
  return match?.meta.slug ?? null
}

export function getProject(slug) {
  return projects.find((p) => p.slug === slug) ?? null
}

/** Adjacent projects, for the next/previous case-study links. */
export function getProjectNeighbours(slug) {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: null, next: null }
  return { prev: projects[i - 1] ?? null, next: projects[i + 1] ?? null }
}

/**
 * Unique categories for the filter chips.
 * Keyed on the English value so a language switch never resets the filter.
 */
export function getCategories() {
  const seen = new Map()
  for (const p of projects) {
    const key = typeof p.category === 'object' ? (p.category.en ?? '') : p.category
    if (!seen.has(key)) seen.set(key, { key, value: p.category })
  }
  return [...seen.values()].sort((a, b) => a.key.localeCompare(b.key))
}
