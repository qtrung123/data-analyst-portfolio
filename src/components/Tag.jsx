const TONES = {
  default: 'bg-panel-2 text-body ring-line',
  accent: 'bg-accent-soft text-accent ring-accent-line',
  muted: 'bg-transparent text-muted ring-line',
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
