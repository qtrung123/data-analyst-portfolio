/**
 * Numbered section heading: a mono "01 — EYEBROW" label, a display title and
 * an optional lead line. Used for the homepage sections.
 */
export default function SectionHeader({ index, eyebrow, title, lead, className = '' }) {
  return (
    <div className={className}>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-faint">
        {index && <span className="text-accent">{index}</span>}
        {index && ' — '}
        {eyebrow}
      </p>
      {title && (
        <h2 className="mt-3 text-3xl font-bold text-heading sm:text-4xl">{title}</h2>
      )}
      {lead && <p className="mt-3 max-w-2xl text-body">{lead}</p>}
    </div>
  )
}
