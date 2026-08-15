const STATUS = {
  flagship: { label: 'Flagship', dot: 'bg-accent-400', text: 'text-accent-400' },
  live: { label: 'Live', dot: 'bg-emerald-400', text: 'text-emerald-400' },
  'in-progress': { label: 'In progress', dot: 'bg-amber-400', text: 'text-amber-400' },
  archived: { label: 'Archived', dot: 'bg-ink-500', text: 'text-ink-400' },
}

export default function StatusBadge({ status }) {
  const s = STATUS[status]
  if (!s) return null
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${s.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden="true" />
      {s.label}
    </span>
  )
}
