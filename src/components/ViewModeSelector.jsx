import {
   FaList,
   FaColumns,
   FaTh,
   FaCalendarAlt,
   FaChartLine,
} from 'react-icons/fa'
import { useAppTheme } from '../contexts/AppThemeContext'

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
      <div className='flex flex-wrap items-center justify-center p-2 gap-2 bg-gray-300 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600'>
         {views.map((view) => {
            const Icon = view.icon
            return (
               <button
                  key={view.id}
                  onClick={() => setViewMode(view.id)}
                  className={`space-grotesk flex items-center gap-1.5 sm:px-4 px-2 py-2  rounded-lg sm:text-sm text-xs font-medium transition-all duration-200 ${
                     view.id === 'kanban' ? 'sm:flex hidden' : ''
                  } ${
                     viewMode === view.id
                        ? ` ${getColorClass(
                             appTheme.colorTheme,
                             'buttonbg'
                          )} text-white`
                        : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'
                  }`}
               >
                  <Icon className='sm:size-4 size-3' />
                  {view.label}
               </button>
            )
         })}
      </div>
   )
}

export default ViewModeSelector
