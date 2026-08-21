import { useState } from 'react'
import Container from '../components/Container.jsx'
import ProjectGrid from '../components/ProjectGrid.jsx'
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
      <h1 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
        {t('projects.title')}
      </h1>
      <p className="mt-3 max-w-2xl text-body">{t('projects.intro')}</p>

      {categories.length > 1 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {[{ key: ALL, label: t('projects.all') }, ...categories].map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setFilter(c.key)}
              aria-pressed={filter === c.key}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 transition ${
                filter === c.key
                  ? 'bg-accent-soft text-accent ring-accent-line'
                  : 'text-body ring-line hover:text-heading'
              }`}
            >
              {c.label ?? tr(c.value)}
            </button>
          ))}
        </div>
      )}

      <ProjectGrid projects={visible} columns={2} className="mt-10" />
    </Container>
  )
}

function categoryKey(category) {
  return typeof category === 'object' ? (category.en ?? '') : category
}
