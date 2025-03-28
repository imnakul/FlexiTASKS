import { useState, useRef, useEffect } from 'react'
import { useTodo } from '../contexts/ToDoContext'
import TaskSuggestions from './TaskSuggestions'

function TodoForm() {
   const [todo, setTodo] = useState('')
   const [dueDate, setDueDate] = useState('')
   const [priority, setPriority] = useState('medium')
   const [category, setCategory] = useState('personal')
   const [showSuggestions, setShowSuggestions] = useState(false)
   const inputRef = useRef(null)
   const { addTodo, todos } = useTodo()

   const add = (e) => {
      e.preventDefault()
      if (!todo) return
      addTodo({
         todo,
         completed: false,
         dueDate: dueDate || null,
         priority: priority,
         category: category,
         createdAt: new Date().toISOString(),
      })
      setTodo('')
      setDueDate('')
      setPriority('medium')
      setCategory('personal')
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
      </form>
   )
}

export default TodoForm
