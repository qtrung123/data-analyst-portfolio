import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import CaseStudyLayout from '../layouts/CaseStudyLayout.jsx'
import NotFound from './NotFound.jsx'
import { getProjectModule, resolveProjectSlug } from '../data/projects.js'

/**
 * Generic case-study route. Looks the project up in the registry and renders
 * its content component inside the shared layout — so adding a project never
 * means adding a route.
 */
export default function ProjectPage() {
  const { slug } = useParams()
  const canonical = resolveProjectSlug(slug)
  const projectModule = canonical === slug ? getProjectModule(slug) : null

  useEffect(() => {
    if (projectModule) {
      document.title = `${projectModule.meta.title} — Case study`
    }
    return () => {
      document.title = 'Quoc Trung — Data Analyst & BI Developer'
    }
  }, [projectModule])

  // An alias (e.g. /projects/terrafirm) redirects to the canonical URL.
  if (canonical && canonical !== slug) {
    return <Navigate to={`/projects/${canonical}`} replace />
  }
  if (!projectModule) return <NotFound />

  const { meta, default: CaseStudyBody } = projectModule

  return (
    <CaseStudyLayout meta={meta}>
      <CaseStudyBody />
    </CaseStudyLayout>
  )
}
