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
      <form onSubmit={add} className='flex flex-col gap-3'>
         <div className='flex flex-wrap gap-3 items-center'>
            <div className='w-[300px] relative' ref={inputRef}>
               <input
                  type='text'
                  placeholder='Add a new task...'
                  className='w-full input input-bordered bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 py-2 px-3'
                  value={todo}
                  onChange={handleInputChange}
                  onFocus={() => setShowSuggestions(true)}
               />
               {showSuggestions && (
                  <TaskSuggestions
                     input={todo}
                     onSelect={handleSuggestionSelect}
                     todos={todos}
                  />
               )}
            </div>
            <div className='flex gap-3 items-center'>
               <input
                  type='date'
                  min={today}
                  className='input input-bordered bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-gray-900 dark:text-gray-100 py-2 px-3'
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
               />
               <select
                  className='select select-bordered bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-gray-900 dark:text-gray-100 py-2 px-3'
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
               >
                  <option value='low'>Low Priority</option>
                  <option value='medium'>Medium Priority</option>
                  <option value='high'>High Priority</option>
               </select>
               <select
                  className='select select-bordered bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-gray-900 dark:text-gray-100 py-2 px-3'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
               >
                  <option value='work'>Work</option>
                  <option value='personal'>Personal</option>
                  <option value='learning'>Learning</option>
               </select>
            </div>
            <button
               type='submit'
               disabled={!todo}
               className='btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2'
            >
               Add Task
            </button>
         </div>

         <div className='flex flex-wrap gap-4 items-center'>
            <div className='flex items-center gap-2'>
               <input
                  type='checkbox'
                  id='recurring'
                  className='checkbox checkbox-sm'
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
               />
               <label
                  htmlFor='recurring'
                  className='text-sm text-gray-600 dark:text-gray-300'
               >
                  Recurring Task
               </label>
            </div>

            {isRecurring && (
               <select
                  className='select select-bordered select-sm bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-gray-900 dark:text-gray-100'
                  value={recurringInterval}
                  onChange={(e) => setRecurringInterval(e.target.value)}
               >
                  <option value='daily'>Daily</option>
                  <option value='weekly'>Weekly</option>
                  <option value='monthly'>Monthly</option>
               </select>
            )}

            <button
               type='button'
               onClick={() => setShowSubtaskInput(!showSubtaskInput)}
               className='btn btn-sm btn-ghost text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            >
               {showSubtaskInput ? 'Cancel Subtasks' : 'Add Subtasks'}
            </button>
         </div>

         {showSubtaskInput && (
            <div className='space-y-2'>
               <form onSubmit={addSubtask} className='flex gap-2'>
                  <input
                     type='text'
                     placeholder='Add a subtask...'
                     className='input input-bordered input-sm bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-gray-900 dark:text-gray-100'
                     value={newSubtask}
                     onChange={(e) => setNewSubtask(e.target.value)}
                  />
                  <button
                     type='submit'
                     className='btn btn-sm bg-purple-500 text-white hover:bg-purple-600'
                  >
                     Add
                  </button>
               </form>
               <div className='space-y-1'>
                  {subtasks.map((subtask, index) => (
                     <div
                        key={index}
                        className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'
                     >
                        <span>•</span>
                        <span>{subtask}</span>
                        <button
                           type='button'
                           onClick={() => removeSubtask(index)}
                           className='text-red-500 hover:text-red-600'
                        >
                           ×
                        </button>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </form>
   )
}

export default TodoForm
