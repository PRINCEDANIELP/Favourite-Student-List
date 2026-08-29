import { useThemeContext } from '../context/ThemeContext.jsx'
export default function ThemeSwitch({ className }) {
  const { themeKey, toggleTheme } = useThemeContext()
  const isSunset = themeKey === 'sunset'
  const positionClass = className || 'relative'
  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={!isSunset}
      aria-label={isSunset ? 'Switch to Ocean theme' : 'Switch to Sunset theme'}
      title={isSunset ? 'Switch to Ocean theme' : 'Switch to Sunset theme'}
      className={`${positionClass} inline-flex items-center w-[50px] h-[25px] rounded-full border-2 border-white/60 bg-white/10 transition-colors duration-300 shrink-0`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-7 h-4 rounded-full  shadow flex items-center justify-center text-xl transition-transform duration-300 ${
          isSunset ? 'translate-x-0' : 'translate-x-4'
        }`}
      >
        {isSunset ? '🌝' : '🌚'}
      </span>
    </button>
  )
}
