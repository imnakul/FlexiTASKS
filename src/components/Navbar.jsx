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
import { MdOutlineBackup } from 'react-icons/md'

import ContactForm from './ContactForm'
import TaskBackups from './TaskBackups'
import VisualSettings from './VisualSettings'

function Navbar() {
   const { isDarkMode, toggleTheme } = useTheme()
   const [showDropdown, setShowDropdown] = useState(false)
   const [showModal, setShowModal] = useState(false)
   const [modalContent, setModalContent] = useState(null)
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

   const handleOpenModal = (content) => {
      setModalContent(content)
      setShowModal(true)
      setShowDropdown(false) // Close dropdown when opening modal
   }

   return (
      <>
         <nav className='bg-gradient-to-r from-indigo-600/80 to-purple-600/80 shadow-sm border-b border-gray-200 dark:border-gray-700'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
               <div className='flex items-center justify-between h-16'>
                  {/* Logo/Title */}
                  <div className='flex-shrink-0 flex items-center gap-3'>
                     <FaTasks className='w-7 h-7 text-white' />
                     <h1 className='text-2xl font-bold text-gray-800 dark:text-white sm:pb-0.5 pb-1'>
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
                              <button
                                 onClick={() => handleOpenModal('colors')}
                                 className='w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors duration-150'
                              >
                                 <FaPalette className='w-4 h-4 text-green-500' />
                                 <span className='text-sm text-gray-700 dark:text-gray-300'>
                                    Theme Settings
                                 </span>
                              </button>

                              {/* Feedback & Contact */}
                              <button
                                 onClick={() => handleOpenModal('feedback')}
                                 className='w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors duration-150'
                              >
                                 <FaComments className='w-5 h-5 text-blue-500' />
                                 <span className='text-sm text-gray-700 dark:text-gray-300'>
                                    Feedback & Contact
                                 </span>
                              </button>

                              {/* Notion Integration */}
                              <button
                                 onClick={() => handleOpenModal('backup')}
                                 className='w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors duration-150'
                              >
                                 <MdOutlineBackup className='w-5 h-5  dark:text-white' />
                                 <span className='text-sm text-gray-700 dark:text-gray-300'>
                                    Tasks Backup
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

         {/* Modal */}
         {showModal && (
            <div className='fixed inset-0 z-50 overflow-y-auto'>
               <div
                  className='fixed inset-0 bg-black bg-opacity-50 transition-opacity'
                  // onClick={() => setShowModal(false)}
               />
               <div className='flex min-h-full min-w-xl items-center justify-center p-4'>
                  <div className='relative transform overflow-hidden rounded-lg bg-purple-500 dark:bg-purple-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-1.5 sm:w-full sm:max-w-xl sm:p-6'>
                     {/* Modal Content */}
                     <div className='absolute right-0 top-0 pr-4 pt-4'>
                        <button
                           onClick={() => setShowModal(false)}
                           className='rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-800 p-1'
                        >
                           <span className='sr-only'>Close</span>
                           <svg
                              className='h-6 w-6'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth='1.5'
                              stroke='currentColor'
                           >
                              <path
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 d='M6 18L18 6M6 6l12 12'
                              />
                           </svg>
                        </button>
                     </div>

                     {/* Dynamic Modal Content */}
                     <div className='mt-3 text-center sm:mt-0 sm:text-left'>
                        <h3 className='text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100'>
                           {modalContent === 'colors' && 'Color Settings'}
                           {modalContent === 'feedback' && 'Feedback & Contact'}
                           {modalContent === 'backup' && 'Tasks Backup'}
                        </h3>
                        <div className='mt-4'>
                           {/* Add your Aceternity UI components here */}
                           {modalContent === 'colors' && (
                              // <div className='space-y-4'>
                              <VisualSettings />
                              // </div>
                           )}
                           {/* Add other modal content cases */}
                           {modalContent === 'feedback' && <ContactForm />}
                           {modalContent === 'backup' && (
                              // <div className='space-y-4'>
                              <TaskBackups
                                 onClose={() => setShowModal(false)}
                              />
                              // </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   )
}

export default Navbar
