import { useTheme } from '../theme/ThemeContext.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t('a11y.toLight') : t('a11y.toDark')}
      title={isDark ? t('a11y.toLight') : t('a11y.toDark')}
      className={`grid h-9 w-9 place-items-center rounded-lg text-muted ring-1 ring-line transition hover:text-heading hover:ring-accent-line focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
    >
      {/* Inline SVG so the icon inherits the current text colour. */}
      {isDark ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}
