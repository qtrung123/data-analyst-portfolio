import { useState } from 'react'
import Container from '../components/Container.jsx'
import ProjectRow from '../components/ProjectRow.jsx'
import { projects, getCategories } from '../data/projects.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const ALL = '__all__'

export default function Projects() {
  const { t, tr } = useLanguage()
  const [filter, setFilter] = useState(ALL)

  // Categories may be bilingual objects; group by the English key so the
  // filter keeps working when the language changes.
  const categories = getCategories()
  const visible =
    filter === ALL ? projects : projects.filter((p) => categoryKey(p.category) === filter)

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-4xl font-bold text-heading sm:text-5xl">{t('projects.title')}</h1>
      <p className="mt-3 max-w-2xl text-body">{t('projects.intro')}</p>

      {categories.length > 1 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {[{ key: ALL, label: t('projects.all') }, ...categories].map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setFilter(c.key)}
              aria-pressed={filter === c.key}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === c.key
                  ? 'btn-grad'
                  : 'border border-line bg-panel text-body hover:border-accent-line hover:text-heading'
              }`}
            >
              {c.label ?? tr(c.value)}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-line p-10 text-center text-sm text-muted">
          {t('projects.empty')}
        </p>
      ) : (
        <div className="mt-10 border-b border-line">
          {visible.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={String(i + 1).padStart(2, '0')} />
          ))}
        </div>
      )}
    </Container>
  )
}

function categoryKey(category) {
  return typeof category === 'object' ? (category.en ?? '') : category
}
