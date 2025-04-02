import { useState, useEffect, useContext } from 'react'
import Navbar from './components/Navbar'
import { TodoForm, TodoItem, Achievements } from './components/index'
import ViewModeSelector from './components/ViewModeSelector'
import KanbanView from './components/views/KanbanView'
import MatrixView from './components/views/MatrixView'
import TimelineView from './components/views/TimelineView'
import CalendarView from './components/views/CalendarView'
// import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ParticleBackground from './components/backgrounds/ParticleBackground.jsx'
import FogEffect from './components/backgrounds/FogEffect.jsx'
import MistyGlowParticles from './components/backgrounds/MistyGlowParticles.jsx'
import FloatingGlowingOrbs from './components/backgrounds/FloatingOrbs.jsx'
import WarpSpeedStarfield from './components/backgrounds/WarpSpaceSpeed.jsx'
import { useAppTheme } from './contexts/AppThemeContext'
import { useTheme } from './contexts/ThemeContext.jsx'
import { useSelector, useDispatch } from 'react-redux'
import RainBackground from './components/backgrounds/RainBackground.jsx'

function App() {
   const todos = useSelector((state) => state.todos.todos)
   const [filter, setFilter] = useState('all')
   const [sortBy, setSortBy] = useState('priority')
   const [viewMode, setViewMode] = useState('list')
   const { appTheme, getColorClass } = useAppTheme()

   // Filter todos based on the current filter
   const filteredTodos = todos.filter((todo) => {
      if (filter === 'active') return !todo.completed
      if (filter === 'completed') return todo.completed
      return true
   })

   useEffect(() => {
      if (!appTheme.taskInterface.mode.viewModes) {
         setViewMode('list')
      }
   }, [appTheme.taskInterface])

   // Sort filtered todos based on the current sortBy
   const displayTodos = [...filteredTodos].sort((a, b) => {
      if (sortBy === 'priority') {
         const priorityOrder = { high: 0, medium: 1, low: 2 }
         return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      if (sortBy === 'dueDate') {
         if (a.dueDate && b.dueDate) {
            return new Date(a.dueDate) - new Date(b.dueDate)
         }
         if (a.dueDate) return -1
         if (b.dueDate) return 1
         return 0
      }
      if (sortBy === 'category') {
         return a.category.localeCompare(b.category)
      }
      return 0
   })

   const particle = getColorClass(appTheme.colorTheme, 'particle')
   const theme = useTheme()

   return (
      <>
         {appTheme.background === 'particle' && (
            <ParticleBackground
               particleCount={80}
               particleColor={particle}
               linkColor={particle}
            />
         )}
         {appTheme.background === 'space' && (
            <WarpSpeedStarfield dark={theme.isDarkMode} particle={particle} />
         )}
         {appTheme.background === 'fog' && (
            <FogEffect particleColor={particle} />
         )}
         {appTheme.background === 'mistyGlow' && (
            <MistyGlowParticles particleCount={50} />
         )}
         {appTheme.background === 'orbs' && (
            <FloatingGlowingOrbs orbColor={particle} />
         )}
         {appTheme.background === 'rain' && (
            <RainBackground rainColor={particle} />
         )}

         {appTheme.background === 'none' && <></>}

         <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300'>
            <Navbar />

            <div className='container mx-auto px-4 py-4'>
               <div
                  className={`${
                     appTheme.taskInterface.mode === 'minimal'
                        ? 'max-w-xl'
                        : 'max-w-7xl'
                  } mx-auto space-y-8`}
               >
                  {/* <div className='text-center space-y-4'>
                           <h1 className='text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                              Task Master
                           </h1>
                           <p className='text-gray-600 dark:text-gray-300'>
                              Organize your tasks with style and efficiency
                           </p>
                        </div> */}

                  <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300 relative z-10 overflow-hidden'>
                     <div className='p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700'>
                        <h2
                           className='sm:text-xl text-base font-semibold text-gray-800 dark:text-gray-200 
                            mb-3 sm:mb-4'
                        >
                           Add New Task
                        </h2>
                        <TodoForm />
                     </div>

                     <div className='p-4 sm:p-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 '>
                        <div className='flex flex-col gap-6'>
                           {appTheme.taskInterface.features.viewModes && (
                              <div>
                                 <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-2'>
                                    View Mode
                                 </h3>
                                 <ViewModeSelector
                                    viewMode={viewMode}
                                    setViewMode={setViewMode}
                                 />
                              </div>
                           )}

                           {/* //? Visible sorting and Filtering in List mode only  */}
                           {viewMode === 'list' && (
                              <div className='flex flex-col sm:flex-row gap-4 justify-between '>
                                 <div className='flex flex-wrap gap-2'>
                                    <button
                                       onClick={() => setFilter('all')}
                                       className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                          filter === 'all'
                                             ? `${getColorClass(
                                                  appTheme.colorTheme,
                                                  'buttonbg'
                                               )} text-white`
                                             : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                       }`}
                                    >
                                       All
                                    </button>
                                    <button
                                       onClick={() => setFilter('active')}
                                       className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                          filter === 'active'
                                             ? `${getColorClass(
                                                  appTheme.colorTheme,
                                                  'buttonbg'
                                               )} text-white`
                                             : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                       }`}
                                    >
                                       Active
                                    </button>
                                    <button
                                       onClick={() => setFilter('completed')}
                                       className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                          filter === 'completed'
                                             ? `${getColorClass(
                                                  appTheme.colorTheme,
                                                  'buttonbg'
                                               )} text-white`
                                             : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                       }`}
                                    >
                                       Completed
                                    </button>
                                 </div>
                                 <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className='px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 w-full sm:w-auto'
                                 >
                                    <option value='priority'>
                                       Sort by Priority
                                    </option>
                                    <option value='dueDate'>
                                       Sort by Due Date
                                    </option>
                                    <option value='category'>
                                       Sort by Category
                                    </option>
                                 </select>
                              </div>
                           )}
                        </div>
                     </div>

                     <div className='p-4 sm:p-6'>
                        <div className='space-y-3'>
                           {viewMode === 'list' && (
                              <div className='space-y-3'>
                                 {displayTodos.map((todo) => (
                                    <TodoItem key={todo.id} todo={todo} />
                                 ))}
                                 {displayTodos.length === 0 && (
                                    <p className='text-center text-gray-500 dark:text-gray-400 py-4'>
                                       No tasks to display
                                    </p>
                                 )}
                              </div>
                           )}
                           {viewMode === 'kanban' && <KanbanView />}
                           {viewMode === 'matrix' && <MatrixView />}
                           {viewMode === 'timeline' && <TimelineView />}
                           {viewMode === 'calendar' && <CalendarView />}
                        </div>
                     </div>
                  </div>

                  {/* <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 transition-colors duration-300 relative z-10'>
                     <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4'>
                        Your Achievements
                     </h2>
                     <Achievements todos={todos} />
                  </div> */}
               </div>
            </div>
            <ToastContainer
               position='bottom-right'
               autoClose={1500}
               theme='colored'
               className='toast-container'
            />
         </div>
      </>
   )
}

export default App
