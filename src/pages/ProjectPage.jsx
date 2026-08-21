import { useEffect, useLayoutEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import CaseStudyLayout from '../layouts/CaseStudyLayout.jsx'
import NotFound from './NotFound.jsx'
import { getProjectModule, resolveProjectSlug } from '../data/projects.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { trackProjectOpen } from '../lib/analytics.js'

const SITE_TITLE = 'Quoc Trung Nguyen — Data Analyst | Business Intelligence'

/**
 * Generic case-study route. Looks the project up in the registry and renders
 * its content inside the shared layout — adding a project never means adding
 * a route.
 */
export default function ProjectPage() {
  const { slug } = useParams()
  const { lang, tr } = useLanguage()
  const canonical = resolveProjectSlug(slug)
  const projectModule = canonical === slug ? getProjectModule(slug) : null

  // Layout effect so document.title is already updated by the time
  // Analytics' pageview effect (a plain useEffect) reads it.
  useLayoutEffect(() => {
    if (projectModule) {
      document.title = `${tr(projectModule.meta.title)} — ${tr(projectModule.meta.subtitle)}`
    }
    return () => {
      document.title = SITE_TITLE
    }
  }, [projectModule, tr, lang])

  useEffect(() => {
    if (projectModule) {
      trackProjectOpen(projectModule.meta.slug, tr(projectModule.meta.title))
    }
    // Fires once per case-study open, not on every language toggle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectModule])

  // An alias (e.g. /projects/terrafirm) redirects to the canonical URL.
  if (canonical && canonical !== slug) {
    return <Navigate to={`/projects/${canonical}`} replace />
  }
  if (!projectModule) return <NotFound />

  const { meta, default: CaseStudyBody } = projectModule

  return (
    <CaseStudyLayout meta={meta}>
      {/* Content components receive the active language and render from
          their own bilingual copy object. */}
      <CaseStudyBody lang={lang} />
    </CaseStudyLayout>
  )
}
