import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from './Container.jsx'
import site from '../data/site.js'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? 'text-accent-400' : 'text-ink-300 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-ink-800/80 bg-ink-950/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-semibold text-white">
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-lg bg-accent-500/15 text-accent-400 ring-1 ring-accent-500/30"
          >
            ▚
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex" aria-label="Main">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>
              {n.label}
            </NavLink>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-medium text-ink-950 transition hover:bg-accent-400"
          >
            Get in touch
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="rounded-lg p-2 text-ink-300 ring-1 ring-ink-800 sm:hidden"
        >
          {open ? '✕' : '☰'}
        </button>
      </Container>

      {open && (
        <nav className="border-t border-ink-800 sm:hidden" aria-label="Mobile">
          <Container className="flex flex-col gap-1 py-3">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-sm text-ink-200 hover:bg-ink-900"
              >
                {n.label}
              </NavLink>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="rounded-lg px-2 py-2 text-sm text-accent-400"
            >
              Get in touch
            </a>
          </Container>
        </nav>
      )}
    </header>
  )
}
