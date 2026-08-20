import { useState } from 'react'
import { Link } from 'react-router-dom'
import Tag from './Tag.jsx'
import StatusBadge from './StatusBadge.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/**
 * Reusable project card. Renders purely from a project `meta` object, so any
 * future project gets the same card for free. Bilingual fields are resolved
 * through `tr` — the card knows nothing about a specific project.
 *
 * variant="feature" is the wide card used for the flagship project;
 * variant="grid" is the standard card used everywhere else.
 */
export default function ProjectCard({ project, variant = 'grid' }) {
  const { t, tr } = useLanguage()
  const feature = variant === 'feature'
  const { cover = {}, card = {} } = project
  const [coverFailed, setCoverFailed] = useState(false)
  const showCoverImage = Boolean(cover.image) && !coverFailed

  // The three questions a recruiter should be able to answer in seconds.
  const facts = [
    { label: t('card.problem'), value: tr(card.problem) },
    { label: t('card.built'), value: tr(card.built) ?? tr(project.summary) },
    { label: t('card.found'), value: tr(card.found) },
  ].filter((f) => f.value)

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group relative flex overflow-hidden rounded-2xl bg-panel ring-1 ring-line transition
        hover:ring-accent-line focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
        ${feature ? 'flex-col md:flex-row' : 'flex-col'}`}
    >
      <div
        className={`relative shrink-0 overflow-hidden ${
          feature ? 'h-44 md:h-auto md:w-2/5' : 'h-36'
        }`}
        style={{
          backgroundImage: `linear-gradient(135deg, ${cover.from ?? '#1e293b'}, ${
            cover.to ?? '#0f172a'
          })`,
        }}
      >
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:14px_14px]" />
        {showCoverImage && (
          <img
            src={cover.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            onError={() => setCoverFailed(true)}
            className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
          />
        )}
        {/* The glyph stands in for cover art; a real screenshot replaces it. */}
        {!showCoverImage && (
          <span className="absolute bottom-3 left-4 text-4xl leading-none opacity-90 md:text-5xl">
            {cover.glyph ?? '📊'}
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col p-6 ${feature ? 'md:p-8' : ''}`}>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-muted">
            {tr(project.category)} &middot; {project.year}
          </span>
          <StatusBadge status={project.status} />
        </div>

        <h3
          className={`mt-3 font-semibold text-heading ${
            feature ? 'text-2xl md:text-3xl' : 'text-lg'
          }`}
        >
          {tr(project.title)}
        </h3>
        {project.subtitle && (
          <p className="mt-1 text-sm font-medium text-accent">{tr(project.subtitle)}</p>
        )}

        <dl className="mt-4 space-y-1.5 text-sm">
          {facts.map((f) => (
            <div key={f.label} className="flex gap-2">
              <dt className="shrink-0 text-xs font-semibold uppercase tracking-wide text-faint">
                {f.label}
              </dt>
              <dd className="min-w-0 text-body">{f.value}</dd>
            </div>
          ))}
        </dl>

        {project.metrics?.length > 0 && (
          <dl
            className={`mt-5 grid gap-4 ${
              feature ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2'
            }`}
          >
            {project.metrics.slice(0, 4).map((m) => (
              <div key={tr(m.label)}>
                <dt className="text-xs text-muted">{tr(m.label)}</dt>
                <dd className="text-base font-semibold text-heading">{tr(m.value)}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tools.slice(0, feature ? 6 : 4).map((tool) => (
            <Tag key={tool}>{tool}</Tag>
          ))}
          {project.tools.length > (feature ? 6 : 4) && (
            <Tag tone="muted">+{project.tools.length - (feature ? 6 : 4)}</Tag>
          )}
        </div>

        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          {t('projects.viewCaseStudy')}
          <span aria-hidden="true" className="transition group-hover:translate-x-0.5">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  )
}
