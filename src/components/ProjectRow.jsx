import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge.jsx'
import Tag from './Tag.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/**
 * One project as a list row: index, then category + title + skill tags, then
 * what was built, why it matters, one or two small preview images and the
 * single key outcome. The whole row is a link. Rows sit under hairline
 * dividers, so a stack of them reads as a numbered list.
 *
 * Previews come from `card.thumbs` (image paths). A project with no
 * screenshots can instead give `card.thumbPills`, shown as a tiny layer strip.
 */
export default function ProjectRow({ project, index }) {
  const { t, tr } = useLanguage()
  const { card = {} } = project
  const skills = (card.skills ?? project.tools ?? []).slice(0, 4)
  const did = tr(card.did) ?? tr(project.summary)
  const purpose = tr(card.purpose)
  const hook = tr(card.hook)
  const thumbs = card.thumbs ?? []
  const pills = card.thumbPills ?? []

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group grid gap-4 border-t border-line px-2 py-8 transition hover:bg-panel-2 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.5fr)] sm:gap-8 sm:px-4"
    >
      <span className="font-mono text-xs text-faint">{index}</span>

      <div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wider text-accent">
          <span>{tr(project.category)}</span>
          {project.status === 'learning' && <StatusBadge status={project.status} />}
        </p>
        <h3 className="mt-2 text-xl font-bold text-heading">{tr(project.title)}</h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {skills.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </div>

      <div>
        {did && <p className="text-body">{did}</p>}
        {purpose && (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            <span className="mr-2 font-mono text-[0.62rem] font-semibold uppercase tracking-widest text-accent">
              {t('card.why')}
            </span>
            {purpose}
          </p>
        )}

        {(thumbs.length > 0 || pills.length > 0) && (
          <div className="mt-4 flex items-stretch gap-3" aria-hidden="true">
            {thumbs.slice(0, 2).map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                loading="lazy"
                className="aspect-[16/10] w-36 rounded-lg border border-line bg-panel-2 object-cover object-top shadow-sm sm:w-40"
              />
            ))}
            {pills.length > 0 && (
              <div className="flex items-center gap-1.5 rounded-lg border border-line bg-panel-2 px-3 py-3">
                {pills.map((p, i) => (
                  <span key={p} className="flex items-center gap-1.5">
                    <span
                      className="rounded-md px-2 py-1 font-mono text-[0.65rem] font-medium text-heading"
                      style={{ backgroundColor: `rgb(79 70 229 / ${0.1 + i * 0.12})` }}
                    >
                      {p}
                    </span>
                    {i < pills.length - 1 && <span className="text-faint">&rsaquo;</span>}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {hook && <p className="mt-4 text-sm font-medium text-heading">{hook}</p>}
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          {t('projects.viewCaseStudy')}
          <span aria-hidden="true" className="transition group-hover:translate-x-0.5">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  )
}
