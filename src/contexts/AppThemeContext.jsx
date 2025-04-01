import { createContext, useContext, useState, useEffect } from 'react'

const AppThemeContext = createContext()

// Default interface settings for each mode
const defaultInterfaceSettings = {
   minimal: {
      subtasks: false,
      notes: false,
      priority: true,
      dueDate: true,
      achievement: false,
      viewModes: true,
      category: true,
   },
   maximal: {
      subtasks: true,
      notes: true,
      priority: true,
      dueDate: true,
      achievement: true,
      viewModes: true,
      category: true,
   },
   custom: {
      subtasks: true,
      notes: true,
      priority: true,
      dueDate: true,
      achievement: true,
      viewModes: true,
      category: true,
   },
}

// Default app theme settings
const defaultAppTheme = {
   designBasis: 'text', // 'text' or 'icon'
   colorTheme: 'purple', // 'red', 'orange', 'yellow', 'green', 'blue', 'purple'
   background: 'particle', // 'particle', 'rain mode', 'wave', 'others'
   taskInterface: {
      mode: 'minimal', // 'minimal', 'maximal', 'custom'
      features: defaultInterfaceSettings.minimal,
   },
}

// Helper function to validate app theme object
const isValidAppTheme = (theme) => {
   return (
      theme &&
      typeof theme === 'object' &&
      'designBasis' in theme &&
      'colorTheme' in theme &&
      'background' in theme &&
      'taskInterface' in theme
   )
}

const colorOptions = {
   red: {
      bg: 'bg-red-200 dark:bg-red-900/20',
      hover: 'hover:border-red-300 dark:hover:border-red-500',
      shadow: 'hover:shadow-lg hover:shadow-red-500/20',
      buttonbg: 'bg-red-500 dark:bg-red-800',
      buttonbghover: 'hover:bg-red-700',
      ring: 'focus:ring-red-800 dark:focus:ring-red-500',
      text: 'text-red-600 dark:text-red-400',
      hovertext: 'hover:text-red-500 dark:hover:text-red-400',
      navbar: 'bg-gradient-to-r from-pink-600/80 to-red-600/80',
   },
   orange: {
      bg: 'bg-orange-200 dark:bg-orange-900/20',
      hover: 'hover:border-orange-300 dark:hover:border-orange-500',
      shadow: 'hover:shadow-lg hover:shadow-red-500/20',
      buttonbg: 'bg-orange-500 dark:bg-orange-800',
      buttonbghover: 'hover:bg-orange-700',
      ring: 'focus:ring-orange-800 dark:focus:ring-orange-500',
      text: 'text-orange-600 dark:text-orange-400',
      hovertext: 'hover:text-orange-500 dark:hover:text-orange-400',
      navbar: 'bg-gradient-to-r from-rose-600/80 to-orange-600/80',
   },
   yellow: {
      bg: 'bg-yellow-200 dark:bg-yellow-900/20',
      hover: 'hover:border-yellow-300 dark:hover:border-yellow-500',
      shadow: 'hover:shadow-lg hover:shadow-yellow-500/20',
      buttonbg: 'bg-yellow-500 dark:bg-yellow-800',
      buttonbghover: 'hover:bg-yellow-700',
      ring: 'focus:ring-yellow-800 dark:focus:ring-yellow-500',
      text: 'text-yellow-600 dark:text-yellow-400',
      hovertext: 'hover:text-yellow-500 dark:hover:text-yellow-400',
      navbar: 'bg-gradient-to-r from-amber-600/80 to-yellow-600/80',
   },
   green: {
      bg: 'bg-green-200 dark:bg-green-900/20',
      hover: 'hover:border-green-300 dark:hover:border-green-500',
      shadow: 'hover:shadow-lg hover:shadow-green-500/20',
      buttonbg: 'bg-green-500 dark:bg-green-800',
      buttonbghover: 'hover:bg-green-700',
      ring: 'focus:ring-green-800 dark:focus:ring-green-500',
      text: 'text-green-600 dark:text-green-400',
      hovertext: 'hover:text-green-500 dark:hover:text-green-400',
      navbar: 'bg-gradient-to-r from-emerald-600/80 to-green-600/80',
   },
   blue: {
      bg: 'bg-blue-200 dark:bg-blue-900/20',
      hover: 'hover:border-blue-300 dark:hover:border-blue-500',
      shadow: 'hover:shadow-lg hover:shadow-green-500/20',
      buttonbg: 'bg-blue-500 dark:bg-blue-800',
      buttonbghover: 'hover:bg-blue-700',
      ring: 'focus:ring-blue-800 dark:focus:ring-blue-500',
      text: 'text-blue-600 dark:text-blue-400',
      hovertext: 'hover:text-blue-500 dark:hover:text-blue-400',
      navbar: 'bg-gradient-to-r from-sky-600/80 to-blue-600/80',
   },
   purple: {
      bg: 'bg-purple-200 dark:bg-purple-900/20',
      hover: 'hover:border-purple-300 dark:hover:border-purple-500',
      shadow: 'hover:shadow-lg hover:shadow-purple-500/20',
      buttonbg: 'bg-purple-500 dark:bg-purple-800',
      buttonbghover: 'hover:bg-purple-700',
      ring: 'focus:ring-purple-800 dark:focus:ring-purple-500',
      text: 'text-purple-600 dark:text-purple-300',
      hovertext: 'hover:text-purple-500 dark:hover:text-purple-400',
      navbar: 'bg-gradient-to-r from-indigo-600/80 to-purple-600/80',
   },
}

