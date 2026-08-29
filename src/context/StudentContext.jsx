import { createContext, useContext, useState } from 'react'
const StudentContext = createContext(null)
export function StudentProvider({ children }) {
  const [favourites, setFavourites] = useState([])
  const addFavourite = (student) => {
    setFavourites((prev) => {
      const alreadyExists = prev.some((s) => s.id === student.id)
      if (alreadyExists) return prev
      return [...prev, student]
    })
  }
  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((s) => s.id !== id))
  }
  const isFavourite = (id) => favourites.some((s) => s.id === id)
  return (
    <StudentContext.Provider
      value={{ favourites, addFavourite, removeFavourite, isFavourite }}
    >
      {children}
    </StudentContext.Provider>
  )
}
export function useStudentContext() {
  return useContext(StudentContext)
}
