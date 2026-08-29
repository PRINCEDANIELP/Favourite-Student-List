import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import StudentListPage from './pages/StudentListPage.jsx'
import FavouriteStudentsPage from './pages/FavouriteStudentsPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <StudentListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favourites"
        element={
          <ProtectedRoute>
            <FavouriteStudentsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
