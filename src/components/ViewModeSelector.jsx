import {
   FaList,
   FaColumns,
   FaTh,
   FaCalendarAlt,
   FaChartLine,
} from 'react-icons/fa'
import { useAppTheme } from '../contexts/AppThemeContext'
import { motion } from 'framer-motion'

function ViewModeSelector({ viewMode, setViewMode }) {
   const views = [
      { id: 'list', label: 'List', icon: FaList },
      { id: 'kanban', label: 'Kanban', icon: FaColumns },
      { id: 'matrix', label: 'Matrix', icon: FaTh },
      { id: 'timeline', label: 'Timeline', icon: FaChartLine },
      { id: 'calendar', label: 'Calendar', icon: FaCalendarAlt },
   ]

   const { appTheme, getColorClass } = useAppTheme()

   return (
      <div className='relative flex flex-wrap items-center justify-center p-2 gap-2 bg-gray-300 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600'>
         {views.map((view) => {
            const Icon = view.icon
            const isSelected = viewMode === view.id

            return (
               <motion.div key={view.id} className='relative' layout>
                  {isSelected && (
                     <motion.div
                        layoutId='viewModeHighlight'
                        className={`absolute inset-0 z-0 rounded-lg ${getColorClass(
                           appTheme.colorTheme,
                           'buttonbg'
                        )}`}
                        transition={{
                           type: 'spring',
                           stiffness: 200,
                           damping: 30,
                        }}
                     />
                  )}

                  <button
                     onClick={() => setViewMode(view.id)}
                     className={`relative z-10 space-grotesk flex items-center gap-1.5 sm:px-4 lg:px-3 px-2 py-2 rounded-lg sm:text-sm text-xs font-medium transition-all duration-200 ${
                        view.id === 'kanban' ? 'sm:flex hidden' : ''
                     } ${
                        isSelected
                           ? 'text-white'
                           : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'
                     }`}
                  >
                     <Icon className='sm:size-4 size-3' />
                     {view.label}
                  </button>
               </motion.div>
            )
         })}
      </div>
   )
}

export default ViewModeSelector
