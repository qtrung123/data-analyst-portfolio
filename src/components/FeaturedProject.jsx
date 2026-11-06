import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Tag from './Tag.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/**
 * The flagship project as a large tinted panel: a gradient badge, title,
 * description, why it matters, a few skill tags and a call to action, with a
 * browser-style window on the right.
 *
 * If the project defines `meta.gallery` (an array of { src, name, label }),
 * the window becomes a carousel over all of them, with previous/next buttons,
 * numbered page pills and arrow-key support, so a visitor can browse every
 * report page without leaving the homepage. Without a gallery it shows the
 * single cover image. Reads everything from the project's `meta`.
 */
export default function FeaturedProject({ project }) {
  const { t, tr } = useLanguage()
  const { card = {}, cover = {}, gallery = [] } = project
  const slides = gallery.length ? gallery : cover.image ? [{ src: cover.image }] : []
  const [i, setI] = useState(0)
  const skills = (card.skills ?? project.tools ?? []).slice(0, 5)
  const did = tr(card.did) ?? tr(project.summary)
  const purpose = tr(card.purpose)
  const to = `/projects/${project.slug}`
  const many = slides.length > 1
  const current = slides[i]

  const go = (step) => setI((cur) => (cur + step + slides.length) % slides.length)

  // Warm the cache for the next slide so paging feels instant.
  useEffect(() => {
    if (!many) return
    const next = new Image()
    next.src = slides[(i + 1) % slides.length].src
  }, [i, many, slides])

  return (
    <article className="grid items-center gap-8 rounded-3xl border border-accent-line bg-gradient-to-br from-accent-soft to-panel p-6 sm:p-10 lg:grid-cols-[0.95fr_1.25fr] lg:gap-10">
      <div>
        <span className="btn-grad inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
          <span aria-hidden="true">&#9733;</span>
          {t('work.flagship')}
        </span>
        <h3 className="mt-5 text-3xl font-bold text-heading sm:text-4xl">{tr(project.title)}</h3>
        {did && <p className="mt-4 text-body">{did}</p>}
        {purpose && (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            <span className="mr-2 font-mono text-[0.62rem] font-semibold uppercase tracking-widest text-accent">
              {t('card.why')}
            </span>
            {purpose}
          </p>
        )}
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

      <div
        className="min-w-0 outline-none"
        tabIndex={many ? 0 : undefined}
        onKeyDown={(e) => {
          if (!many) return
          if (e.key === 'ArrowRight') go(1)
          if (e.key === 'ArrowLeft') go(-1)
        }}
      >
        <div className="overflow-hidden rounded-xl border border-line bg-panel shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-1.5 border-b border-line bg-panel-2 px-4 py-2.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="ml-3 truncate font-mono text-[0.65rem] text-faint">{project.slug}</span>
          </div>

          <div className="relative aspect-[16/9] bg-panel-2">
            {slides.length === 0 ? (
              <div
                className="grid h-full place-items-center text-6xl"
                style={{ backgroundImage: `linear-gradient(135deg, ${cover.from ?? '#1e293b'}, ${cover.to ?? '#0f172a'})` }}
              >
                {cover.glyph}
              </div>
            ) : (
              slides.map((s, n) => (
                <img
                  key={s.src}
                  src={s.src}
                  alt={n === i && s.label ? `${tr(s.name)}: ${tr(s.label)}` : ''}
                  aria-hidden={n === i ? undefined : true}
                  loading={n === 0 ? 'eager' : 'lazy'}
                  className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
                    n === i ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                />
              ))
            )}

            {many && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={t('gallery.prev')}
                  className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-panel/90 text-heading shadow-md backdrop-blur transition hover:border-accent-line hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  &lsaquo;
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={t('gallery.next')}
                  className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-panel/90 text-heading shadow-md backdrop-blur transition hover:border-accent-line hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  &rsaquo;
                </button>
              </>
            )}
          </div>
        </div>

        {many && (
          <div className="mt-4 flex items-start justify-between gap-4" aria-live="polite">
            <div className="min-h-[5.5rem] min-w-0">
              <p className="text-sm font-semibold text-heading">
                {tr(current.name)}
                {current.label && (
                  <span className="font-normal text-muted"> &middot; {tr(current.label)}</span>
                )}
              </p>
              {current.helps && (
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{tr(current.helps)}</p>
              )}
            </div>
            <span className="shrink-0 pt-0.5 font-mono text-xs text-faint">
              {i + 1}/{slides.length}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}