// Function to get Tailwind class dynamically
const getColorClass = (themeColor, type = 'bg') => {
   return colorOptions[themeColor]?.[type] || ''
}

export function AppThemeProvider({ children }) {
   // Initialize state from localStorage or use defaults
   const [appTheme, setAppTheme] = useState(() => {
      try {
         const savedTheme = localStorage.getItem('appTheme')
         if (!savedTheme) return defaultAppTheme

         const parsedTheme = JSON.parse(savedTheme)
         if (!isValidAppTheme(parsedTheme)) {
            console.warn(
               'Invalid app theme data found in localStorage, using default theme'
            )
            return defaultAppTheme
         }

         // Ensure taskInterface has the correct structure
         if (!parsedTheme.taskInterface || !parsedTheme.taskInterface.mode) {
            parsedTheme.taskInterface = {
               mode: 'minimal',
               features: defaultInterfaceSettings.minimal,
            }
         }

         return parsedTheme
      } catch (error) {
         console.warn('Error parsing app theme from localStorage:', error)
         return defaultAppTheme
      }
   })

   // Persist app theme changes to localStorage
   useEffect(() => {
      try {
         localStorage.setItem('appTheme', JSON.stringify(appTheme))
      } catch (error) {
         console.error('Error saving app theme to localStorage:', error)
      }
   }, [appTheme])

   // Apply app theme settings to document
   useEffect(() => {
      try {
         // Apply color theme
         document.documentElement.setAttribute(
            'data-color-theme',
            appTheme.colorTheme
         )

         // Apply background
         document.documentElement.setAttribute(
            'data-background',
            appTheme.background
         )

         // Apply design basis
         document.documentElement.setAttribute(
            'data-design-basis',
            appTheme.designBasis
         )
      } catch (error) {
         console.error('Error applying app theme to document:', error)
      }
   }, [appTheme.colorTheme, appTheme.background, appTheme.designBasis])

   // Theme manipulation functions
   const setDesignBasis = (basis) => {
      setAppTheme((prev) => ({ ...prev, designBasis: basis }))
   }

   const setColorTheme = (color) => {
      setAppTheme((prev) => ({ ...prev, colorTheme: color }))
   }

   const setBackground = (bg) => {
      setAppTheme((prev) => ({ ...prev, background: bg }))
   }

   const setTaskInterface = (mode, features = null) => {
      setAppTheme((prev) => ({
         ...prev,
         taskInterface: {
            mode,
            features: features || defaultInterfaceSettings[mode],
         },
      }))
   }

   const updateTaskFeatures = (features) => {
      if (appTheme.taskInterface.mode !== 'custom') return
      setAppTheme((prev) => ({
         ...prev,
         taskInterface: {
            ...prev.taskInterface,
            features,
         },
      }))
   }

   const value = {
      appTheme,
      setDesignBasis,
      setColorTheme,
      setBackground,
      setTaskInterface,
      updateTaskFeatures,
      getColorClass,
   }

   return (
      <AppThemeContext.Provider value={value}>
         {children}
      </AppThemeContext.Provider>
   )
}

export function useAppTheme() {
   const context = useContext(AppThemeContext)
   if (!context) {
      throw new Error('useAppTheme must be used within an AppThemeProvider')
   }
   return context
}

// Export default interface settings for use in other components
export { defaultInterfaceSettings }
