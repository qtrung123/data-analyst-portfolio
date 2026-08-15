import ProjectCard from './ProjectCard.jsx'

export default function ProjectGrid({ projects, columns = 3, className = '' }) {
  if (!projects.length) {
    return (
      <p className="rounded-xl border border-dashed border-ink-800 p-10 text-center text-sm text-ink-400">
        No projects in this category yet.
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
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  )
}
