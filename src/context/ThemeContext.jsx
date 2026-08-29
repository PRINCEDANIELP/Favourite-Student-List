import { createContext, useContext, useState } from 'react'
const ThemeContext = createContext(null)
export const themes = {
  sunset: {
    name: 'Sunset',
    gradient: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400',
    navBg: 'bg-purple-900/40',
    navLinkHover: 'hover:text-pink-200',
    navBadge: 'bg-pink-200 text-purple-900',
    navPillHover: 'hover:bg-purple-800/60',
    navToggleBg: 'bg-white/20 hover:bg-white/30',
    button: 'bg-purple-700 hover:bg-purple-800',
    buttonOutline: 'bg-white/20 border border-white/50 text-white hover:bg-white/30',
    removeButton: 'bg-rose-600 hover:bg-rose-700',
    card: 'bg-white/90',
    accent: 'text-purple-700',
    ring: 'focus:ring-purple-400',
    highlight: 'bg-pink-200 text-purple-900',
  },
  ocean: {
    name: 'Ocean',
    gradient: 'bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700',
    navBg: 'bg-blue-950/40',
    navLinkHover: 'hover:text-cyan-200',
    navBadge: 'bg-cyan-200 text-blue-900',
    navPillHover: 'hover:bg-blue-900/60',
    navToggleBg: 'bg-white/20 hover:bg-white/30',
    button: 'bg-blue-700 hover:bg-blue-800',
    buttonOutline: 'bg-white/20 border border-white/50 text-white hover:bg-white/30',
    removeButton: 'bg-red-600 hover:bg-red-700',
    card: 'bg-white/90',
    accent: 'text-blue-700',
    ring: 'focus:ring-blue-400',
    highlight: 'bg-cyan-200 text-blue-900',
  },
}
export function ThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState('sunset')
  const toggleTheme = () => {
    setThemeKey((prev) => (prev === 'sunset' ? 'ocean' : 'sunset'))
  }
  const theme = themes[themeKey]
  return (
    <ThemeContext.Provider value={{ theme, themeKey, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
export function useThemeContext() {
  return useContext(ThemeContext)
}
