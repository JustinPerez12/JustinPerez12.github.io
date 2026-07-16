import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'jp:theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored

  // No explicit choice yet — mirror the OS. The stylesheet defaults to dark,
  // so this only matters for reporting the right icon.
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  // Follow the OS only while the visitor hasn't picked a side themselves.
  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY)) return

    const media = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (event) => setTheme(event.matches ? 'light' : 'dark')

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}
