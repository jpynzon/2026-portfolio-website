export type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'theme'

/**
 * Theme state synced with <html data-theme>. The initial value is applied
 * before paint by an inline script in nuxt.config (no flash of wrong theme);
 * this composable keeps Vue state in sync and persists user choice.
 */
export function useTheme() {
  const theme = useState<ThemeMode>('theme', () => 'light')

  const apply = (mode: ThemeMode) => {
    theme.value = mode
    if (import.meta.client) {
      document.documentElement.dataset.theme = mode
      try {
        localStorage.setItem(STORAGE_KEY, mode)
      } catch {
        /* ignore storage errors (private mode, etc.) */
      }
    }
  }

  // Sync state with whatever the pre-paint script already set on <html>.
  const sync = () => {
    if (!import.meta.client) return
    const current = document.documentElement.dataset.theme as ThemeMode | undefined
    if (current === 'light' || current === 'dark') {
      theme.value = current
    }
  }

  const toggle = () => apply(theme.value === 'dark' ? 'light' : 'dark')

  return { theme, toggle, setTheme: apply, sync }
}
