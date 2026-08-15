import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import Tag from '../components/Tag.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { StatRow } from '../components/case/CaseBlocks.jsx'
import { getProjectNeighbours } from '../data/projects.js'
import useActiveSection from '../hooks/useActiveSection.js'

/**
 * Reusable case-study shell: header, stat row, sticky section nav, body,
 * and next/previous navigation. Every project page uses this — the project
 * only supplies `meta` and the body content.
 */
export default function CaseStudyLayout({ meta, children }) {
  const { prev, next } = getProjectNeighbours(meta.slug)
  const sections = meta.sections ?? []
  const activeId = useActiveSection(sections.map((s) => s.id))

  return (
    <article>
      {/* ---------- Header ---------- */}
      <header className="border-b border-ink-800 bg-ink-900/40">
        <Container className="py-14 sm:py-20">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-ink-400 transition hover:text-accent-400"
          >
            <span aria-hidden="true">←</span> All projects
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-widest text-ink-400">
              {meta.category} · {meta.year}
            </span>
            <StatusBadge status={meta.status} />
          </div>

          <h1 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {meta.title}
          </h1>
          {meta.subtitle && (
            <p className="mt-3 max-w-3xl text-lg text-ink-300">{meta.subtitle}</p>
          )}
          <p className="mt-5 max-w-3xl text-ink-300">{meta.summary}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {meta.tools.map((t) => (
              <Tag key={t} tone="accent">
                {t}
              </Tag>
            ))}
          </div>

          {meta.links?.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {meta.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.external === false ? undefined : '_blank'}
                  rel="noreferrer"
                  className="rounded-lg bg-ink-800 px-4 py-2 text-sm font-medium text-ink-100 transition hover:bg-ink-700"
                >
                  {l.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}

          {meta.metrics?.length > 0 && <StatRow stats={meta.metrics} className="mt-10" />}
        </Container>
      </header>

      {/* ---------- Body + sticky nav ---------- */}
      <Container className="py-4">
        <div className="flex gap-12">
          {sections.length > 0 && (
            <nav
              aria-label="Case study sections"
              className="sticky top-24 hidden h-fit w-56 shrink-0 py-12 lg:block"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">
                On this page
              </p>
              <ul className="mt-4 space-y-1 border-l border-ink-800">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`-ml-px block border-l py-1.5 pl-4 text-sm transition ${
                        activeId === s.id
                          ? 'border-accent-500 text-accent-400'
                          : 'border-transparent text-ink-400 hover:text-ink-200'
                      }`}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="min-w-0 flex-1 py-8">{children}</div>
        </div>
      </Container>

      {/* ---------- Prev / next ---------- */}
      <Container className="pb-20">
        <div className="grid gap-4 border-t border-ink-800 pt-8 sm:grid-cols-2">
          {[
            { p: prev, label: 'Previous', align: '' },
            { p: next, label: 'Next', align: 'sm:text-right sm:col-start-2' },
          ].map(({ p, label, align }) =>
            p ? (
              <Link
                key={label}
                to={`/projects/${p.slug}`}
                className={`rounded-xl p-5 ring-1 ring-ink-800 transition hover:ring-accent-500/40 ${align}`}
              >
                <span className="text-xs uppercase tracking-widest text-ink-500">
                  {label}
                </span>
                <p className="mt-1 font-medium text-ink-100">{p.title}</p>
              </Link>
            ) : null,
          )}
        </div>
      </Container>
    </article>
  )
}
