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
