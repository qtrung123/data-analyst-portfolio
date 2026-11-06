import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge.jsx'
import Tag from './Tag.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/**
 * One project as a list row: index, then category + title + skill tags, then
 * a one-sentence description with the single key outcome. The whole row is a
 * link. Sits under hairline dividers, so a stack of them reads as a list.
 */
export default function ProjectRow({ project, index }) {
  const { t, tr } = useLanguage()
  const { card = {} } = project
  const skills = (card.skills ?? project.tools ?? []).slice(0, 4)
  const did = tr(card.did) ?? tr(project.summary)
  const hook = tr(card.hook)

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group grid gap-4 border-t border-line px-2 py-8 transition hover:bg-panel-2 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.25fr)] sm:gap-8 sm:px-4"
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
        {hook && <p className="mt-3 text-sm font-medium text-heading">{hook}</p>}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          {t('projects.viewCaseStudy')}
          <span aria-hidden="true" className="transition group-hover:translate-x-0.5">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  )
}
