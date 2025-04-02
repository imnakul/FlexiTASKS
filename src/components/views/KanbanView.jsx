import TodoItem from '../TodoItem'
import { useSelector } from 'react-redux'
import { useAppTheme } from '../../contexts/AppThemeContext'
function KanbanView() {
   const todos = useSelector((state) => state.todos.todos)
   const { appTheme, getColorClass } = useAppTheme()
   const columns = {
      notStarted: todos.filter((todo) => todo.stage === 'notStarted'),
      inProgress: todos.filter((todo) => todo.stage === 'inProgress'),
   }

   return (
      <div className='grid grid-cols-2 gap-4 p-4 max-w-[1400px] mx-auto'>
         {/* Not Started Column */}
         <div
            className={`bg-sky-100 dark:bg-sky-800/20 rounded-xl p-6 min-h-[600px] flex flex-col border-2 border-sky-300 dark:border-sky-700 `}
         >
            <h3 className='text-xl font-semibold text-cyan-700 dark:text-cyan-300 mb-6'>
               Not Started
            </h3>
            <div className='space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2'>
               {columns.notStarted.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
               ))}
               {columns.notStarted.length === 0 && (
                  <p className='text-gray-500 dark:text-gray-400 text-center py-4'>
                     No tasks to show
                  </p>
               )}
            </div>
         </div>

         {/* In Progress Column */}
         <div className='bg-teal-100 dark:bg-teal-800/20 rounded-xl p-6 min-h-[600px] flex flex-col border-2 border-teal-300 dark:border-teal-700'>
            <h3 className='text-xl font-semibold text-emerald-700 dark:text-emerald-300 mb-6'>
               In Progress
            </h3>
            <div className='space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2'>
               {columns.inProgress.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
               ))}
               {columns.inProgress.length === 0 && (
                  <p className='text-gray-500 dark:text-gray-400 text-center py-4'>
                     No tasks in progress
                  </p>
               )}
            </div>
         </div>
      </div>
   )
}

export default KanbanView
