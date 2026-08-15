import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CaseStudyLayout from '../layouts/CaseStudyLayout.jsx'
import NotFound from './NotFound.jsx'
import { getProjectModule } from '../data/projects.js'

/**
 * Generic case-study route. Looks the project up in the registry and renders
 * its content component inside the shared layout — so adding a project never
 * means adding a route.
 */
export default function ProjectPage() {
  const { slug } = useParams()
  const projectModule = getProjectModule(slug)

  useEffect(() => {
    if (projectModule) {
      document.title = `${projectModule.meta.title} — Case study`
    }
    return () => {
      document.title = 'Quoc Trung — Data Analyst & BI Developer'
    }
  }, [projectModule])

  if (!projectModule) return <NotFound />

  const { meta, default: CaseStudyBody } = projectModule

  return (
    <CaseStudyLayout meta={meta}>
      <CaseStudyBody />
    </CaseStudyLayout>
  )
}
