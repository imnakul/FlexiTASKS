import { useState, useEffect } from 'react'

const GENERAL_SUGGESTIONS = [
   'Go for a haircut',
   'Schedule dentist appointment',
   'Buy groceries',
   'Call mom',
   'Pay utility bills',
   'Review project timeline',
   'Update resume',
   'Plan weekend activities',
   'Clean the house',
   'Organize workspace',
]

function TaskSuggestions({ input, onSelect, todos }) {
   const [suggestions, setSuggestions] = useState([])

   useEffect(() => {
      if (!input) {
         setSuggestions([])
         return
      }

      // Filter past todos that match the input
      const pastTodos = todos
         .filter(
            (todo) =>
               todo.todo.toLowerCase().includes(input.toLowerCase()) &&
               !todo.todo.toLowerCase().startsWith(input.toLowerCase())
         )
         .map((todo) => todo.todo)

      // Filter general suggestions that match the input
      const generalSuggestions = GENERAL_SUGGESTIONS.filter(
         (suggestion) =>
            suggestion.toLowerCase().includes(input.toLowerCase()) &&
            !suggestion.toLowerCase().startsWith(input.toLowerCase())
      )

      // Combine and deduplicate suggestions
      const allSuggestions = [
         ...new Set([...pastTodos, ...generalSuggestions]),
      ].slice(0, 5) // Limit to 5 suggestions

      setSuggestions(allSuggestions)
   }, [input, todos])

   if (!suggestions.length) return null

   return (
      <div className='absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden'>
         <ul className='py-1'>
            {suggestions.map((suggestion, index) => (
               <li
                  key={index}
                  className='px-4 py-2 hover:bg-indigo-50 cursor-pointer transition-colors duration-200 flex items-center gap-2'
                  onClick={() => onSelect(suggestion)}
               >
                  <svg
                     className='w-4 h-4 text-indigo-500'
                     fill='none'
                     stroke='currentColor'
                     viewBox='0 0 24 24'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M13 7l5 5m0 0l-5 5m5-5H6'
                     />
                  </svg>
                  <span className='text-gray-700'>{suggestion}</span>
               </li>
            ))}
         </ul>
      </div>
   )
}

export default TaskSuggestions
