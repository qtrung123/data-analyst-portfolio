import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from './Container.jsx'
import LanguageToggle from './LanguageToggle.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import site from '../data/site.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { trackContactClick, trackGithubClick } from '../lib/analytics.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t, tr } = useLanguage()

  const routes = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/projects', label: t('nav.projects') },
    { to: '/resume', label: t('nav.resume') },
    { to: '/about', label: t('nav.about') },
  ]

  const pill = ({ isActive }) =>
    `rounded-lg px-3.5 py-2 text-sm font-medium transition ${
      isActive ? 'bg-accent-soft text-heading' : 'text-muted hover:text-heading'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/75 backdrop-blur-xl backdrop-saturate-150">
      <Container className="flex h-[68px] items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span
            aria-hidden="true"
            className="grid h-10 w-10 place-items-center rounded-xl font-display text-lg font-bold text-white shadow-[0_8px_18px_-8px_rgba(79,70,229,0.7)]"
            style={{ backgroundImage: 'var(--grad)' }}
          >
            {site.initials[0]}
          </span>
          <span className="hidden leading-tight min-[430px]:block">
            <span className="block text-[0.95rem] font-semibold text-heading">
              {tr(site.name)}
            </span>
            <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.18em] text-faint sm:block">
              Data · Business Analysis · BI
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <nav className="flex items-center gap-1" aria-label="Main">
            {routes.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className={pill}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackGithubClick('navbar')}
            className="ml-3 border-l border-line pl-4 text-sm font-medium text-muted transition hover:text-heading"
          >
            {t('nav.github')} <span aria-hidden="true">&#8599;</span>
          </a>
          <div className="ml-3 flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <a
            href={`mailto:${site.email}`}
            onClick={() => trackContactClick('navbar')}
            className="btn-grad ml-2 rounded-full px-5 py-2.5 text-sm font-semibold transition"
          >
            {t('home.ctaEmail')}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={t('nav.menu')}
            className="grid h-9 w-9 place-items-center rounded-lg text-muted ring-1 ring-line transition hover:text-heading"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </Container>

      {open && (
        <nav className="border-t border-line bg-surface md:hidden" aria-label="Mobile">
          <Container className="flex flex-col gap-1 py-3">
            {routes.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                onClick={() => setOpen(false)}
                className={pill}
              >
                {n.label}
              </NavLink>
            ))}
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                trackGithubClick('navbar')
                setOpen(false)
              }}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted hover:text-heading"
            >
              {t('nav.github')} &#8599;
            </a>
            <a
              href={`mailto:${site.email}`}
              onClick={() => {
                trackContactClick('navbar')
                setOpen(false)
              }}
              className="btn-grad mt-2 rounded-full px-5 py-2.5 text-center text-sm font-semibold"
            >
              {t('home.ctaEmail')}
            </a>
          </Container>
        </nav>
      )}
    </header>
  )
}
