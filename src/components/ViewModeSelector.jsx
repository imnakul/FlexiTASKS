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
      <div className='flex flex-wrap gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg'>
         {views.map((view) => {
            const Icon = view.icon
            return (
               <button
                  key={view.id}
                  onClick={() => setViewMode(view.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                     viewMode === view.id
                        ? ` ${getColorClass(
                             appTheme.colorTheme,
                             'buttonbg'
                          )} text-white`
                        : 'bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'
                  }`}
               >
                  <Icon className='w-4 h-4' />
                  {view.label}
               </button>
            )
         })}
      </div>
   )
}

export default ViewModeSelector
