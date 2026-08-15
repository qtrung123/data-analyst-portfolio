import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <p className="font-mono text-sm text-accent-400">404</p>
      <h1 className="mt-3 text-3xl font-bold text-white">Page not found</h1>
      <p className="mt-3 text-ink-300">
        That case study doesn't exist — or hasn't been written up yet.
      </p>
      <Link
        to="/projects"
        className="mt-8 inline-block rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-accent-400"
      >
        Browse projects
      </Link>
    </Container>
  )
}
