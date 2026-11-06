import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ProjectGrid from '../components/ProjectGrid.jsx'
import Tag from '../components/Tag.jsx'
import site from '../data/site.js'
import { projects, featuredProjects } from '../data/projects.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { trackContactClick, trackGithubClick } from '../lib/analytics.js'

/**
 * Compact hero (name, role, a one-paragraph About Me, skill chips), then
 * straight into the work, closing with a short recruiter CTA. Recruiter-
 * facing summary only — no biography; the About page carries the longer
 * version. Projects stay the visually dominant section on the page.
 */
export default function Home() {
  const { t, tr } = useLanguage()
  const flagship = featuredProjects[0] ?? projects[0]
  // Primary work: everything except the flagship and anything tagged 'practice'.
  const rest = projects.filter((p) => p.slug !== flagship?.slug && p.tier !== 'practice')
  // Secondary/earlier-stage work, shown with far less visual weight below.
  const moreWork = projects.filter((p) => p.tier === 'practice')

  return (
    <>
      <section className="border-b border-line">
        <Container className="py-10 sm:py-14">
          <h1 className="text-3xl font-bold tracking-tight text-heading sm:text-5xl">
            {t('hero.name')}
          </h1>
          <p className="mt-2 text-base font-medium text-accent sm:text-lg">
            {t('hero.role')}
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-faint">
            {t('home.aboutMe')}
          </p>
          <p className="mt-2 max-w-2xl text-lg font-medium text-heading">{t('hero.aboutMe')}</p>
          <ul className="mt-3 max-w-2xl space-y-1.5">
            {['hero.can1', 'hero.can2', 'hero.can3'].map((k) => (
              <li key={k} className="flex gap-3 text-body">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{t(k)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 max-w-2xl text-sm text-muted">{t('hero.note')}</p>

          <div className="mt-6 space-y-3">
            {site.homeSkills.map((g) => (
              <div key={g.group} className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-faint sm:w-36 sm:pt-1">
                  {tr(g.group)}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-semibold text-heading sm:text-3xl">
              {t('home.featured')}
            </h2>
            <Link
              to="/projects"
              className="shrink-0 text-sm font-medium text-accent hover:underline"
            >
              {t('home.allProjects')} &rarr;
            </Link>
          </div>

          {flagship && (
            <div className="mt-8">
              <ProjectCard project={flagship} variant="feature" />
            </div>
          )}

          {rest.length > 0 && <ProjectGrid projects={rest} columns={3} className="mt-6" />}
        </Container>
      </section>

      {moreWork.length > 0 && (
        <section className="border-t border-line py-10 sm:py-12">
          <Container>
            <h2 className="text-lg font-semibold text-heading">{t('home.moreWork')}</h2>
            <p className="mt-1 text-sm text-muted">{t('home.moreWorkIntro')}</p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {moreWork.map((p) => (
                <ProjectCard key={p.slug} project={p} variant="compact" />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-line py-12 sm:py-16">
        <Container className="text-center">
          <h2 className="text-xl font-semibold text-heading sm:text-2xl">
            {t('home.ctaEyebrow')}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-body">{t('home.ctaBody')}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${site.email}`}
              onClick={() => trackContactClick('home_cta')}
              className="rounded-lg bg-accent-solid px-5 py-2.5 text-sm font-semibold text-on-accent transition hover:opacity-90"
            >
              {t('home.ctaEmail')}
            </a>
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackGithubClick('home_cta')}
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-heading ring-1 ring-line transition hover:ring-accent-line"
            >
              {t('nav.github')}
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
