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
      className={`flex items-center justify-between gap-2 px-3 py-3 sm:px-6 ${theme.navBg} backdrop-blur-sm text-white sticky top-0 z-50 transition-colors`}
    >
      <Link to="/home" className="text-sm font-bold tracking-tight sm:text-xl">
        StudentHub
      </Link>
      <ul className="flex items-center justify-end gap-1.5 text-[10px] font-medium sm:gap-4 md:gap-6 sm:text-sm">
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
                className={`ml-1 inline-flex items-center justify-center text-[9px] font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 ${theme.navBadge}`}
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
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] transition-colors sm:gap-2 sm:px-3 sm:text-sm ${theme.navPillHover}`}
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}
