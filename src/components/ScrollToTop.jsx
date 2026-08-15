import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Resets scroll position on route change, but preserves in-page #anchors. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return null
}
