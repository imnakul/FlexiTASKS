import { useState } from 'react'
import { useTodo } from '../contexts/ToDoContext'

function TodoItem({ todo }) {
   const { updateTodo, deleteTodo } = useTodo()
   const [isEditing, setIsEditing] = useState(false)
   const [editedTodo, setEditedTodo] = useState(todo.todo)

   const handleToggle = () => {
      updateTodo(todo.id, { ...todo, completed: !todo.completed })
   }

   const handleEdit = () => {
      if (editedTodo.trim()) {
         updateTodo(todo.id, { ...todo, todo: editedTodo.trim() })
         setIsEditing(false)
      }
   }

   const handleDelete = () => {
      deleteTodo(todo.id)
   }

   const getPriorityColor = (priority) => {
      switch (priority) {
         case 'high':
            return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
         case 'medium':
            return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
         case 'low':
            return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
         default:
            return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
      }
   }

   const getCategoryColor = (category) => {
      switch (category) {
         case 'work':
            return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
         case 'personal':
            return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200'
         case 'learning':
            return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200'
         default:
            return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
      }
   }

   return (
      <div className='group bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-300'>
         <div className='flex items-start gap-4'>
            <button
               onClick={handleToggle}
               className={`mt-1 w-5 h-5 rounded-full border-2 transition-colors duration-200 ${
                  todo.completed
                     ? 'bg-indigo-500 border-indigo-500'
                     : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500'
               }`}
            >
               {todo.completed && (
                  <svg
                     className='w-full h-full text-white'
                     fill='none'
                     stroke='currentColor'
                     viewBox='0 0 24 24'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                     />
                  </svg>
               )}
            </button>

            <div className='flex-1 min-w-0'>
               {isEditing ? (
                  <div className='flex gap-2'>
                     <input
                        type='text'
                        value={editedTodo}
                        onChange={(e) => setEditedTodo(e.target.value)}
                        className='flex-1 input input-bordered bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-gray-900 dark:text-gray-100'
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
                     />
                     <button
                        onClick={handleEdit}
                        className='btn btn-sm bg-indigo-500 text-white hover:bg-indigo-600'
                     >
                        Save
                     </button>
                     <button
                        onClick={() => setIsEditing(false)}
                        className='btn btn-sm btn-ghost dark:bg-gray-700 dark:text-gray-300'
                     >
                        Cancel
                     </button>
                  </div>
               ) : (
                  <div className='flex flex-col gap-2'>
                     <p
                        className={`text-gray-900 dark:text-gray-100 ${
                           todo.completed
                              ? 'line-through text-gray-400 dark:text-gray-500'
                              : ''
                        }`}
                     >
                        {todo.todo}
                     </p>
                     <div className='flex flex-wrap gap-2'>
                        {todo.dueDate && (
                           <span className='px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'>
                              Due: {new Date(todo.dueDate).toLocaleDateString()}
                           </span>
                        )}
                        <span
                           className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                              todo.priority
                           )}`}
                        >
                           {todo.priority.charAt(0).toUpperCase() +
                              todo.priority.slice(1)}
                        </span>
                        <span
                           className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(
                              todo.category
                           )}`}
                        >
                           {todo.category.charAt(0).toUpperCase() +
                              todo.category.slice(1)}
                        </span>
                     </div>
                  </div>
               )}
            </div>

            <div className='flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
               <button
                  onClick={() => setIsEditing(true)}
                  className='p-1 text-gray-400 hover:text-indigo-500 dark:text-gray-500 dark:hover:text-indigo-400 transition-colors duration-200'
               >
                  <svg
                     className='w-5 h-5'
                     fill='none'
                     stroke='currentColor'
                     viewBox='0 0 24 24'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                     />
                  </svg>
               </button>
               <button
                  onClick={handleDelete}
                  className='p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors duration-200'
               >
                  <svg
                     className='w-5 h-5'
                     fill='none'
                     stroke='currentColor'
                     viewBox='0 0 24 24'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                     />
                  </svg>
               </button>
            </div>
         </div>
      </div>
   )
}

export default TodoItem
