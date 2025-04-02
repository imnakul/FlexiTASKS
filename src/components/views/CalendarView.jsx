import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useAppTheme } from '../../contexts/AppThemeContext'

function CalendarView() {
   const todos = useSelector((state) => state.todos.todos)
   const { appTheme, getColorClass } = useAppTheme()
   const [currentDate, setCurrentDate] = useState(new Date())
   const [selectedDate, setSelectedDate] = useState(null)

   const getDaysInMonth = (date) => {
      const year = date.getFullYear()
      const month = date.getMonth()
      const daysInMonth = new Date(year, month + 1, 0).getDate()
      const firstDayOfMonth = new Date(year, month, 1).getDay()
      return { daysInMonth, firstDayOfMonth }
   }

   const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentDate)
   const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
   const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i)

   const getTodosForDate = (day) => {
      const date = new Date(
         currentDate.getFullYear(),
         currentDate.getMonth(),
         day
      )
         .toISOString()
         .split('T')[0]
      return todos.filter((todo) => todo.dueDate === date)
   }

   const nextMonth = () => {
      setCurrentDate(
         new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
      )
      setSelectedDate(null)
   }

   const prevMonth = () => {
      setCurrentDate(
         new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
      )
      setSelectedDate(null)
   }

   return (
      <div className='p-4'>
         {/* Calendar Header */}
         <div className='flex items-center justify-between mb-6'>
            <button
               onClick={prevMonth}
               className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700'
            >
               <FaChevronLeft className='w-4 h-4 text-gray-600 dark:text-gray-300' />
            </button>
            <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
               {currentDate.toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
               })}
            </h2>
            <button
               onClick={nextMonth}
               className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700'
            >
               <FaChevronRight className='w-4 h-4 text-gray-600 dark:text-gray-300' />
            </button>
         </div>

         {/* Desktop Calendar View */}
         <div className='hidden sm:block'>
            <div className='grid grid-cols-7 gap-4 mb-4 text-center'>
               {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div
                     key={day}
                     className='p-2 font-medium text-gray-600 dark:text-gray-300'
                  >
                     {day}
                  </div>
               ))}
            </div>

            <div className='grid grid-cols-7 gap-4'>
               {blanks.map((i) => (
                  <div key={`blank-${i}`} className='aspect-square' />
               ))}
               {days.map((day) => {
                  const todosForDay = getTodosForDate(day)
                  const hasEvents = todosForDay.length > 0

                  return (
                     <div
                        key={day}
                        className={`aspect-square p-2 rounded-lg border border-gray-200 dark:border-gray-700 ${getColorClass(
                           appTheme.colorTheme,
                           'hover'
                        )} ${getColorClass(
                           appTheme.colorTheme
                        )} transition-all duration-200`}
                     >
                        <div className='h-full flex flex-col'>
                           <div className='text-right text-sm font-medium mb-2 text-gray-900 dark:text-gray-100'>
                              {day}
                           </div>
                           <div className='flex-1 overflow-y-auto space-y-1'>
                              {todosForDay.map((todo) => (
                                 <div
                                    key={todo.id}
                                    className={`text-xs p-1.5 rounded ${
                                       todo.completed
                                          ? 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-200'
                                          : `
                                          ${getColorClass(
                                             appTheme.colorTheme
                                          )} ${getColorClass(
                                               appTheme.colorTheme,
                                               'text'
                                            )}`
                                    }`}
                                 >
                                    {todo.todo}
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  )
               })}
            </div>
         </div>

         {/* Mobile Calendar View */}
         <div className='sm:hidden'>
            <div className='grid grid-cols-7 gap-1 mb-4 text-center text-sm font-medium'>
               {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                  <div
                     key={day}
                     className='p-2 text-gray-600 dark:text-gray-300'
                  >
                     {day}
                  </div>
               ))}
            </div>

            <div className='grid grid-cols-7 gap-1'>
               {blanks.map((i) => (
                  <div key={`blank-${i}`} className='aspect-square' />
               ))}
               {days.map((day) => {
                  const todosForDay = getTodosForDate(day)
                  const isSelected = selectedDate === day
                  const hasEvents = todosForDay.length > 0

                  return (
                     <div
                        key={day}
                        onClick={() => setSelectedDate(isSelected ? null : day)}
                        className={`aspect-square p-1 rounded-lg cursor-pointer transition-all duration-200 ${
                           isSelected
                              ? ` ${getColorClass(appTheme.colorTheme)}`
                              : hasEvents
                              ? 'bg-gray-50 dark:bg-gray-800/50'
                              : ''
                        }`}
                     >
                        <div className='h-full flex flex-col'>
                           <div
                              className={`text-sm font-medium mb-1 text-gray-900 dark:text-gray-100 ${
                                 hasEvents
                                    ? `${getColorClass(
                                         appTheme.colorTheme,
                                         'text'
                                      )}`
                                    : ''
                              }`}
                           >
                              {day}
                           </div>
                           <div className='flex-1 overflow-y-auto'>
                              {hasEvents && !isSelected && (
                                 <div
                                    className={`text-xs ${getColorClass(
                                       appTheme.colorTheme,
                                       'text'
                                    )}`}
                                 >
                                    {todosForDay.length} task
                                    {todosForDay.length !== 1 ? 's' : ''}
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>
                  )
               })}
            </div>

            {/* Mobile Task List */}
            {selectedDate && (
               <div className='mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg'>
                  <h3 className='text-lg font-medium mb-4 text-gray-900 dark:text-gray-100'>
                     Tasks for{' '}
                     {currentDate.toLocaleString('default', { month: 'long' })}{' '}
                     {selectedDate}
                  </h3>
                  <div className='space-y-2'>
                     {getTodosForDate(selectedDate).map((todo) => (
                        <div
                           key={todo.id}
                           className='p-3 rounded-lg bg-gray-50 dark:bg-gray-700'
                        >
                           <div className='flex items-center gap-2'>
                              <input
                                 type='checkbox'
                                 checked={todo.completed}
                                 onChange={() => toggleComplete(todo.id)}
                                 className={`w-4 h-4 rounded border-gray-300 
                                     ${getColorClass(
                                        appTheme.colorTheme,
                                        'text'
                                     )} ${getColorClass(
                                    appTheme.colorTheme,
                                    'ring'
                                 )}`}
                              />
                              <span
                                 className={`flex-1 text-gray-900 dark:text-gray-100 ${
                                    todo.completed
                                       ? 'line-through text-gray-500'
                                       : ''
                                 }`}
                              >
                                 {todo.todo}
                              </span>
                           </div>
                           <div className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                              {todo.priority} • {todo.category}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export default CalendarView
