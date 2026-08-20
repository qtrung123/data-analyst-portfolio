import { useState } from 'react'
import { Link } from 'react-router-dom'
import Tag from './Tag.jsx'
import StatusBadge from './StatusBadge.jsx'

/**
 * Reusable project card. Renders purely from a project `meta` object,
 * so any future project gets the same card for free.
 *
 * variant="feature" is the wide card used for the flagship project on the
 * homepage; variant="grid" is the standard card used everywhere else.
 */
export default function ProjectCard({ project, variant = 'grid' }) {
  const feature = variant === 'feature'
  const { cover = {} } = project
  // A real screenshot is used as cover art when the project supplies one;
  // the gradient + glyph stays as the fallback for projects without images.
  const [coverFailed, setCoverFailed] = useState(false)
  const showCoverImage = Boolean(cover.image) && !coverFailed

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group relative flex overflow-hidden rounded-2xl bg-ink-900/60 ring-1 ring-ink-800 transition
        hover:ring-accent-500/40 hover:bg-ink-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400
        ${feature ? 'flex-col md:flex-row' : 'flex-col'}`}
    >
      {/* Cover art — gradient + glyph, so no image assets are required. */}
      <div
        className={`relative shrink-0 overflow-hidden ${
          feature ? 'md:w-2/5 h-40 md:h-auto' : 'h-32'
        }`}
        style={{
          backgroundImage: `linear-gradient(135deg, ${cover.from ?? '#1e293b'}, ${
            cover.to ?? '#0f172a'
          })`,
        }}
      >
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:14px_14px]" />
        {showCoverImage && (
          <>
            <img
              src={cover.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              onError={() => setCoverFailed(true)}
              className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            />
            {/* Keeps the glyph and card edge legible over a bright screenshot. */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent" />
          </>
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
          <span className="text-xs font-medium uppercase tracking-wider text-ink-400">
            {project.category} · {project.year}
          </span>
          <StatusBadge status={project.status} />
        </div>

        <h3
          className={`mt-3 font-semibold text-ink-50 group-hover:text-white ${
            feature ? 'text-2xl md:text-3xl' : 'text-lg'
          }`}
        >
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="mt-1 text-sm text-ink-400">{project.subtitle}</p>
        )}

        <p className={`mt-3 text-sm text-ink-300 ${feature ? '' : 'line-clamp-3'}`}>
          {project.summary}
        </p>

        {feature && project.metrics?.length > 0 && (
          <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {project.metrics.slice(0, 3).map((m) => (
              <div key={m.label}>
                <dt className="text-xs text-ink-400">{m.label}</dt>
                <dd className="text-lg font-semibold text-accent-400">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tools.slice(0, feature ? 6 : 4).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
          {project.tools.length > (feature ? 6 : 4) && (
            <Tag tone="muted">+{project.tools.length - (feature ? 6 : 4)}</Tag>
          )}
        </div>

        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-400">
          Read the case study
          <span aria-hidden="true" className="transition group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  )
}
