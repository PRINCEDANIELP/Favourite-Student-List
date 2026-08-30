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
      className={`flex items-center justify-between gap-2 px-2 py-2.5 sm:px-6 ${theme.navBg} backdrop-blur-sm text-white sticky top-0 z-50 transition-colors`}
    >
      <Link to="/home" className="text-xs font-bold tracking-tight whitespace-nowrap sm:text-xl">
        StudentHub
      </Link>

      <ul className="flex min-w-0 flex-1 items-center justify-end gap-1 whitespace-nowrap overflow-x-auto text-[9px] font-medium sm:gap-3 sm:text-sm md:gap-5">
        <li className="shrink-0">
          <Link to="/home" className={`transition-colors ${theme.navLinkHover}`}>
            Home
          </Link>
        </li>
        <li className="shrink-0">
          <Link to="/students" className={`transition-colors ${theme.navLinkHover}`}>
            <span className="hidden sm:inline">Student List</span>
            <span className="sm:hidden">Students</span>
          </Link>
        </li>
        <li className="shrink-0">
          <Link
            to="/favourites"
            className={`relative transition-colors ${theme.navLinkHover}`}
          >
            <span className="hidden sm:inline">Favourites</span>
            <span className="sm:hidden">Favs</span>
            {favourites.length > 0 && (
              <span
                className={`ml-1 inline-flex items-center justify-center text-[8px] font-bold rounded-full w-4 h-4 sm:text-[9px] sm:w-5 sm:h-5 ${theme.navBadge}`}
              >
                {favourites.length}
              </span>
            )}
          </Link>
        </li>
        <li className="shrink-0">
          <ThemeSwitch />
        </li>
        <li className="shrink-0">
          <button
            onClick={handleLogout}
            className={`inline-flex items-center gap-1 rounded-full px-1.5 py-1 text-[9px] transition-colors sm:gap-2 sm:px-3 sm:text-sm ${theme.navPillHover}`}
          >
            <LogOut size={12} className="sm:h-[16px] sm:w-[16px]" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}
