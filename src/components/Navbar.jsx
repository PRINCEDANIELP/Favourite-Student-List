import { Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useThemeContext } from '../context/ThemeContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useStudentContext } from '../context/StudentContext.jsx'
import ThemeSwitch from './ThemeSwitch.jsx'
export default function Navbar() {
  const { theme } = useThemeContext()
  const { logout } = useAuth()
  const { favourites } = useStudentContext()
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <nav
      className={`flex items-center justify-between px-6 py-4 ${theme.navBg} backdrop-blur-sm text-white sticky top-0 z-50 transition-colors`}
    >
      <Link to="/home" className="text-xl font-bold tracking-tight">
        StudentHub
      </Link>
      <ul className="flex items-center gap-6 text-sm font-medium">
        <li>
          <Link to="/home" className={`transition-colors ${theme.navLinkHover}`}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/students" className={`transition-colors ${theme.navLinkHover}`}>
            Student List
          </Link>
        </li>
        <li>
          <Link
            to="/favourites"
            className={`relative transition-colors ${theme.navLinkHover}`}
          >
            Favourites
            {favourites.length > 0 && (
              <span
                className={`ml-1 inline-flex items-center justify-center text-xs font-bold rounded-full w-5 h-5 ${theme.navBadge}`}
              >
                {favourites.length}
              </span>
            )}
          </Link>
        </li>
        <li>
          <ThemeSwitch />
        </li>
        <li>
          <button
            onClick={handleLogout}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${theme.navPillHover}`}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}
