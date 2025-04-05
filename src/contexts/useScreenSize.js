import { useState, useEffect } from 'react'

const breakpoints = {
   sm: 640,
   md: 768,
   lg: 1024,
}

const getCurrentScreenSize = () => {
   const width = typeof window !== 'undefined' ? window.innerWidth : 0
   return {
      isSmall: width < breakpoints.sm,
      isMedium: width >= breakpoints.sm && width < breakpoints.lg,
      isLarge: width >= breakpoints.lg,
      width,
   }
}

export const useScreenSize = () => {
   const [screen, setScreen] = useState(getCurrentScreenSize)

   useEffect(() => {
      const updateScreenSize = () => {
         setScreen(getCurrentScreenSize())
      }

      updateScreenSize()
      window.addEventListener('resize', updateScreenSize)
      return () => window.removeEventListener('resize', updateScreenSize)
   }, [])

   return screen
}
