import { Link } from 'react-router-dom'
import Container from './Container.jsx'
import site from '../data/site.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { trackContactClick, trackGithubClick } from '../lib/analytics.js'

function Col({ title, children }) {
  return (
    <div>
      <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em] text-faint">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5 text-sm text-body">{children}</ul>
    </div>
  )
}

export default function Footer() {
  const { t, tr } = useLanguage()

  return (
    <footer className="border-t border-line bg-panel-2">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid h-10 w-10 place-items-center rounded-xl font-display text-lg font-bold text-white"
              style={{ backgroundImage: 'var(--grad)' }}
            >
              {site.initials[0]}
            </span>
            <span className="font-display text-lg font-semibold text-heading">{tr(site.name)}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted">
            {site.role}. {tr(site.location)}
          </p>
        </div>

        <Col title={t('footer.pages')}>
          <li>
            <Link to="/" className="hover:text-accent">
              {t('nav.home')}
            </Link>
          </li>
          <li>
            <Link to="/projects" className="hover:text-accent">
              {t('nav.projects')}
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-accent">
              {t('nav.about')}
            </Link>
          </li>
        </Col>

        <Col title={t('footer.elsewhere')}>
          <li>
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackGithubClick('footer')}
              className="hover:text-accent"
            >
              {t('nav.github')} &#8599;
            </a>
          </li>
          <li>
            <a
              href={`mailto:${site.email}`}
              onClick={() => trackContactClick('email')}
              className="hover:text-accent"
            >
              {site.email}
            </a>
          </li>
        </Col>
      </Container>
      <Container className="border-t border-line py-5">
        <p className="text-xs text-faint">
          &copy; {new Date().getFullYear()} {tr(site.name)}. {t('footer.built')}
        </p>
      </Container>
    </footer>
  )
}
