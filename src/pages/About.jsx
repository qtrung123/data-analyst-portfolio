import Container from '../components/Container.jsx'
import Tag from '../components/Tag.jsx'
import site from '../data/site.js'

export default function About() {
  return (
    <Container className="py-16 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">About</h1>

      <div className="prose-case mt-6 max-w-3xl text-lg">
        <p>{site.intro}</p>
        <p>
          Most of my work sits at the seam between operations and analytics:
          taking data that was collected for compliance or record-keeping and
          turning it into something a manager can act on this week. That usually
          means fixing the data model first, then building a report thin enough
          that people keep using it after the launch email.
        </p>
      </div>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">Toolkit</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {site.skills.map((group) => (
            <div key={group.group} className="rounded-xl bg-ink-900/50 p-6 ring-1 ring-ink-800">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-400">
                {group.group}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-xl border border-ink-800 p-8">
        <h2 className="text-xl font-semibold text-white">Contact</h2>
        <p className="mt-2 text-ink-300">
          {site.location}. The fastest way to reach me is email.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}`}
            className="rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-accent-400"
          >
            {site.email}
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-ink-100 ring-1 ring-ink-700 transition hover:ring-accent-500/50"
          >
            LinkedIn ↗
          </a>
        </div>
      </section>
    </Container>
  )
}
