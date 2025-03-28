import { useTheme } from '../contexts/ThemeContext'

function Navbar() {
   const { isDarkMode, toggleTheme } = useTheme()

   const handleThemeToggle = () => {
      toggleTheme()
   }

   return (
      <div className='navbar bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg mb-6 py-4'>
         <div className='container mx-auto px-4'>
            <div className='flex items-center justify-between w-full'>
               <div className='flex items-center'>
                  <button className='btn btn-ghost text-white hover:bg-white/10'>
                     <svg
                        className='w-8 h-8'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                     >
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           strokeWidth={2}
                           d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                        />
                     </svg>
                  </button>
               </div>

               <div className='flex items-center'>
                  <h1 className='text-2xl font-bold text-white'>Task Master</h1>
               </div>

               <div className='flex items-center'>
                  <button
                     onClick={handleThemeToggle}
                     className='btn btn-ghost text-white hover:bg-white/10'
                     aria-label='Toggle theme'
                  >
                     {isDarkMode ? (
                        <svg
                           className='w-6 h-6'
                           fill='none'
                           stroke='currentColor'
                           viewBox='0 0 24 24'
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                           />
                        </svg>
                     ) : (
                        <svg
                           className='w-6 h-6'
                           fill='none'
                           stroke='currentColor'
                           viewBox='0 0 24 24'
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                           />
                        </svg>
                     )}
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Navbar
