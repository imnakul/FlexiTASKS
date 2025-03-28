import { useState, useEffect } from 'react'

const GENERAL_SUGGESTIONS = [
   'Go for a walk',
   'Read a book',
   'Meditate',
   'Exercise',
   'Take a shower',
   'Make breakfast',
   'Check emails',
   'Go for haircut',
   'Buy groceries',
   'Call family',
   'Pay bills',
   'Clean room',
   'Do laundry',
   'Study',
   'Practice coding',
   'Attend meeting',
   'Review project',
   'Take notes',
   'Plan weekend',
   'Set goals',
]

function TaskSuggestions({ input, onSelect, todos }) {
   const [suggestions, setSuggestions] = useState([])

   useEffect(() => {
      if (!input.trim()) {
         setSuggestions([])
         return
      }

      // Filter past todos that match the input
      const pastTodos = todos
         .filter((todo) =>
            todo.todo.toLowerCase().includes(input.toLowerCase())
         )
         .map((todo) => todo.todo)

      // Filter general suggestions that don't start with the current input
      const generalSuggestions = GENERAL_SUGGESTIONS.filter(
         (suggestion) =>
            suggestion.toLowerCase().includes(input.toLowerCase()) &&
            !suggestion.toLowerCase().startsWith(input.toLowerCase())
      )

      // Combine and deduplicate suggestions
      const combinedSuggestions = [
         ...new Set([...pastTodos, ...generalSuggestions]),
      ]
      setSuggestions(combinedSuggestions.slice(0, 5))
   }, [input, todos])

   if (suggestions.length === 0) return null

   return (
      <div className='absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50'>
         <ul className='py-1'>
            {suggestions.map((suggestion, index) => (
               <li key={index}>
                  <button
                     className='w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
                     onClick={() => onSelect(suggestion)}
                  >
                     {suggestion}
                  </button>
               </li>
            ))}
         </ul>
      </div>
   )
}

export default TaskSuggestions
