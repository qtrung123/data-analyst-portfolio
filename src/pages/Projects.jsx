import { useState } from 'react'
import Container from '../components/Container.jsx'
import ProjectGrid from '../components/ProjectGrid.jsx'
import { projects, getCategories } from '../data/projects.js'

const ALL = 'All'

export default function Projects() {
  const categories = [ALL, ...getCategories()]
  const [filter, setFilter] = useState(ALL)

  const visible = filter === ALL ? projects : projects.filter((p) => p.category === filter)

  return (
    <Container className="py-16 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Projects</h1>
      <p className="mt-3 max-w-2xl text-ink-300">
        Each project is written up as a case study: the question behind it, the
        data model, the build, and what changed as a result.
      </p>

      {categories.length > 2 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 transition ${
                filter === c
                  ? 'bg-accent-500/10 text-accent-400 ring-accent-500/40'
                  : 'text-ink-300 ring-ink-800 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <ProjectGrid projects={visible} className="mt-10" />
    </Container>
  )
}
