const TONES = {
  default: 'bg-ink-900 text-ink-300 ring-ink-800',
  accent: 'bg-accent-500/10 text-accent-400 ring-accent-500/30',
  muted: 'bg-transparent text-ink-400 ring-ink-800',
}

export default function Tag({ tone = 'default', className = '', children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
