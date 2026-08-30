import { useThemeContext } from '../context/ThemeContext.jsx'
export default function SearchBar({ value, onChange, placeholder }) {
  const { theme } = useThemeContext()
  return (
    <div className="relative mb-6 w-full">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        ⌕
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search by name...'}
        className={`w-full bg-white/90 border border-white/50 rounded-full py-3 pl-10 pr-9 text-sm text-gray-700 placeholder:text-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-1 sm:py-2.5 ${theme.ring}`}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
        >
          ✕
        </button>
      )}
    </div>
  )
}
