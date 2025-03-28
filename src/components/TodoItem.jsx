import { useState } from 'react'
import { useTodo } from '../contexts/ToDoContext'

function TodoItem({ todo }) {
   const [isTodoEditable, setIsTodoEditable] = useState(false)
   const [todoMsg, setTodoMsg] = useState(todo.todo)
   const { updateTodo, deleteTodo, toggleComplete } = useTodo()

   const editTodo = () => {
      updateTodo(todo.id, { ...todo, todo: todoMsg })
      setIsTodoEditable(false)
   }

   const toggleCompleted = () => {
      const now = new Date().toISOString()
      toggleComplete(todo.id, now)
   }

   const getPriorityColor = () => {
      if (!todo.dueDate) return 'border-l-2 border-l-gray-400'

      const today = new Date()
      const dueDate = new Date(todo.dueDate)
      const diffTime = dueDate - today
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays < 0) return 'border-l-2 border-l-red-500' // Past due
      if (diffDays === 0) return 'border-l-2 border-l-orange-500' // Due today
      if (diffDays <= 3) return 'border-l-2 border-l-yellow-500' // Upcoming
      return 'border-l-2 border-l-green-500' // Low priority
   }

   const getCategoryColor = () => {
      switch (todo.category) {
         case 'work':
            return 'bg-blue-50/50 dark:bg-blue-900/10'
         case 'personal':
            return 'bg-green-50/50 dark:bg-green-900/10'
         case 'learning':
            return 'bg-purple-50/50 dark:bg-purple-900/10'
         default:
            return 'bg-gray-50/50 dark:bg-gray-900/10'
      }
   }

   const getCategoryIcon = () => {
      switch (todo.category) {
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

   const formatDate = (dateString) => {
      if (!dateString) return ''
      return new Date(dateString).toLocaleDateString('en-US', {
         month: 'short',
         day: 'numeric',
      })
   }

   return (
      <div
         className={`group flex items-center gap-x-3 rounded-lg px-3 py-2 shadow-sm transition-all duration-300 hover:shadow-md ${getPriorityColor()} ${getCategoryColor()} ${
            todo.completed
               ? 'bg-base-200/50 text-base-content/70'
               : 'bg-base-100 hover:bg-base-200/50'
         }`}
      >
         <input
            type='checkbox'
            className='checkbox checkbox-sm checkbox-primary transition-all duration-300'
            checked={todo.completed}
            onChange={toggleCompleted}
         />
         <div className='flex-1 flex flex-col'>
            <div className='flex items-center gap-2'>
               <span className='text-base'>{getCategoryIcon()}</span>
               <input
                  type='text'
                  className={`bg-transparent border-none outline-none text-sm font-medium transition-all duration-300 ${
                     isTodoEditable
                        ? 'border-b border-primary focus:border-primary'
                        : 'border-transparent'
                  } ${todo.completed ? 'line-through' : ''}`}
                  value={todoMsg}
                  onChange={(e) => setTodoMsg(e.target.value)}
                  readOnly={!isTodoEditable}
               />
            </div>
            {todo.dueDate && (
               <span className='text-xs text-base-content/60 mt-0.5'>
                  Due: {formatDate(todo.dueDate)}
               </span>
            )}
         </div>

         <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <button
               className={`btn btn-ghost btn-xs rounded-lg transition-all duration-300 ${
                  todo.completed
                     ? 'opacity-50 cursor-not-allowed'
                     : 'hover:bg-primary/10'
               }`}
               onClick={() => {
                  if (todo.completed) return
                  if (isTodoEditable) {
                     editTodo()
                  } else setIsTodoEditable((prev) => !prev)
               }}
               disabled={todo.completed}
            >
               {isTodoEditable ? '💾' : '✏️'}
            </button>

            <button
               className='btn btn-ghost btn-xs rounded-lg hover:bg-error/10 transition-all duration-300'
               onClick={() => deleteTodo(todo.id)}
            >
               🗑️
            </button>
         </div>
      </div>
   )
}

export default TodoItem
