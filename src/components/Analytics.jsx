import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initAnalytics, trackPageview } from '../lib/analytics.js'

/**
 * Mounts GA4 once and sends a pageview on every route change (including the
 * first one). Renders nothing. `document.title` for the current route is
 * read at fire time — pages that set it themselves (e.g. ProjectPage) do so
 * in a layout effect, which always runs before this component's effect.
 */
export default function Analytics() {
  const location = useLocation()

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    trackPageview(location.pathname + location.search, document.title)
  }, [location.pathname, location.search])

  return null
}
