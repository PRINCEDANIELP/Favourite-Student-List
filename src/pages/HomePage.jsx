import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { useThemeContext } from '../context/ThemeContext.jsx'
export default function HomePage() {
  const { theme } = useThemeContext()
  return (
    <div className={`min-h-screen flex flex-col ${theme.gradient}`}>
      <Navbar />
      <header className="text-center text-white px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Favourite Student List
        </h1>
        <p className="max-w-xl mx-auto text-white/90 mb-8">
          Browse all students, mark your favourites, and manage your list —
          all in one place.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/students"
            className="bg-white text-gray-800 font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition"
          >
            View Student List
          </Link>
          <Link
            to="/favourites"
            className={`font-semibold px-6 py-2.5 rounded-full transition ${theme.buttonOutline}`}
          >
            My Favourites
          </Link>
        </div>
      </header>
      <section className="px-6 pb-16 max-w-3xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          How It Works
        </h2>
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20">
          <video
            className="w-full h-auto block"
            autoPlay
            muted
            loop
            controls
            playsInline
            preload="auto"
          >
            <source src="/captions/how-it-works.mp4" type="video/mp4" />
            <track
              src="/captions/how-it-works.vtt"
              kind="subtitles"
              srcLang="en"
              label="English"
              default
            />
            Your browser doesn't support embedded videos.
          </video>
        </div>
        <p className="text-white/70 text-sm text-center mt-3">
          Walkthrough of Login → Student List → Add to Favourite → Favourites.
          Captions are loaded from{' '}
          <code className="text-white/90">public/captions/how-it-works</code>.
        </p>
      </section>
      <section className="px-6 pb-20 max-w-4xl mx-auto w-full grid gap-6 sm:grid-cols-3">
        <div className={`${theme.card} rounded-xl p-6 text-center shadow-lg`}>
          <h3 className="font-bold text-gray-800 mb-2">100 Students</h3>
          <p className="text-gray-500 text-sm">Fetched live from an API, A–Z sorted.</p>
        </div>
        <div className={`${theme.card} rounded-xl p-6 text-center shadow-lg`}>
          <h3 className="font-bold text-gray-800 mb-2">Global Favourites</h3>
          <p className="text-gray-500 text-sm">Powered by React Context — no prop drilling.</p>
        </div>
        <div className={`${theme.card} rounded-xl p-6 text-center shadow-lg`}>
          <h3 className="font-bold text-gray-800 mb-2">Two Themes</h3>
          <p className="text-gray-500 text-sm">Toggle Sunset / Ocean from the navbar.</p>
        </div>
      </section>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}