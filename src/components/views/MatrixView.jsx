import { useSelector } from 'react-redux'
import { useState } from 'react'

function MatrixView() {
   const todos = useSelector((state) => state.todos.todos)
   const [activeSection, setActiveSection] = useState(null)

   const matrix = {
      high: {
         urgent: todos.filter(
            (todo) =>
               todo.priority === 'high' &&
               todo.dueDate &&
               new Date(todo.dueDate) <=
                  new Date(Date.now() + 24 * 60 * 60 * 1000)
         ),
         notUrgent: todos.filter(
            (todo) =>
               todo.priority === 'high' &&
               (!todo.dueDate ||
                  new Date(todo.dueDate) >
                     new Date(Date.now() + 24 * 60 * 60 * 1000))
         ),
      },
      low: {
         urgent: todos.filter(
            (todo) =>
               todo.priority === 'low' &&
               todo.dueDate &&
               new Date(todo.dueDate) <=
                  new Date(Date.now() + 24 * 60 * 60 * 1000)
         ),
         notUrgent: todos.filter(
            (todo) =>
               todo.priority === 'low' &&
               (!todo.dueDate ||
                  new Date(todo.dueDate) >
                     new Date(Date.now() + 24 * 60 * 60 * 1000))
         ),
      },
   }

   const sections = [
      {
         id: 'doFirst',
         title: 'Do First',
         todos: matrix.high.urgent,
         bgColor: 'bg-red-100 dark:bg-red-900/30',
         textColor: 'text-red-700 dark:text-red-300',
      },
      {
         id: 'schedule',
         title: 'Schedule',
         todos: matrix.high.notUrgent,
         bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
         textColor: 'text-yellow-700 dark:text-yellow-300',
      },
      {
         id: 'delegate',
         title: 'Delegate',
         todos: matrix.low.urgent,
         bgColor: 'bg-blue-100 dark:bg-blue-900/30',
         textColor: 'text-blue-700 dark:text-blue-300',
      },
      {
         id: 'dontDo',
         title: "Don't Do",
         todos: matrix.low.notUrgent,
         bgColor: 'bg-green-100 dark:bg-green-900/30',
         textColor: 'text-green-700 dark:text-green-300',
      },
   ]

   return (
      <div className='p-4'>
         {/* Mobile View */}
         <div className='sm:hidden space-y-4'>
            {sections.map((section) => (
               <div
                  key={section.id}
                  className={`${section.bgColor} rounded-lg overflow-hidden`}
               >
                  <button
                     onClick={() =>
                        setActiveSection(
                           activeSection === section.id ? null : section.id
                        )
                     }
                     className='w-full p-4 text-left focus:outline-none'
                  >
                     <div className='flex items-center justify-between'>
                        <h3
                           className={`text-lg font-semibold ${section.textColor}`}
                        >
                           {section.title}
                        </h3>
                        <span className='text-sm text-gray-600 dark:text-gray-400'>
                           {section.todos.length} tasks
                        </span>
                     </div>
                  </button>

                  {activeSection === section.id && (
                     <div className='p-4 pt-0 space-y-2'>
                        {section.todos.map((todo) => (
                           <div
                              key={todo.id}
                              className='bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm'
                           >
                              <p className='font-medium text-gray-900 dark:text-gray-100'>
                                 {todo.todo}
                              </p>
                              {todo.dueDate && (
                                 <p className='text-sm text-gray-500 dark:text-gray-400'>
                                    Due:{' '}
                                    {new Date(
                                       todo.dueDate
                                    ).toLocaleDateString()}
                                 </p>
                              )}
                           </div>
                        ))}
                        {section.todos.length === 0 && (
                           <p className='text-gray-500 dark:text-gray-400 text-sm'>
                              No tasks in this category
                           </p>
                        )}
                     </div>
                  )}
               </div>
            ))}
         </div>

         {/* Desktop View */}
         <div className='hidden sm:grid grid-cols-2 gap-4'>
            <div className='space-y-4'>
               {sections.slice(0, 2).map((section) => (
                  <div
                     key={section.id}
                     className={`${section.bgColor} p-4 rounded-lg`}
                  >
                     <h3
                        className={`text-lg font-semibold ${section.textColor} mb-2`}
                     >
                        {section.title}
                     </h3>
                     <div className='space-y-2'>
                        {section.todos.map((todo) => (
                           <div
                              key={todo.id}
                              className='bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm'
                           >
                              <p className='font-medium text-gray-900 dark:text-gray-100'>
                                 {todo.todo}
                              </p>
                              {todo.dueDate && (
                                 <p className='text-sm text-gray-500 dark:text-gray-400'>
                                    Due:{' '}
                                    {new Date(
                                       todo.dueDate
                                    ).toLocaleDateString()}
                                 </p>
                              )}
                           </div>
                        ))}
                        {section.todos.length === 0 && (
                           <p className='text-gray-500 dark:text-gray-400 text-sm'>
                              No tasks in this category
                           </p>
                        )}
                     </div>
                  </div>
               ))}
            </div>

            <div className='space-y-4'>
               {sections.slice(2).map((section) => (
                  <div
                     key={section.id}
                     className={`${section.bgColor} p-4 rounded-lg`}
                  >
                     <h3
                        className={`text-lg font-semibold ${section.textColor} mb-2`}
                     >
                        {section.title}
                     </h3>
                     <div className='space-y-2'>
                        {section.todos.map((todo) => (
                           <div
                              key={todo.id}
                              className='bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm'
                           >
                              <p className='font-medium text-gray-900 dark:text-gray-100'>
                                 {todo.todo}
                              </p>
                              {todo.dueDate && (
                                 <p className='text-sm text-gray-500 dark:text-gray-400'>
                                    Due:{' '}
                                    {new Date(
                                       todo.dueDate
                                    ).toLocaleDateString()}
                                 </p>
                              )}
                           </div>
                        ))}
                        {section.todos.length === 0 && (
                           <p className='text-gray-500 dark:text-gray-400 text-sm'>
                              No tasks in this category
                           </p>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default MatrixView
