import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_LANGUAGE, LANGUAGES, strings } from './strings.js'
import { pick } from './pick.js'

const STORAGE_KEY = 'portfolio-lang'
const LanguageContext = createContext(null)

const isSupported = (v) => LANGUAGES.some((l) => l.code === v)

function storedLanguage() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return isSupported(v) ? v : null
  } catch {
    return null
  }
}

/**
 * Language state.
 *
 * Exposes two helpers, deliberately separate:
 *   t(key)  — a UI string from strings.js
 *   tr(val) — resolves a bilingual content value ({ en, vi }) or passes a
 *             plain value straight through
 *
 * Components use these; no component knows about a particular project.
 */
export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => storedLanguage() ?? DEFAULT_LANGUAGE)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next) => {
    if (!isSupported(next)) return
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable — the session still switches correctly */
    }
  }, [])

  const t = useCallback(
    (key) => {
      const entry = strings[key]
      if (!entry) {
        if (import.meta.env.DEV) console.warn(`Missing UI string: ${key}`)
        return key
      }
      return pick(entry, lang)
    },
    [lang],
  )

  const tr = useCallback((value) => pick(value, lang), [lang])

  const value = useMemo(() => ({ lang, setLang, t, tr }), [lang, setLang, t, tr])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
