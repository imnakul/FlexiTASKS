import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import {
   FaSun,
   FaMoon,
   FaCog,
   FaComments,
   FaPalette,
   FaChevronDown,
   FaTasks,
} from 'react-icons/fa'
import { RiNotionFill } from 'react-icons/ri'

function Navbar() {
   const { isDarkMode, toggleTheme } = useTheme()
   const [showDropdown, setShowDropdown] = useState(false)
   const dropdownRef = useRef(null)

   // Handle click outside to close dropdown
   useEffect(() => {
      function handleClickOutside(event) {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
         ) {
            setShowDropdown(false)
         }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
   }, [])

   const handleThemeToggle = () => {
      toggleTheme()
   }

   return (
      <nav className='bg-gradient-to-r from-indigo-600/80 to-purple-600/80 shadow-sm border-b border-gray-200 dark:border-gray-700'>
         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16'>
               {/* Logo/Title */}
               <div className='flex-shrink-0 flex items-center gap-4'>
                  <FaTasks className='w-7 h-7 text-white' />
                  <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>
                     Task Master
                  </h1>
               </div>

               {/* Right side buttons */}
               <div className='flex items-center gap-4'>
                  {/* Theme Dropdown */}
                  <div className='relative' ref={dropdownRef}>
                     <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className={`
                           flex items-center gap-2 px-3 py-2 rounded-lg
                           text-white/80 dark:text-gray-800
                           hover:text-purple-500 dark:hover:text-purple-400
                           hover:bg-purple-50 dark:hover:bg-purple-900/30
                           transition-all duration-200
                           ${
                              showDropdown
                                 ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400'
                                 : ''
                           }
                        `}
                     >
                        <FaCog
                           className={`w-5 h-5 transition-transform duration-200 ${
                              showDropdown ? 'rotate-180' : ''
                           }`}
                        />
                        <FaChevronDown
                           className={`w-3 h-3 transition-transform duration-200 ${
                              showDropdown ? 'rotate-180' : ''
                           }`}
                        />
                     </button>

                     {/* Dropdown Menu */}
                     {showDropdown && (
                        <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 transform opacity-100 scale-100 transition-all duration-200 origin-top-right'>
                           <div className='px-4 py-2 border-b border-gray-200 dark:border-gray-700'>
                              <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                                 Settings
                              </span>
                           </div>

                           {/* Theme Settings */}
                           <button className='w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors duration-150'>
                              <FaPalette className='w-5 h-5 text-purple-500' />
                              <span className='text-sm text-gray-700 dark:text-gray-300'>
                                 Theme Settings
                              </span>
                           </button>

                           {/* Feedback & Contact */}
                           <button className='w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors duration-150'>
                              <FaComments className='w-5 h-5 text-blue-500' />
                              <span className='text-sm text-gray-700 dark:text-gray-300'>
                                 Feedback & Contact
                              </span>
                           </button>

                           {/* Notion Integration */}
                           <button className='w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors duration-150'>
                              <RiNotionFill className='w-5 h-5 text-white' />
                              <span className='text-sm text-gray-700 dark:text-gray-300'>
                                 Notion Integration
                              </span>
                           </button>
                        </div>
                     )}
                  </div>

                  {/* Dark Mode Toggle - Separate button */}
                  <div className='relative'>
                     <button
                        onClick={handleThemeToggle}
                        type='button'
                        className='p-2 rounded-lg text-white/80 dark:text-gray-800 hover:text-purple-500 hover:bg-purple-50  dark:hover:text-purple-400 dark:hover:bg-purple-900/30 transition-colors duration-200 cursor-pointer'
                     >
                        {isDarkMode ? (
                           <FaSun className='w-5 h-5' />
                        ) : (
                           <FaMoon className='w-5 h-5' />
                        )}
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </nav>
   )
}

export default Navbar
