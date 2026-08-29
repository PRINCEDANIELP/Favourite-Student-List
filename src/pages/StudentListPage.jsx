import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Avatar from '../components/Avatar.jsx'
import SearchBar from '../components/SearchBar.jsx'
import HighlightText from '../components/HighlightText.jsx'
import { useThemeContext } from '../context/ThemeContext.jsx'
import { useStudentContext } from '../context/StudentContext.jsx'
const SECTIONS = ['A', 'B', 'C', 'D']
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
    if (!q) return students
    const matched = students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.classSection.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
    )
    return sortByQueryPriority(matched, q)
  }, [students, query])
  return (
    <div className={`min-h-screen flex flex-col ${theme.gradient}`}>
      <Navbar />
      <main className="flex-1 px-6 py-10 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-white mb-1">Student List</h1>
        <p className="text-white/80 mb-6">
          {loading
            ? 'Loading students...'
            : query
            ? `${filteredStudents.length} of ${students.length} students match "${query}"`
            : `${students.length} students, sorted A - Z`}
        </p>
        {!loading && !error && (
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search by name, section, or email..."
          />
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
              No students match "{query}"
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try a different name, section, or email.
            </p>
          </div>
        )}
        {!loading && !error && filteredStudents.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudents.map((student) => {
              const favourited = isFavourite(student.id)
              return (
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
                    onClick={() => addFavourite(student)}
                    disabled={favourited}
                    className={`mt-2 rounded-full py-2 text-sm font-medium transition ${
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
