import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ProjectGrid from '../components/ProjectGrid.jsx'
import { projects, featuredProjects } from '../data/projects.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/**
 * Compact hero, then straight into the work. No biography above the projects —
 * the About page carries that.
 */
export default function Home() {
  const { t } = useLanguage()
  const flagship = featuredProjects[0] ?? projects[0]
  const rest = projects.filter((p) => p.slug !== flagship?.slug)

  return (
    <>
      <section className="border-b border-line">
        <Container className="py-12 sm:py-16">
          <h1 className="text-3xl font-bold tracking-tight text-heading sm:text-5xl">
            {t('hero.name')}
          </h1>
          <p className="mt-2 text-base font-medium text-accent sm:text-lg">
            {t('hero.role')}
          </p>
          <p className="mt-4 max-w-2xl text-body">{t('hero.tagline')}</p>
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

          {rest.length > 0 && <ProjectGrid projects={rest} className="mt-6" />}
        </Container>
      </section>
    </>
  )
}
