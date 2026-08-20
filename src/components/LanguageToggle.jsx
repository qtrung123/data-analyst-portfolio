import { useLanguage } from '../i18n/LanguageContext.jsx'
import { LANGUAGES } from '../i18n/strings.js'

/**
 * Two-state language switch. Renders every language in LANGUAGES, so adding a
 * third would not require touching this component.
 */
export default function LanguageToggle({ className = '' }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t('a11y.language')}
      className={`inline-flex items-center rounded-lg p-0.5 ring-1 ring-line ${className}`}
    >
      {LANGUAGES.map((l) => {
        const active = l.code === lang
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            title={l.name}
            className={`rounded-md px-2 py-1 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              active
                ? 'bg-accent-soft text-accent'
                : 'text-muted hover:text-heading'
            }`}
          >
            {l.label}
          </button>
        )
      })}
    </div>
  )
}
