import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
   const [isDarkMode, setIsDarkMode] = useState(() => {
      if (typeof window !== 'undefined') {
         return (
            localStorage.getItem('theme') === 'dark' ||
            (!localStorage.getItem('theme') &&
               window.matchMedia('(prefers-color-scheme: dark)').matches)
         )
      }
      return false
   })

   useEffect(() => {
      const root = window.document.documentElement
      if (isDarkMode) {
         root.classList.add('dark')
         localStorage.setItem('theme', 'dark')
      } else {
         root.classList.remove('dark')
         localStorage.setItem('theme', 'light')
      }
   }, [isDarkMode])

   const toggleTheme = () => {
      setIsDarkMode((prev) => !prev)
   }

   return (
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
         {children}
      </ThemeContext.Provider>
   )
}

export function useTheme() {
   const context = useContext(ThemeContext)
   if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider')
   }
   return context
}
