import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ProjectGrid from '../components/ProjectGrid.jsx'
import site from '../data/site.js'
import { projects, featuredProjects } from '../data/projects.js'

const HOW_I_WORK = [
  {
    title: 'Start from the decision',
    body: 'Before touching data I get clear on what someone will do differently once the report exists. That decision drives the metric list.',
  },
  {
    title: 'Model before visualising',
    body: 'A clean star schema and well-named measures make everything downstream cheap. Most reporting pain is really modelling pain.',
  },
  {
    title: 'Design for the reader',
    body: 'One question per page, the answer above the fold, and detail available on demand rather than crammed in by default.',
  },
  {
    title: 'Ship, then measure adoption',
    body: 'A dashboard nobody opens is a failed project. I follow up on usage and iterate on the parts people actually use.',
  },
]

export default function Home() {
  const flagship = featuredProjects[0] ?? projects[0]
  const rest = projects.filter((p) => p.slug !== flagship?.slug)

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-ink-800">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(60%_60%_at_20%_0%,rgba(14,165,233,0.18),transparent_70%)]"
        />
        <Container className="relative py-20 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-accent-400">
            {site.role}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-300">{site.intro}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-accent-400"
            >
              View case studies
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-ink-100 ring-1 ring-ink-700 transition hover:ring-accent-500/50"
            >
              Get in touch
            </a>
          </div>
        </Container>
      </section>

      {/* ---------- Flagship project ---------- */}
      {flagship && (
        <section className="py-16 sm:py-20">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                  Featured case study
                </h2>
                <p className="mt-2 text-ink-400">
                  The full story: problem, data model, build and outcome.
                </p>
              </div>
              <Link
                to="/projects"
                className="hidden shrink-0 text-sm font-medium text-accent-400 hover:text-accent-500 sm:block"
              >
                All projects →
              </Link>
            </div>
            <div className="mt-8">
              <ProjectCard project={flagship} variant="feature" />
            </div>
          </Container>
        </section>
      )}

      {/* ---------- Other projects ---------- */}
      {rest.length > 0 && (
        <section className="pb-16 sm:pb-20">
          <Container>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">More work</h2>
            <ProjectGrid projects={rest} className="mt-8" />
          </Container>
        </section>
      )}

      {/* ---------- How I work ---------- */}
      <section className="border-t border-ink-800 py-16 sm:py-20">
        <Container>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">How I work</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {HOW_I_WORK.map((item, i) => (
              <div key={item.title} className="rounded-xl bg-ink-900/50 p-6 ring-1 ring-ink-800">
                <span className="font-mono text-xs text-accent-400">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-semibold text-ink-50">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-300">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="border-t border-ink-800 py-16">
        <Container className="text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Have a reporting problem worth solving?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-300">
            I'm open to analyst and BI developer roles, and to short engagements
            building out a reporting layer from scratch.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-7 inline-block rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-accent-400"
          >
            {site.email}
          </a>
        </Container>
      </section>
    </>
  )
}
