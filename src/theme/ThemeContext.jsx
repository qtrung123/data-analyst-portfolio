import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'portfolio-theme'
const ThemeContext = createContext(null)

function systemTheme() {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function storedTheme() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

/**
 * Theme state. First visit follows the OS preference; an explicit choice is
 * persisted and from then on wins over the system setting.
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => storedTheme() ?? systemTheme())
  const [isExplicit, setIsExplicit] = useState(() => storedTheme() !== null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Keep following the OS until the user makes a choice of their own.
  useEffect(() => {
    if (isExplicit) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => setThemeState(e.matches ? 'dark' : 'light')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [isExplicit])

  const setTheme = useCallback((next) => {
    setThemeState(next)
    setIsExplicit(true)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable — the session still themes correctly */
    }
  }, [])

  const toggleTheme = useCallback(
    () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    [theme, setTheme],
  )

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
