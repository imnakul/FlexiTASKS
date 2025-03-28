import { useTodo } from '../../contexts/ToDoContext'

function MatrixView() {
   const { todos } = useTodo()

   const matrix = {
      high: {
         urgent: todos.filter(
            (todo) =>
               todo.priority === 'high' &&
               todo.dueDate &&
               new Date(todo.dueDate) <=
                  new Date(Date.now() + 24 * 60 * 60 * 1000)
         ),
         notUrgent: todos.filter(
            (todo) =>
               todo.priority === 'high' &&
               (!todo.dueDate ||
                  new Date(todo.dueDate) >
                     new Date(Date.now() + 24 * 60 * 60 * 1000))
         ),
      },
      low: {
         urgent: todos.filter(
            (todo) =>
               todo.priority === 'low' &&
               todo.dueDate &&
               new Date(todo.dueDate) <=
                  new Date(Date.now() + 24 * 60 * 60 * 1000)
         ),
         notUrgent: todos.filter(
            (todo) =>
               todo.priority === 'low' &&
               (!todo.dueDate ||
                  new Date(todo.dueDate) >
                     new Date(Date.now() + 24 * 60 * 60 * 1000))
         ),
      },
   }

   return (
      <div className='grid grid-cols-2 gap-4 p-4'>
         <div className='space-y-4'>
            <div className='bg-red-100 dark:bg-red-900/30 p-4 rounded-lg'>
               <h3 className='text-lg font-semibold text-red-700 dark:text-red-300 mb-2'>
                  Do First
               </h3>
               <div className='space-y-2'>
                  {matrix.high.urgent.map((todo) => (
                     <div
                        key={todo.id}
                        className='bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm'
                     >
                        <p className='font-medium'>{todo.todo}</p>
                        {todo.dueDate && (
                           <p className='text-sm text-gray-500 dark:text-gray-400'>
                              Due: {new Date(todo.dueDate).toLocaleDateString()}
                           </p>
                        )}
                     </div>
                  ))}
               </div>
            </div>

            <div className='bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg'>
               <h3 className='text-lg font-semibold text-yellow-700 dark:text-yellow-300 mb-2'>
                  Schedule
               </h3>
               <div className='space-y-2'>
                  {matrix.high.notUrgent.map((todo) => (
                     <div
                        key={todo.id}
                        className='bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm'
                     >
                        <p className='font-medium'>{todo.todo}</p>
                        {todo.dueDate && (
                           <p className='text-sm text-gray-500 dark:text-gray-400'>
                              Due: {new Date(todo.dueDate).toLocaleDateString()}
                           </p>
                        )}
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className='space-y-4'>
            <div className='bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg'>
               <h3 className='text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2'>
                  Delegate
               </h3>
               <div className='space-y-2'>
                  {matrix.low.urgent.map((todo) => (
                     <div
                        key={todo.id}
                        className='bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm'
                     >
                        <p className='font-medium'>{todo.todo}</p>
                        {todo.dueDate && (
                           <p className='text-sm text-gray-500 dark:text-gray-400'>
                              Due: {new Date(todo.dueDate).toLocaleDateString()}
                           </p>
                        )}
                     </div>
                  ))}
               </div>
            </div>

            <div className='bg-green-100 dark:bg-green-900/30 p-4 rounded-lg'>
               <h3 className='text-lg font-semibold text-green-700 dark:text-green-300 mb-2'>
                  Don't Do
               </h3>
               <div className='space-y-2'>
                  {matrix.low.notUrgent.map((todo) => (
                     <div
                        key={todo.id}
                        className='bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm'
                     >
                        <p className='font-medium'>{todo.todo}</p>
                        {todo.dueDate && (
                           <p className='text-sm text-gray-500 dark:text-gray-400'>
                              Due: {new Date(todo.dueDate).toLocaleDateString()}
                           </p>
                        )}
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}

export default MatrixView
