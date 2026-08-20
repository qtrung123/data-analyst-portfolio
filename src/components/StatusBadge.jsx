import { useLanguage } from '../i18n/LanguageContext.jsx'

const STATUS = {
  flagship: {
    label: { en: 'Flagship', vi: 'Dự án chính' },
    dot: 'bg-accent',
    text: 'text-accent',
  },
  live: {
    label: { en: 'Live', vi: 'Đang chạy' },
    dot: 'bg-emerald-500',
    text: 'text-emerald-600 dark:text-emerald-400',
  },
  'in-progress': {
    label: { en: 'In progress', vi: 'Đang thực hiện' },
    dot: 'bg-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
  },
  archived: {
    label: { en: 'Archived', vi: 'Lưu trữ' },
    dot: 'bg-faint',
    text: 'text-muted',
  },
}

export default function StatusBadge({ status }) {
  const { tr } = useLanguage()
  const s = STATUS[status]
  if (!s) return null
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${s.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden="true" />
      {tr(s.label)}
    </span>
  )
}
