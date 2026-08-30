import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Avatar from '../components/Avatar.jsx'
import SearchBar from '../components/SearchBar.jsx'
import HighlightText from '../components/HighlightText.jsx'
import { useThemeContext } from '../context/ThemeContext.jsx'
import { useStudentContext } from '../context/StudentContext.jsx'
const SECTIONS = ['A', 'B', 'C', 'D']
const CLASS_FILTERS = [8, 9, 10, 11].map((grade, index) => ({
  value: `Class ${grade} - ${SECTIONS[index]}`,
  label: `${grade}-${SECTIONS[index]}`,
}))
function deriveClassSection(id) {
  const grade = 8 + (id % 4) // Class 8 - 11
  const section = SECTIONS[id % SECTIONS.length]
  return `Class ${grade} - ${section}`
}
function sortByQueryPriority(list, query) {
  if (!query) return list
  return [...list].sort((a, b) => {
    const aStartsWith = a.name.toLowerCase().startsWith(query.toLowerCase()) ? 0 : 1
    const bStartsWith = b.name.toLowerCase().startsWith(query.toLowerCase()) ? 0 : 1

    if (aStartsWith !== bStartsWith) return aStartsWith - bStartsWith
    return a.name.localeCompare(b.name)
  })
}
export default function StudentListPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [selectedClass, setSelectedClass] = useState('all')
  const { theme } = useThemeContext()
  const { addFavourite, isFavourite } = useStudentContext()
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://dummyjson.com/users?limit=100')
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const data = await response.json()
        const formatted = data.users.map((u) => ({
          id: u.id,
          name: `${u.firstName} ${u.lastName}`,
          classSection: deriveClassSection(u.id),
          info: `${u.university} • ${u.company?.title || 'N/A'}`,
          email: u.email,
          image: u.image,
        }))
        formatted.sort((a, b) => a.name.localeCompare(b.name))
        setStudents(formatted)
        setError(null)
      } catch (err) {
        setError(err.message || 'Something went wrong while fetching students')
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])
  const filteredStudents = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matched = students.filter(
      (s) =>
        (selectedClass === 'all' || s.classSection === selectedClass) &&
        (!q ||
          s.name.toLowerCase().includes(q) ||
          s.classSection.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q))
    )
    return sortByQueryPriority(matched, q)
  }, [students, query, selectedClass])
  return (
    <div className={`min-h-screen flex flex-col ${theme.gradient}`}>
      <Navbar />
      <main className="flex-1 px-4 py-6 max-w-5xl mx-auto w-full sm:px-6 md:py-8 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Student List</h1>
        <p className="text-sm sm:text-base text-white/80 mb-6">
          {loading
            ? 'Loading students...'
            : `${filteredStudents.length} of ${students.length} students shown`}
        </p>
        {!loading && !error && (
          <div className="mb-6 space-y-3">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search by name, section, or email..."
            />
            <div className="flex flex-wrap gap-2" aria-label="Filter by class">
              <button
                type="button"
                onClick={() => setSelectedClass('all')}
                className={`rounded-full px-3 py-2 text-xs font-medium transition sm:px-4 sm:text-sm ${
                  selectedClass === 'all'
                    ? `text-white ${theme.button}`
                    : 'bg-white/80 text-gray-700 hover:bg-white'
                }`}
              >
                All
              </button>
              {CLASS_FILTERS.map((classFilter) => (
                <button
                  key={classFilter.value}
                  type="button"
                  onClick={() => setSelectedClass(classFilter.value)}
                  className={`rounded-full px-3 py-2 text-xs font-medium transition sm:px-4 sm:text-sm ${
                    selectedClass === classFilter.value
                      ? `text-white ${theme.button}`
                      : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
                >
                  {classFilter.label}
                </button>
              ))}
            </div>
          </div>
        )}
        {loading && (
          <div className="text-white text-center py-20">Fetching students…</div>
        )}
        {error && !loading && (
          <div className="bg-red-100 text-red-700 rounded-lg p-4 text-center">
            Failed to load students: {error}
          </div>
        )}
        {!loading && !error && filteredStudents.length === 0 && (
          <div className="bg-white/90 rounded-xl p-10 text-center shadow-lg">
            <p className="text-gray-600 text-lg font-medium">
              No students match the selected filters
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try a different name, section, email, or class.
            </p>
          </div>
        )}
        {!loading && !error && filteredStudents.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredStudents.map((student) => {
              const favourited = isFavourite(student.id)
              return (
                <div
                  key={student.id}
                  className={`${theme.card} rounded-xl p-4 shadow-lg flex flex-col gap-2 sm:p-5`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={student.name} size={12} />
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-800 break-words">
                        <HighlightText text={student.name} query={query} />
                      </h3>
                      <p className="text-xs text-gray-500">ID: {student.id}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Section:</span>{' '}
                    <HighlightText text={student.classSection} query={query} />
                  </p>
                  <p className="text-xs text-gray-500 break-words">
                    <HighlightText text={student.info} query={query} />
                  </p>
                  <button
                    onClick={() => addFavourite(student)}
                    disabled={favourited}
                    className={`mt-2 rounded-full py-2 text-xs font-medium transition sm:text-sm ${
                      favourited
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : `text-white ${theme.button}`
                    }`}
                  >
                    {favourited ? '✓ Added to Favourites' : 'Add to Favourite'}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
