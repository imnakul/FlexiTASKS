import { useSelector } from 'react-redux'
import TodoItem from '../TodoItem'
import { AnimatePresence, motion } from 'framer-motion'

function TimelineView() {
   const todos = useSelector((state) => state.todos.todos)

   const getTodosByDate = () => {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      const nextWeek = new Date(today)
      nextWeek.setDate(nextWeek.getDate() + 7)

      return {
         today: todos.filter(
            (todo) =>
               todo.dueDate &&
               new Date(todo.dueDate).toDateString() === today.toDateString() &&
               !todo.completed
         ),
         tomorrow: todos.filter(
            (todo) =>
               todo.dueDate &&
               new Date(todo.dueDate).toDateString() ===
                  tomorrow.toDateString() &&
               !todo.completed
         ),
         thisWeek: todos.filter(
            (todo) =>
               todo.dueDate &&
               new Date(todo.dueDate) > tomorrow &&
               new Date(todo.dueDate) <= nextWeek &&
               !todo.completed
         ),
         later: todos.filter(
            (todo) =>
               todo.dueDate &&
               new Date(todo.dueDate) > nextWeek &&
               !todo.completed
         ),
         completed: todos.filter((todo) => todo.completed),
      }
   }

   const sections = [
      {
         id: 'today',
         label: 'Today',
         color: 'bg-red-100 dark:bg-red-900/30',
      },
      {
         id: 'tomorrow',
         label: 'Tomorrow',
         color: 'bg-orange-100 dark:bg-orange-900/30',
      },
      {
         id: 'thisWeek',
         label: 'This Week',
         color: 'bg-yellow-100 dark:bg-yellow-900/30',
      },
      {
         id: 'later',
         label: 'Later',
         color: 'bg-green-100 dark:bg-green-900/30',
      },
      {
         id: 'completed',
         label: 'Completed',
         color: 'bg-gray-100 dark:bg-gray-700',
      },
   ]

   const todosByDate = getTodosByDate()

   return (
      <div className='space-y-6'>
         {sections.map((section) => (
            <div
               key={section.id}
               className={`${section.color} rounded-lg sm:p-4 p-2`}
            >
               <h3 className='space-grotesk text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300'>
                  {section.label}
               </h3>
               <div className='inter space-y-3'>
                  <AnimatePresence>
                     {todosByDate[section.id].map((todo) => (
                        <motion.div
                           key={todo.id}
                           layout
                           initial={{
                              opacity: 0,
                              y: 10,
                           }}
                           animate={{
                              opacity: 1,
                              y: 0,
                           }}
                           exit={{
                              opacity: 0,
                              scale: 0.9,
                           }}
                           transition={{
                              duration: 0.25,
                              ease: 'easeInOut',
                           }}
                        >
                           <TodoItem key={todo.id} todo={todo} />
                        </motion.div>
                     ))}
                  </AnimatePresence>
               </div>
            </div>
         ))}
      </div>
   )
}

export default TimelineView
