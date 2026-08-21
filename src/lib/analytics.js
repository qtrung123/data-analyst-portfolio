/**
 * Minimal GA4 wrapper. Everything here is best-effort: a failure in
 * analytics (blocked script, missing measurement ID, ad blocker) must never
 * throw or affect the rest of the site, so every public function is wrapped
 * in try/catch and no-ops silently when GA4 isn't configured.
 *
 * The measurement ID comes from the Vite env var `VITE_GA_MEASUREMENT_ID`
 * (see `.env.example`) — never hardcoded here.
 */

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

let ready = false

function safely(fn) {
  try {
    fn()
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[analytics]', err)
  }
}

/**
 * Injects gtag.js and configures it for manual pageview tracking (the SPA
 * sends its own `page_view` events on route change instead of relying on
 * gtag's own initial-load pageview). Safe to call once; a missing
 * measurement ID makes it a no-op.
 */
export function initAnalytics() {
  if (ready || !MEASUREMENT_ID || typeof window === 'undefined') return

  safely(() => {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', MEASUREMENT_ID, { send_page_view: false })

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
    document.head.appendChild(script)

    ready = true
  })
}

function send(name, params) {
  safely(() => {
    if (!ready || typeof window.gtag !== 'function') return
    window.gtag('event', name, params)
  })
}

/** Call on every route change, including the first render. */
export function trackPageview(path, title) {
  send('page_view', {
    page_path: path,
    page_title: title,
    page_location: typeof window !== 'undefined' ? window.location.href : undefined,
  })
}

/** A case-study page was opened. */
export function trackProjectOpen(slug, name) {
  send('project_open', { project_slug: slug, project_name: name })
}

/** The CV was downloaded/opened. */
export function trackCvDownload() {
  send('cv_download')
}

/** An outbound GitHub link was clicked. `context` identifies where (e.g. "navbar", "footer", "project_repo"). */
export function trackGithubClick(context, projectSlug) {
  send('github_click', {
    link_context: context,
    ...(projectSlug ? { project_slug: projectSlug } : {}),
  })
}

/** A contact CTA (email, etc.) was clicked. */
export function trackContactClick(method) {
  send('contact_click', { contact_method: method })
}
