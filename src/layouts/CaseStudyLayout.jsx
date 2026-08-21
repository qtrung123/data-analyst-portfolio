import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import Tag from '../components/Tag.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { StatRow } from '../components/case/CaseBlocks.jsx'
import { getProjectNeighbours } from '../data/projects.js'
import useActiveSection from '../hooks/useActiveSection.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/**
 * Reusable case-study shell: header, stat row, sticky section nav, body, and
 * next/previous navigation. Every project uses this — the project supplies
 * `meta` and its body. Bilingual fields resolve through `tr`, so the layout
 * stays project-agnostic.
 */
export default function CaseStudyLayout({ meta, children }) {
  const { t, tr } = useLanguage()
  const { prev, next } = getProjectNeighbours(meta.slug)
  const sections = meta.sections ?? []
  const activeId = useActiveSection(sections.map((s) => s.id))

  return (
    <article>
      <header className="border-b border-line bg-panel/60">
        <Container className="py-12 sm:py-16">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-accent"
          >
            <span aria-hidden="true">&larr;</span> {t('case.back')}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-widest text-muted">
              {tr(meta.category)}
              {meta.year && <> &middot; {meta.year}</>}
            </span>
            <StatusBadge status={meta.status} />
          </div>

          <h1 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-heading sm:text-5xl">
            {tr(meta.title)}
          </h1>
          {meta.subtitle && (
            <p className="mt-3 max-w-3xl text-lg font-medium text-accent">
              {tr(meta.subtitle)}
            </p>
          )}
          <p className="mt-4 max-w-3xl text-body">{tr(meta.summary)}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {meta.tools.map((tool) => (
              <Tag key={tool} tone="accent">
                {tool}
              </Tag>
            ))}
          </div>

          {meta.links?.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {meta.links.map((l) => (
                <a
                  key={tr(l.label)}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-panel-2 px-4 py-2 text-sm font-medium text-heading ring-1 ring-line transition hover:ring-accent-line"
                >
                  {tr(l.label)} <span aria-hidden="true">&#8599;</span>
                </a>
              ))}
            </div>
          )}

          {meta.metrics?.length > 0 && (
            <StatRow
              className="mt-10"
              stats={meta.metrics.map((m) => ({
                label: tr(m.label),
                value: tr(m.value),
                note: tr(m.note),
              }))}
            />
          )}
        </Container>
      </header>

      <Container className="py-4">
        <div className="flex gap-12">
          {sections.length > 0 && (
            <nav
              aria-label={t('case.onThisPage')}
              className="sticky top-24 hidden h-fit w-56 shrink-0 py-12 lg:block"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-faint">
                {t('case.onThisPage')}
              </p>
              <ul className="mt-4 space-y-1 border-l border-line">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`-ml-px block border-l py-1.5 pl-4 text-sm transition ${
                        activeId === s.id
                          ? 'border-accent text-accent'
                          : 'border-transparent text-muted hover:text-heading'
                      }`}
                    >
                      {tr(s.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="min-w-0 flex-1 py-8">{children}</div>
        </div>
      </Container>

      <Container className="pb-20">
        <div className="grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
          {[
            { p: prev, label: t('case.previous'), align: '' },
            { p: next, label: t('case.next'), align: 'sm:text-right sm:col-start-2' },
          ].map(({ p, label, align }) =>
            p ? (
              <Link
                key={label}
                to={`/projects/${p.slug}`}
                className={`rounded-xl p-5 ring-1 ring-line transition hover:ring-accent-line ${align}`}
              >
                <span className="text-xs uppercase tracking-widest text-faint">
                  {label}
                </span>
                <p className="mt-1 font-medium text-heading">{tr(p.title)}</p>
              </Link>
            ) : null,
          )}
        </div>
      </Container>
    </article>
  )
}
