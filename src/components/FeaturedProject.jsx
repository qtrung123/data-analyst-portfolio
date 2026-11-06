import { useState } from 'react'
import { Link } from 'react-router-dom'
import Tag from './Tag.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/**
 * The flagship project as a large tinted panel: a gradient badge, title,
 * one-sentence description, a few skill tags, and a call to action, with a
 * browser-style window around the project's cover screenshot on the right.
 * Reads everything from the project's `meta`, so it works for any project.
 */
export default function FeaturedProject({ project }) {
  const { t, tr } = useLanguage()
  const { card = {}, cover = {} } = project
  const [imgFailed, setImgFailed] = useState(false)
  const skills = (card.skills ?? project.tools ?? []).slice(0, 5)
  const did = tr(card.did) ?? tr(project.summary)
  const to = `/projects/${project.slug}`

  return (
    <article className="grid items-center gap-8 rounded-3xl border border-accent-line bg-gradient-to-br from-accent-soft to-panel p-6 sm:p-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
      <div>
        <span className="btn-grad inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
          <span aria-hidden="true">&#9733;</span>
          {t('work.flagship')}
        </span>
        <h3 className="mt-5 text-3xl font-bold text-heading sm:text-4xl">{tr(project.title)}</h3>
        {did && <p className="mt-4 text-body">{did}</p>}
        <div className="mt-5 flex flex-wrap gap-2">
          {skills.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
        <Link
          to={to}
          className="btn-grad mt-7 inline-block rounded-full px-6 py-3 text-sm font-semibold transition"
        >
          {t('projects.viewCaseStudy')} &rarr;
        </Link>
      </div>

      <Link
        to={to}
        aria-label={tr(project.title)}
        className="group block overflow-hidden rounded-xl border border-line bg-panel shadow-[var(--shadow-card)]"
      >
        <div className="flex items-center gap-1.5 border-b border-line bg-panel-2 px-4 py-2.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-3 truncate font-mono text-[0.65rem] text-faint">{project.slug}</span>
        </div>
        {cover.image && !imgFailed ? (
          <img
            src={cover.image}
            alt=""
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="block h-auto w-full transition duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div
            className="grid aspect-video place-items-center text-6xl"
            style={{ backgroundImage: `linear-gradient(135deg, ${cover.from ?? '#1e293b'}, ${cover.to ?? '#0f172a'})` }}
          >
            {cover.glyph}
          </div>
        )}
      </Link>
    </article>
  )
}
