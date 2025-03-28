import { useEffect, useState } from 'react'

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

function Achievements({ todos = [] }) {
   const [streak, setStreak] = useState(0)
   const [achievements, setAchievements] = useState([])

   useEffect(() => {
      // Calculate streak
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)

      const completedToday = todos.some(
         (todo) =>
            todo.completed &&
            new Date(todo.completedAt).toDateString() === today.toDateString()
      )
      const completedYesterday = todos.some(
         (todo) =>
            todo.completed &&
            new Date(todo.completedAt).toDateString() ===
               yesterday.toDateString()
      )

      if (completedToday) {
         if (completedYesterday) {
            setStreak((prev) => prev + 1)
         } else {
            setStreak(1)
         }
      } else {
         setStreak(0)
      }

      // Check for achievements
      const newAchievements = []

      // Early Bird achievement
      const earlyBirdTodos = todos.filter(
         (todo) =>
            todo.completed &&
            new Date(todo.completedAt) < new Date(todo.dueDate)
      )
      if (earlyBirdTodos.length >= 3) {
         newAchievements.push({
            id: 'early-bird',
            title: 'Early Bird',
            description: 'Completed 3 tasks before their due date',
            icon: '🌅',
         })
      }

      // Streak achievements
      if (streak >= 7) {
         newAchievements.push({
            id: 'week-streak',
            title: 'Week Warrior',
            description: 'Maintained a 7-day completion streak',
            icon: '🔥',
         })
      }
      if (streak >= 30) {
         newAchievements.push({
            id: 'month-streak',
            title: 'Monthly Master',
            description: 'Maintained a 30-day completion streak',
            icon: '🌟',
         })
      }

      setAchievements(newAchievements)
   }, [todos, streak])

   return (
      <div className='space-y-6'>
         <div>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2'>
               Your Progress
            </h2>
            <div className='flex items-center gap-4'>
               <div className='flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden'>
                  <div
                     className='h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500'
                     style={{
                        width: `${Math.min((streak / 30) * 100, 100)}%`,
                     }}
                  />
               </div>
               <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>
                  {streak} day{streak !== 1 ? 's' : ''} streak
               </span>
            </div>
         </div>

         {achievements.length > 0 && (
            <div>
               <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3'>
                  Achievements
               </h2>
               <div className='grid gap-3'>
                  {achievements.map((achievement) => (
                     <div
                        key={achievement.id}
                        className='flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600'
                     >
                        <span className='text-2xl'>{achievement.icon}</span>
                        <div>
                           <h3 className='font-medium text-gray-900 dark:text-gray-100'>
                              {achievement.title}
                           </h3>
                           <p className='text-sm text-gray-500 dark:text-gray-400'>
                              {achievement.description}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>
   )
}

export default Achievements
