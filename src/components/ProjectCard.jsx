import { useState } from 'react'
import { Link } from 'react-router-dom'
import Tag from './Tag.jsx'
import StatusBadge from './StatusBadge.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/**
 * Reusable project card, built to be read in a few seconds.
 *
 * Four elements, always in the same order:
 *   title → what I did (one sentence) → skill tags → key outcome → CTA
 *
 * Renders purely from a project `meta` object, so any future project gets the
 * same card for free. Bilingual fields resolve through `tr`, so the card knows
 * nothing about a specific project.
 *
 * Variants:
 *   feature — the wide card used for the flagship project
 *   grid    — the standard card used for other primary work
 *   compact — a smaller, lower-emphasis card for secondary/practice projects;
 *             says the same four things, just without the accent-highlighted
 *             outcome box or the cover-art panel
 */
export default function ProjectCard({ project, variant = 'grid' }) {
  const { t, tr } = useLanguage()
  const feature = variant === 'feature'
  const compact = variant === 'compact'
  const { cover = {}, card = {} } = project
  const [coverFailed, setCoverFailed] = useState(false)
  const showCoverImage = Boolean(cover.image) && !coverFailed

  // A project may name its own card skills; otherwise fall back to its tools.
  const skills = (card.skills ?? project.tools ?? []).slice(0, compact ? 4 : 6)
  const did = tr(card.did) ?? tr(project.summary)
  const hook = tr(card.hook)

  if (compact) {
    return (
      <Link
        to={`/projects/${project.slug}`}
        className="group flex items-start gap-4 rounded-xl bg-panel p-4 ring-1 ring-line transition
          hover:ring-accent-line focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:p-5"
      >
        <span
          aria-hidden="true"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-xl ring-1 ring-line"
          style={{
            backgroundImage: `linear-gradient(135deg, ${cover.from ?? '#1e293b'}, ${
              cover.to ?? '#0f172a'
            })`,
          }}
        >
          {cover.glyph ?? '📊'}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="font-semibold text-heading">{tr(project.title)}</h3>
            <StatusBadge status={project.status} />
          </div>

          {did && <p className="mt-1 text-sm text-muted">{did}</p>}

          {skills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <Tag key={skill} tone="muted" className="text-[0.7rem]">
                  {skill}
                </Tag>
              ))}
            </div>
          )}

          {hook && <p className="mt-2 text-xs text-faint">{hook}</p>}

          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent">
            {t('projects.viewCaseStudy')}
            <span aria-hidden="true" className="transition group-hover:translate-x-0.5">
              &rarr;
            </span>
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group relative flex overflow-hidden rounded-2xl bg-panel ring-1 ring-line transition
        hover:ring-accent-line focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
        ${feature ? 'flex-col md:flex-row' : 'flex-col'}`}
    >
      <div
        className={`relative shrink-0 overflow-hidden ${
          feature ? 'h-44 md:h-auto md:w-2/5' : 'h-32'
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

        {/* 1. Title */}
        <h3
          className={`mt-2 font-semibold text-heading ${
            feature ? 'text-2xl md:text-3xl' : 'text-lg'
          }`}
        >
          {tr(project.title)}
        </h3>

        {/* 2. What I did — one sentence, about two lines */}
        {did && (
          <p className={`mt-2 text-body ${feature ? 'text-base' : 'text-sm'}`}>{did}</p>
        )}

        {/* 3. Skill tags */}
        {skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </div>
        )}

        {/* 4. Key outcome — the one number or result worth remembering */}
        {hook && (
          <p className="mt-4 border-l-2 border-accent bg-accent-soft px-3 py-2 text-sm text-heading">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-accent">
              {t('card.outcome')}
            </span>
            {hook}
          </p>
        )}

        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-accent">
          {t('projects.viewCaseStudy')}
          <span aria-hidden="true" className="transition group-hover:translate-x-0.5">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  )
}
