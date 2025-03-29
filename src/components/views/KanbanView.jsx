import { useTodo } from '../../contexts/ToDoContext'
import TodoItem from '../TodoItem'

function KanbanView() {
   const { todos } = useTodo()

   const columns = {
      notStarted: todos.filter((todo) => todo.stage === 'notStarted'),
      inProgress: todos.filter((todo) => todo.stage === 'inProgress'),
   }

   return (
      <div className='grid grid-cols-2 gap-4 p-4 max-w-[1400px] mx-auto'>
         {/* Not Started Column */}
         <div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-6 min-h-[600px] flex flex-col'>
            <h3 className='text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6'>
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
         <div className='bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 min-h-[600px] flex flex-col'>
            <h3 className='text-xl font-semibold text-blue-700 dark:text-blue-300 mb-6'>
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
