import { useState, useRef, useEffect } from 'react'
import { useTodo } from '../contexts/ToDoContext'
import TaskSuggestions from './TaskSuggestions'

function TodoForm() {
   const [todo, setTodo] = useState('')
   const [dueDate, setDueDate] = useState('')
   const [priority, setPriority] = useState('medium')
   const [category, setCategory] = useState('personal')
   const [showSuggestions, setShowSuggestions] = useState(false)
   const [isRecurring, setIsRecurring] = useState(false)
   const [recurringInterval, setRecurringInterval] = useState('daily')
   const [subtasks, setSubtasks] = useState([])
   const [newSubtask, setNewSubtask] = useState('')
   const [showSubtaskInput, setShowSubtaskInput] = useState(false)
   const inputRef = useRef(null)
   const { addTodo, todos } = useTodo()

   const add = (e) => {
      e.preventDefault()
      if (!todo) return

      const todoData = {
         todo,
         completed: false,
         dueDate: dueDate || null,
         priority: priority,
         category: category,
         createdAt: new Date().toISOString(),
         isRecurring,
         recurringInterval: isRecurring ? recurringInterval : null,
         stage: 'notStarted',
         subtasks: subtasks.map((subtask) => ({
            id: Date.now() + Math.random(),
            text: subtask,
            completed: false,
            createdAt: new Date().toISOString(),
         })),
      }

      addTodo(todoData)
      resetForm()
   }

   const resetForm = () => {
      setTodo('')
      setDueDate('')
      setPriority('medium')
      setCategory('personal')
      setIsRecurring(false)
      setRecurringInterval('daily')
      setSubtasks([])
      setNewSubtask('')
      setShowSubtaskInput(false)
      setShowSuggestions(false)
   }

   const handleInputChange = (e) => {
      setTodo(e.target.value)
      setShowSuggestions(true)
   }

   const handleSuggestionSelect = (suggestion) => {
      setTodo(suggestion)
      setShowSuggestions(false)
   }

   const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
         setShowSuggestions(false)
      }
   }

   const addSubtask = (e) => {
      e.preventDefault()
      if (newSubtask.trim()) {
         setSubtasks([...subtasks, newSubtask.trim()])
         setNewSubtask('')
         setShowSubtaskInput(false)
      }
   }

   const removeSubtask = (index) => {
      setSubtasks(subtasks.filter((_, i) => i !== index))
   }

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [])

   const today = new Date().toISOString().split('T')[0]

   return (
      <form onSubmit={add} className='space-y-4'>
         <div className='flex flex-col sm:flex-row gap-4'>
            {/* Task Input */}
            <input
               type='text'
               placeholder='What needs to be done?'
               value={todo}
               onChange={(e) => setTodo(e.target.value)}
               className='flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300'
            />

            {/* Priority Select */}
            <select
               value={priority}
               onChange={(e) => setPriority(e.target.value)}
               className='px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300'
            >
               <option value='low'>Low Priority</option>
               <option value='medium'>Medium Priority</option>
               <option value='high'>High Priority</option>
            </select>

            {/* Category Select */}
            <select
               value={category}
               onChange={(e) => setCategory(e.target.value)}
               className='px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300'
            >
               <option value='personal'>Personal</option>
               <option value='work'>Work</option>
               <option value='shopping'>Shopping</option>
               <option value='other'>Other</option>
            </select>
         </div>

         {/* Subtasks Section */}
         <div className='space-y-3'>
            {subtasks.map((subtask, index) => (
               <div key={index} className='flex gap-2'>
                  <input
                     type='text'
                     value={subtask}
                     onChange={(e) =>
                        handleSubtaskChange(index, e.target.value)
                     }
                     placeholder='Add a subtask...'
                     className='flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300'
                  />
                  <button
                     type='button'
                     onClick={() => removeSubtask(index)}
                     className='px-3 py-1.5 rounded-lg text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/30 transition-all duration-200'
                  >
                     Remove
                  </button>
               </div>
            ))}
         </div>

         {/* Action Buttons */}
         <div className='flex flex-wrap gap-3 items-center'>
            <button
               type='button'
               onClick={addSubtask}
               className='px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200'
            >
               Add Subtask
            </button>

            <div className='flex items-center gap-3'>
               <input
                  type='date'
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className='px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300'
               />

               <div className='flex items-center gap-2'>
                  <input
                     type='checkbox'
                     id='recurring'
                     checked={isRecurring}
                     onChange={(e) => setIsRecurring(e.target.checked)}
                     className='rounded border-gray-300 text-purple-500 focus:ring-purple-500'
                  />
                  <label
                     htmlFor='recurring'
                     className='text-sm text-gray-600 dark:text-gray-400'
                  >
                     Recurring
                  </label>
               </div>

               {isRecurring && (
                  <select
                     value={recurringInterval}
                     onChange={(e) => setRecurringInterval(e.target.value)}
                     className='px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300'
                  >
                     <option value='daily'>Daily</option>
                     <option value='weekly'>Weekly</option>
                     <option value='monthly'>Monthly</option>
                  </select>
               )}
            </div>

            <button
               type='submit'
               className='ml-auto px-4 py-2 rounded-lg text-sm font-medium bg-purple-500 text-white hover:bg-purple-600 transition-all duration-200'
            >
               Add Task
            </button>
         </div>
      </form>
   )
}

export default TodoForm
