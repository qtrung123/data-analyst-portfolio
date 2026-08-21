import ProjectCard from './ProjectCard.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function ProjectGrid({ projects, columns = 3, className = '' }) {
  const { t } = useLanguage()

  if (!projects.length) {
    return (
      <p className="rounded-xl border border-dashed border-line p-10 text-center text-sm text-muted">
        {t('projects.empty')}
      </p>
    )
  }

  const cols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
  }[columns]

  return (
    <div className={`grid grid-cols-1 gap-6 ${cols} ${className}`}>
      {projects.map((p) => (
        // A project tagged 'practice' always renders as the lower-emphasis
        // compact card, regardless of which grid it appears in.
        <ProjectCard key={p.slug} project={p} variant={p.tier === 'practice' ? 'compact' : 'grid'} />
      ))}
    </div>
  )
}
