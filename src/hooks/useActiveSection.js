import { useEffect, useState } from 'react'

/**
 * Tracks which section heading is currently in view, for the case-study
 * side navigation. Returns the active section id (or the first id).
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] ?? null)
  const key = ids.join('|')

  useEffect(() => {
    const sectionIds = key ? key.split('|') : []
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])

  return active
}
