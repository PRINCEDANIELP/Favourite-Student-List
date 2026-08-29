import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useThemeContext } from '../context/ThemeContext.jsx'
import ThemeSwitch from '../components/ThemeSwitch.jsx'
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/
export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const { login } = useAuth()
  const { theme } = useThemeContext()
  const navigate = useNavigate()
  const validate = () => {
    const newErrors = {}
    if (!EMAIL_REGEX.test(email)) {
      newErrors.email = 'Enter a valid email address (e.g. name@example.com)'
    }
    if (!PASSWORD_REGEX.test(password)) {
      newErrors.password =
        'Password must be at least 6 characters and include a letter and a number'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      login(email)
      navigate('/home')
    }
  }
  return (
    <div className={`min-h-screen flex items-center justify-center relative ${theme.gradient} px-4`}>
      <ThemeSwitch className="absolute top-5 right-5" />
      <form
        onSubmit={handleSubmit}
        className={`${theme.card} w-full max-w-sm rounded-2xl shadow-xl p-8`}
      >
        <h1 className=" text-center text-2xl font-bold text-gray-800 mb-1">Welcome </h1>
        <p className="text-center text-gray-500 text-sm mb-6">Sign in to continue</p>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          className={`w-full border border-gray-300 rounded-lg px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-offset-1 ${theme.ring}`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mb-3">{errors.email}</p>
        )}
        {!errors.email && <div className="mb-3" />}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className={`w-full border border-gray-300 rounded-lg px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-offset-1 ${theme.ring}`}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mb-3">{errors.password}</p>
        )}
        {!errors.password && <div className="mb-3" />}
        <button
          type="submit"
          className={`w-full text-white font-medium rounded-lg py-2.5 mt-2 transition ${theme.button}`}
        >
          Log In
        </button>
        <p className="text-xs text-gray-400 mt-4 text-center">
          Demo only — any email/password matching the rules above will work.
        </p>
      </form>
    </div>
  )
}
