import { useState } from 'react'
import { useTodo } from '../contexts/ToDoContext'
import {
   FaEdit,
   FaTrash,
   FaCheck,
   FaClock,
   FaTags,
   FaList,
} from 'react-icons/fa'
import TodoForm from './TodoForm'

function TodoItem({ todo }) {
   const {
      updateTodo,
      deleteTodo,
      toggleComplete,
      toggleSubtask,
      deleteSubtask,
   } = useTodo()
   const [isEditing, setIsEditing] = useState(false)
   const [editedTodo, setEditedTodo] = useState(todo.todo)
   const [showSubtasks, setShowSubtasks] = useState(false)

   const handleEdit = () => {
      if (isEditing) {
         updateTodo(todo.id, { ...todo, todo: editedTodo })
      }
      setIsEditing(!isEditing)
   }

   const handleSave = () => {
      updateTodo(todo.id, { ...todo, todo: editedTodo })
      setIsEditing(false)
   }

   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         handleSave()
      }
   }

   const handleDelete = () => {
      if (window.confirm('Are you sure you want to delete this task?')) {
         deleteTodo(todo.id)
      }
   }

   const handleToggleComplete = () => {
      toggleComplete(todo.id, new Date().toISOString())
   }

   const handleToggleSubtask = (subtaskId) => {
      toggleSubtask(todo.id, subtaskId)
   }

   const handleDeleteSubtask = (subtaskId) => {
      deleteSubtask(todo.id, subtaskId)
   }

   const handleStageChange = (newStage) => {
      updateTodo(todo.id, { ...todo, stage: newStage })
   }

   const getPriorityColor = (priority) => {
      switch (priority) {
         case 'high':
            return 'text-red-500 dark:text-red-400'
         case 'medium':
            return 'text-yellow-500 dark:text-yellow-400'
         case 'low':
            return 'text-green-500 dark:text-green-400'
         default:
            return 'text-gray-500 dark:text-gray-400'
      }
   }

   const getStageColor = (stage) => {
      switch (stage) {
         case 'notStarted':
            return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded'
         case 'inProgress':
            return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-2 py-1 rounded'
         case 'completed':
            return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 px-2 py-1 rounded'
         default:
            return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded'
      }
   }

   const getCategoryEmoji = (category) => {
      switch (category) {
         case 'work':
            return '💼'
         case 'personal':
            return '👤'
         case 'learning':
            return '📚'
         default:
            return '📝'
      }
   }

   const completedSubtasks =
      todo.subtasks?.filter((subtask) => subtask.completed).length || 0
   const totalSubtasks = todo.subtasks?.length || 0

   if (isEditing) {
      return (
         <div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4'>
            <TodoForm
               editingTodo={todo}
               onCancelEdit={() => setIsEditing(false)}
            />
         </div>
      )
   }

   return (
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
         <div className='flex items-start gap-4'>
            {/* Checkbox and Main Content */}
            <div className='flex-1 min-w-0'>
               <div className='flex items-center gap-2'>
                  <input
                     type='checkbox'
                     checked={todo.completed}
                     onChange={handleToggleComplete}
                     className='w-5 h-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500'
                  />
                  <div
                     className={`text-gray-900 dark:text-gray-100 break-words ${
                        todo.completed
                           ? 'line-through text-gray-500 dark:text-gray-400'
                           : ''
                     }`}
                  >
                     {todo.todo}
                  </div>
               </div>

               {/* Mobile-friendly metadata */}
               <div className='mt-2 flex flex-wrap gap-2 text-sm'>
                  <span
                     className={`${getPriorityColor(
                        todo.priority
                     )} font-medium`}
                  >
                     {todo.priority}
                  </span>
                  <span className='text-gray-400'>•</span>
                  <span className='text-gray-600 dark:text-gray-400 flex items-center gap-1'>
                     <FaTags className='w-3 h-3' />
                     {todo.category}
                  </span>
                  {todo.dueDate && (
                     <>
                        <span className='text-gray-400'>•</span>
                        <span className='text-gray-600 dark:text-gray-400 flex items-center gap-1'>
                           <FaClock className='w-3 h-3' />
                           {new Date(todo.dueDate).toLocaleDateString()}
                        </span>
                     </>
                  )}
               </div>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200'>
               <select
                  value={todo.stage || 'notStarted'}
                  onChange={(e) => handleStageChange(e.target.value)}
                  className='px-2 py-1 text-sm rounded bg-gray-100 dark:bg-gray-700 border-none focus:ring-2 focus:ring-purple-500'
               >
                  <option value='notStarted'>Not Started</option>
                  <option value='inProgress'>In Progress</option>
               </select>

               <button
                  onClick={() => setIsEditing(true)}
                  className='p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
               >
                  <FaEdit className='w-4 h-4' />
               </button>
               <button
                  onClick={handleDelete}
                  className='p-1.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
               >
                  <FaTrash className='w-4 h-4' />
               </button>
            </div>
         </div>

         {/* Subtasks - Collapsible on mobile */}
         {todo.subtasks && todo.subtasks.length > 0 && (
            <div className='mt-3 pl-7 space-y-2'>
               <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                  <FaList className='w-3 h-3' />
                  <span>Subtasks ({todo.subtasks.length})</span>
               </div>
               {todo.subtasks.map((subtask) => (
                  <div
                     key={subtask.id}
                     className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'
                  >
                     <input
                        type='checkbox'
                        checked={subtask.completed}
                        onChange={() => toggleSubtask(todo.id, subtask.id)}
                        className='w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500'
                     />
                     <span className={subtask.completed ? 'line-through' : ''}>
                        {subtask.text}
                     </span>
                  </div>
               ))}
            </div>
         )}
      </div>
   )
}

export default TodoItem
