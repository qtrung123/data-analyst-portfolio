import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from './Container.jsx'
import LanguageToggle from './LanguageToggle.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import site from '../data/site.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { trackGithubClick } from '../lib/analytics.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t, tr } = useLanguage()

  // Internal routes and external links are declared once and rendered for
  // both the desktop bar and the mobile sheet.
  const routes = [
    { to: '/projects', label: t('nav.projects') },
    { to: '/about', label: t('nav.about') },
  ]
  const external = [
    {
      href: site.links.github,
      label: t('nav.github'),
      onClick: () => trackGithubClick('navbar'),
    },
  ]

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? 'text-accent' : 'text-muted hover:text-heading'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5 font-semibold text-heading"
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent ring-1 ring-accent-line"
          >
            &#9622;
          </span>
          <span className="hidden sm:inline">{tr(site.shortName)}</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-6" aria-label="Main">
            {routes.map((n) => (
              <NavLink key={n.to} to={n.to} className={linkClass}>
                {n.label}
              </NavLink>
            ))}
            {external.map((n) => (
              <a
                key={n.label}
                href={n.href}
                target="_blank"
                rel="noreferrer"
                onClick={n.onClick}
                className="text-sm font-medium text-muted transition hover:text-heading"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 border-l border-line pl-6">
            <LanguageToggle />
            <ThemeToggle />
          </div>
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
        <nav className="border-t border-line md:hidden" aria-label="Mobile">
          <Container className="flex flex-col gap-1 py-3">
            {routes.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-sm text-body hover:bg-panel-2"
              >
                {n.label}
              </NavLink>
            ))}
            {external.map((n) => (
              <a
                key={n.label}
                href={n.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  n.onClick?.()
                  setOpen(false)
                }}
                className="rounded-lg px-2 py-2 text-sm text-body hover:bg-panel-2"
              >
                {n.label} &#8599;
              </a>
            ))}
          </Container>
        </nav>
      )}
    </header>
  )
}
