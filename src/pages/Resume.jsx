import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import Tag from '../components/Tag.jsx'
import { resume } from '../data/resume.js'
import { getProject } from '../data/projects.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function Block({ title, children }) {
  return (
    <section className="grid gap-4 border-t border-line py-9 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10">
      <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  )
}

export default function Resume() {
  const { t, tr } = useLanguage()
  const projects = resume.projects
    .map((r) => ({ ...r, project: getProject(r.slug) }))
    .filter((r) => r.project)

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-4xl font-bold text-heading sm:text-5xl">{t('resume.title')}</h1>
      <p className="mt-3 max-w-2xl text-body">{t('resume.lead')}</p>
      {resume.downloads.length > 0 && (
      <div className="mt-6 flex flex-wrap gap-3">
        {resume.downloads.map((d, i) => (
          <a
            key={d.href}
            href={d.href}
            target="_blank"
            rel="noreferrer"
            className={
              i === 0
                ? 'btn-grad rounded-full px-6 py-3 text-sm font-semibold transition'
                : 'rounded-full border border-line bg-panel px-6 py-3 text-sm font-semibold text-heading transition hover:border-accent-line'
            }
          >
            {t(d.key)} <span aria-hidden="true">&#8599;</span>
          </a>
        ))}
      </div>
      )}

      <div className="mt-12">
        <Block title={t('resume.summary')}>
          <p className="max-w-3xl text-body">{tr(resume.summary)}</p>
        </Block>

        <Block title={t('resume.skills')}>
          <div className="space-y-4">
            {resume.skills.map((g) => (
              <div key={g.group.en} className="flex flex-wrap items-center gap-2">
                <span className="w-full text-sm font-semibold text-heading sm:w-44">
                  {tr(g.group)}
                </span>
                {g.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            ))}
          </div>
        </Block>

        <Block title={t('resume.projects')}>
          <div className="space-y-8">
            {projects.map(({ project: p, when }) => (
              <div key={p.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-lg font-semibold text-heading">{tr(p.title)}</h3>
                  <span className="font-mono text-xs text-faint">{when}</span>
                </div>
                <p className="mt-1 font-mono text-xs text-muted">{p.tools.join(' · ')}</p>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-body">
                  {tr(p.card?.did) ?? tr(p.summary)}
                </p>
                <Link
                  to={`/projects/${p.slug}`}
                  className="mt-2 inline-block text-sm font-semibold text-accent hover:underline"
                >
                  {t('resume.viewCase')} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </Block>

        <Block title={t('resume.experience')}>
          {resume.experience.map((e) => (
            <div key={e.role.en}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-lg font-semibold text-heading">{tr(e.role)}</h3>
                <span className="font-mono text-xs text-faint">{tr(e.when)}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{tr(e.org)}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-body">
                {e.points.map((p) => (
                  <li key={p.en}>{tr(p)}</li>
                ))}
              </ul>
            </div>
          ))}
        </Block>

        <Block title={t('resume.education')}>
          {resume.education.map((e) => (
            <div key={e.school.en}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-lg font-semibold text-heading">{tr(e.school)}</h3>
                <span className="font-mono text-xs text-faint">{tr(e.when)}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{tr(e.degree)}</p>
            </div>
          ))}
        </Block>
      </div>
    </Container>
  )
}
