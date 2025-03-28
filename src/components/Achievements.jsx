import { useEffect, useState } from 'react'

function Achievements({ todos }) {
   const [streak, setStreak] = useState(0)
   const [achievements, setAchievements] = useState([])

   useEffect(() => {
      // Calculate streak
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)

      const completedToday = todos.some((todo) => {
         if (!todo.completed || !todo.completedAt) return false
         const completedDate = new Date(todo.completedAt)
         return completedDate.toDateString() === today.toDateString()
      })

      const completedYesterday = todos.some((todo) => {
         if (!todo.completed || !todo.completedAt) return false
         const completedDate = new Date(todo.completedAt)
         return completedDate.toDateString() === yesterday.toDateString()
      })

      if (completedToday && completedYesterday) {
         setStreak((prev) => prev + 1)
      } else if (!completedToday) {
         setStreak(0)
      }

      // Check for achievements
      const newAchievements = []

      // Early Bird Achievement
      const earlyBirdTasks = todos.filter((todo) => {
         if (!todo.completed || !todo.dueDate || !todo.completedAt) return false
         const completedDate = new Date(todo.completedAt)
         const dueDate = new Date(todo.dueDate)
         return completedDate < dueDate
      })

      if (earlyBirdTasks.length >= 3 && !achievements.includes('earlyBird')) {
         newAchievements.push('earlyBird')
      }

      // Streak Achievements
      if (streak >= 7 && !achievements.includes('weekStreak')) {
         newAchievements.push('weekStreak')
      }
      if (streak >= 30 && !achievements.includes('monthStreak')) {
         newAchievements.push('monthStreak')
      }

      if (newAchievements.length > 0) {
         setAchievements((prev) => [...prev, ...newAchievements])
      }
   }, [todos, streak])

   const getAchievementBadge = (achievement) => {
      switch (achievement) {
         case 'earlyBird':
            return {
               icon: '🌅',
               title: 'Early Bird',
               description: 'Completed 3 tasks before their due date!',
            }
         case 'weekStreak':
            return {
               icon: '🔥',
               title: 'Week Warrior',
               description: 'Maintained a 7-day completion streak!',
            }
         case 'monthStreak':
            return {
               icon: '🌟',
               title: 'Monthly Master',
               description: 'Maintained a 30-day completion streak!',
            }
         default:
            return {
               icon: '🏆',
               title: 'Achievement',
               description: 'Unlocked a new achievement!',
            }
      }
   }

   return (
      <div className='bg-base-200/50 rounded-lg p-3 mb-4'>
         <div className='flex items-center justify-between mb-2'>
            <div className='flex items-center gap-2'>
               <span className='text-xl'>🔥</span>
               <span className='text-sm font-medium'>
                  {streak}-day streak for completing tasks on time!
               </span>
            </div>
            <div className='flex gap-1.5'>
               {achievements.map((achievement, index) => {
                  const badge = getAchievementBadge(achievement)
                  return (
                     <div
                        key={index}
                        className='tooltip tooltip-bottom'
                        data-tip={`${badge.title}: ${badge.description}`}
                     >
                        <span className='text-xl cursor-help'>
                           {badge.icon}
                        </span>
                     </div>
                  )
               })}
            </div>
         </div>
         <div className='w-full bg-base-300/50 rounded-full h-1.5'>
            <div
               className='bg-primary h-1.5 rounded-full transition-all duration-300'
               style={{ width: `${Math.min((streak / 30) * 100, 100)}%` }}
            ></div>
         </div>
      </div>
   )
}

export default Achievements
