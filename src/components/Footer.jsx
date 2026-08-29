import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Footer() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  const handleHomeClick = (e) => {
    e.preventDefault()
    navigate('/home')
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  return (
    <footer className="border-t border-white/10 bg-black/10">
      <div className="max-w-4xl mx-auto px-6 py-10 grid gap-8 sm:grid-cols-3 text-center sm:text-left">
        <div>
          <p className="text-white font-bold text-lg mb-1">StudentHub</p>
          <p className="text-white/60 text-sm">
            Browse, favourite, and manage your student list — all in one place.
          </p>
        </div>

        <div>
          <p className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">
            Quick Links
          </p>
          <nav className="flex flex-col gap-2 text-sm">
            <button
              type="button"
              onClick={handleHomeClick}
              className="text-left text-white/60 hover:text-white transition"
            >
              Home
            </button>
            <Link to="/students" className="text-white/60 hover:text-white transition">
              Student List
            </Link>
            <Link to="/favourites" className="text-white/60 hover:text-white transition">
              Favourites
            </Link>
          </nav>
        </div>
        <div>
          <p className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">
            Built With
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            {['React', 'React Router', 'Tailwind CSS', 'Context API'].map((tech) => (
              <span
                key={tech}
                className="text-xs text-white/70 bg-white/10 rounded-full px-3 py-1"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-white/50 text-xs pb-6">
        © {new Date().getFullYear()} StudentHub. All rights reserved.
      </p>
    </footer>
  )
}