import { useState, useEffect } from 'react'
import { FaHistory } from 'react-icons/fa'

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
   'Organize workspace',
   'Watch a movie',
   'Water plants',
   'Clean dishes',
   'Take out trash',
   'Declutter desk',
   'Backup files',
   'Stretch body',
   'Write journal',
   'Listen to music',
   'Charge phone',
   'Organize files',
   'Plan meals',
   'Make to-do list',
   'Update calendar',
   'Reflect on day',
   'Tidy up room',
   'Do yoga',
   'Meal prep',
   'Sort clothes',
   'Write notes',
   'Plan day',
   'Review tasks',
   'Check calendar',
   'Take a nap',
   'Clean house',
   'Organize closet',
   'Do laundry',
   'Plan trip',
   'Write blog post',
   'Gym workout',
   'Cook dinner',
   'Clean kitchen',
]

function TaskSuggestions({ input, onSelect, todos }) {
   const [suggestions, setSuggestions] = useState([])
   const [todoTexts, setTodoTexts] = useState([])

   useEffect(() => {
      if (!input.trim()) {
         setSuggestions([])
         return
      }

      //Extracting todos from the todos array of objects
      setTodoTexts(todos.map((t) => t.todo))

      // Combine and deduplicate suggestions
      const combinedSuggestions = [
         ...new Set([...todoTexts, ...GENERAL_SUGGESTIONS]),
      ]

      // Filter suggestions based on input
      const filteredSuggestions = combinedSuggestions.filter((item) =>
         item.toLowerCase().includes(input.toLowerCase())
      )

      // Prioritize suggestions that START with the input
      const prioritized = filteredSuggestions.sort((a, b) => {
         const aStarts = a.toLowerCase().startsWith(input.toLowerCase())
         const bStarts = b.toLowerCase().startsWith(input.toLowerCase())
         return aStarts === bStarts ? 0 : aStarts ? -1 : 1
      })

      // Limit to 5 suggestions
      setSuggestions(prioritized.slice(0, 5))
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
                     {console.log(todoTexts)}
                     {console.log(suggestion)}
                     {todoTexts.includes(suggestion) ? (
                        <div className='flex items-center justify-between'>
                           {suggestion}
                           <span className='text-sm text-gray-500 dark:text-gray-400'>
                              <FaHistory className='inline-block ' />
                           </span>
                        </div>
                     ) : (
                        <>{suggestion}</>
                     )}
                  </button>
               </li>
            ))}
         </ul>
      </div>
   )
}

export default TaskSuggestions
