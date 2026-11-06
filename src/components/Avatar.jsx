import { useState } from 'react'
import site from '../data/site.js'

/**
 * Round profile badge with a gradient ring. Shows site.photo when that file
 * exists, and falls back to the initials, so the site never shows a broken
 * image if no photo has been added yet.
 */
export default function Avatar({ size = 88, className = '' }) {
  const [failed, setFailed] = useState(false)
  const showPhoto = Boolean(site.photo) && !failed

  return (
    <span
      className={`inline-grid place-items-center rounded-full p-[3px] ${className}`}
      style={{ width: size, height: size, backgroundImage: 'var(--grad)' }}
    >
      <span className="relative grid h-full w-full place-items-center overflow-hidden rounded-full bg-panel ring-2 ring-surface">
        <span
          aria-hidden="true"
          className="font-display font-bold text-accent"
          style={{ fontSize: size * 0.34 }}
        >
          {site.initials}
        </span>
        {showPhoto && (
          <img
            src={site.photo}
            alt=""
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </span>
    </span>
  )
}
