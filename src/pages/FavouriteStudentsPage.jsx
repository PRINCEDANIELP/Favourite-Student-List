import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Avatar from '../components/Avatar.jsx'
import SearchBar from '../components/SearchBar.jsx'
import HighlightText from '../components/HighlightText.jsx'
import { useThemeContext } from '../context/ThemeContext.jsx'
import { useStudentContext } from '../context/StudentContext.jsx'
const CLASS_FILTERS = [
  ['Class 8 - A', '8-A'],
  ['Class 9 - B', '9-B'],
  ['Class 10 - C', '10-C'],
  ['Class 11 - D', '11-D'],
]
function sortByQueryPriority(list, query) {
  if (!query) return list

  return [...list].sort((a, b) => {
    const aStartsWith = a.name.toLowerCase().startsWith(query.toLowerCase()) ? 0 : 1
    const bStartsWith = b.name.toLowerCase().startsWith(query.toLowerCase()) ? 0 : 1

    if (aStartsWith !== bStartsWith) return aStartsWith - bStartsWith
    return a.name.localeCompare(b.name)
  })
}
export default function FavouriteStudentsPage() {
  const { theme } = useThemeContext()
  const { favourites, removeFavourite } = useStudentContext()
  const [query, setQuery] = useState('')
  const [selectedClass, setSelectedClass] = useState('all')
  const filteredFavourites = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matched = favourites.filter(
      (s) =>
        (selectedClass === 'all' || s.classSection === selectedClass) &&
        (!q ||
          s.name.toLowerCase().includes(q) ||
          s.classSection.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q))
    )
    return sortByQueryPriority(matched, q)
  }, [favourites, query, selectedClass])
  return (
    <div className={`min-h-screen flex flex-col ${theme.gradient}`}>
      <Navbar />

      <main className="flex-1 px-6 py-10 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-white mb-1">Favourite Students</h1>
        <p className="text-white/80 mb-6">
          {favourites.length === 0
            ? 'Your favourites list'
            : `${filteredFavourites.length} of ${favourites.length} favourite student${favourites.length > 1 ? 's' : ''} shown`}
        </p>
        {favourites.length > 0 && (
          <div className="mb-6 space-y-3">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search your favourites..."
            />
            <div className="flex flex-wrap gap-2" aria-label="Filter favourites by class">
              <button
                type="button"
                onClick={() => setSelectedClass('all')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selectedClass === 'all'
                    ? `text-white ${theme.button}`
                    : 'bg-white/80 text-gray-700 hover:bg-white'
                }`}
              >
                All
              </button>
              {CLASS_FILTERS.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelectedClass(value)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedClass === value
                      ? `text-white ${theme.button}`
                      : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
        {favourites.length === 0 ? (
          <div className="bg-white/90 rounded-xl p-10 text-center shadow-lg">
            <p className="text-gray-600 text-lg font-medium">
              No favourite students added yet
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Go to the Student List page and tap "Add to Favourite".
            </p>
          </div>
        ) : filteredFavourites.length === 0 ? (
          <div className="bg-white/90 rounded-xl p-10 text-center shadow-lg">
            <p className="text-gray-600 text-lg font-medium">
              No favourites match the selected filters
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try a different name, section, email, or class.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFavourites.map((student) => (
              <div
                key={student.id}
                className={`${theme.card} rounded-xl p-5 shadow-lg flex flex-col gap-2`}
              >
                <div className="flex items-center gap-3">
                  <Avatar name={student.name} size={12} />
                  <div>
                    <h3 className="font-bold text-gray-800">
                      <HighlightText text={student.name} query={query} />
                    </h3>
                    <p className="text-xs text-gray-500">ID: {student.id}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Section:</span>{' '}
                  <HighlightText text={student.classSection} query={query} />
                </p>
                <p className="text-xs text-gray-500 truncate">
                  <HighlightText text={student.info} query={query} />
                </p>
                <button
                  onClick={() => removeFavourite(student.id)}
                  className={`mt-2 rounded-full py-2 text-sm font-medium text-white transition ${theme.removeButton}`}
                >
                  Remove from Favourites
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
