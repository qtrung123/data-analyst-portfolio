import { Link } from 'react-router-dom'
import Container from './Container.jsx'
import site from '../data/site.js'

export default function Footer() {
  return (
    <footer className="border-t border-ink-800 bg-ink-900/30">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-ink-100">{site.name}</p>
          <p className="mt-1 text-sm text-ink-400">
            {site.role} · {site.location}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm text-ink-400">
          <Link to="/projects" className="hover:text-accent-400">
            Projects
          </Link>
          <Link to="/about" className="hover:text-accent-400">
            About
          </Link>
          <a href={`mailto:${site.email}`} className="hover:text-accent-400">
            Email
          </a>
          <a href={site.links.github} target="_blank" rel="noreferrer" className="hover:text-accent-400">
            GitHub
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent-400">
            LinkedIn
          </a>
        </div>
      </Container>
      <Container className="border-t border-ink-800/60 py-5">
        <p className="text-xs text-ink-500">
          © {new Date().getFullYear()} {site.name}. Built with React, Vite and Tailwind CSS.
        </p>
      </Container>
    </footer>
  )
}
