import { useState } from 'react'
import { useTodo } from '../../contexts/ToDoContext'
import TodoItem from '../TodoItem'

function CalendarView() {
   const { todos } = useTodo()
   const [currentDate, setCurrentDate] = useState(new Date())

   const getDaysInMonth = (date) => {
      const year = date.getFullYear()
      const month = date.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const days = []

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDay.getDay(); i++) {
         days.push(null)
      }

      // Add days of the month
      for (let i = 1; i <= lastDay.getDate(); i++) {
         days.push(new Date(year, month, i))
      }

      return days
   }

   const getTodosForDate = (date) => {
      if (!date) return []
      return todos.filter(
         (todo) =>
            todo.dueDate &&
            new Date(todo.dueDate).toDateString() === date.toDateString()
      )
   }

   const navigateMonth = (direction) => {
      setCurrentDate(
         new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + direction,
            1
         )
      )
   }

   const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
   ]

   const days = getDaysInMonth(currentDate)
   const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

   return (
      <div className='bg-white dark:bg-gray-800 rounded-lg p-4'>
         <div className='flex justify-between items-center mb-4'>
            <button
               onClick={() => navigateMonth(-1)}
               className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
            >
               ←
            </button>
            <h2 className='text-xl font-semibold text-gray-700 dark:text-gray-300'>
               {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
               onClick={() => navigateMonth(1)}
               className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
            >
               →
            </button>
         </div>

         <div className='grid grid-cols-7 gap-1'>
            {weekDays.map((day) => (
               <div
                  key={day}
                  className='text-center font-semibold text-gray-500 dark:text-gray-400 p-2'
               >
                  {day}
               </div>
            ))}
         </div>

         <div className='grid grid-cols-7 gap-1'>
            {days.map((date, index) => (
               <div
                  key={index}
                  className={`min-h-[100px] p-2 rounded-lg ${
                     date ? 'bg-gray-50 dark:bg-gray-700/50' : 'bg-transparent'
                  }`}
               >
                  {date && (
                     <>
                        <div className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                           {date.getDate()}
                        </div>
                        <div className='space-y-1'>
                           {getTodosForDate(date).map((todo) => (
                              <div
                                 key={todo.id}
                                 className={`text-xs p-1 rounded mb-1 truncate ${
                                    todo.completed
                                       ? 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-200'
                                       : 'bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-200'
                                 }`}
                              >
                                 {todo.todo}
                              </div>
                           ))}
                        </div>
                     </>
                  )}
               </div>
            ))}
         </div>
      </div>
   )
}

export default CalendarView
