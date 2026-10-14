import { Link } from 'react-router-dom'
import Container from './Container.jsx'
import site from '../data/site.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { trackContactClick, trackGithubClick } from '../lib/analytics.js'

export default function Footer() {
  const { t, tr } = useLanguage()

  return (
    <footer className="border-t border-line bg-panel/50">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-heading">{tr(site.name)}</p>
          <p className="mt-1 text-sm text-muted">
            {site.role} &middot; {tr(site.location)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm text-muted">
          <Link to="/projects" className="hover:text-accent">
            {t('nav.projects')}
          </Link>
          <Link to="/about" className="hover:text-accent">
            {t('nav.about')}
          </Link>
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackGithubClick('footer')}
            className="hover:text-accent"
          >
            {t('nav.github')}
          </a>
          <a
            href={`mailto:${site.email}`}
            onClick={() => trackContactClick('email')}
            className="hover:text-accent"
          >
            Email
          </a>
        </div>
      </Container>
      <Container className="border-t border-line py-5">
        <p className="text-xs text-faint">
          &copy; {new Date().getFullYear()} {tr(site.name)}. {t('footer.built')}
        </p>
      </Container>
    </footer>
  )
}
