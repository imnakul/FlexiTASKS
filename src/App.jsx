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
   let priorityHidden = !appTheme.taskInterface.features.priority
   let categoryHidden = !appTheme.taskInterface.features.category
   let dueDateHidden = !appTheme.taskInterface.features.dueDate
   let allSortHidden = false
   if (priorityHidden && categoryHidden && dueDateHidden) {
      allSortHidden = true
   }

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

            <div
               className={`flex w-screen min-h-screen h-full ${getColorClass(
                  appTheme.colorTheme
               )}`}
            >
               <div className='container mx-auto pb-4 pt-20'>
                  <div
                     className={`${
                        appTheme.taskInterface.mode === 'minimal'
                           ? 'sm:max-w-2xl max-w-sm'
                           : viewMode === 'kanban'
                           ? 'max-w-7xl'
                           : 'sm:max-w-6xl max-w-sm'
                     } mx-auto space-y-8 transition-all duration-1000 ease-out `}
                  >
                     <div
                        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300 relative z-10 overflow-hidden border ${getColorClass(
                           appTheme.colorTheme,
                           'border'
                        )}`}
                     >
                        {/* //? MAXIMAL MODE SPLIT VIEW */}
                        {appTheme.taskInterface.mode === 'maximal' && (
                           <>
                              <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                 {/* //Form grid  */}
                                 <div>
                                    <div className='px-3.5 pt-4 pb-2 sm:px-6 sm:pt-5 sm:pb-3 border-b border-gray-200 dark:border-gray-700'>
                                       <h2
                                          className='text-base font-medium text-gray-800 dark:text-gray-200 
                            mb-3 sm:mb-4 space-grotesk'
                                       >
                                          Add New Task
                                       </h2>
                                       <TodoForm />
                                    </div>

                                    <div className='px-4 py-2 sm:px-6 sm:py-4  bg-gray-50 dark:bg-gray-800/50 border-b border-gray-400 dark:border-gray-700 '>
                                       <div className='flex flex-col gap-3 sm:gap-4'>
                                          {appTheme.taskInterface.features
                                             .viewModes && (
                                             <div>
                                                <h3 className='space-grotesk text-sm font-medium text-gray-500 dark:text-gray-400 mb-2'>
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
                                             <div className='flex flex-col sm:flex-row sm:gap-4 gap-3 justify-between '>
                                                <div className='flex flex-wrap gap-2'>
                                                   <button
                                                      onClick={() =>
                                                         setFilter('all')
                                                      }
                                                      className={`space-grotesk px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
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
                                                      onClick={() =>
                                                         setFilter('active')
                                                      }
                                                      className={`space-grotesk px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
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
                                                      onClick={() =>
                                                         setFilter('completed')
                                                      }
                                                      className={`space-grotesk px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
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
                                                {!allSortHidden && (
                                                   <select
                                                      value={sortBy}
                                                      onChange={(e) =>
                                                         setSortBy(
                                                            e.target.value
                                                         )
                                                      }
                                                      className='space-grotesk px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 w-full sm:w-auto'
                                                   >
                                                      {!priorityHidden && (
                                                         <option value='priority'>
                                                            Sort by Priority
                                                         </option>
                                                      )}
                                                      {!dueDateHidden && (
                                                         <option value='dueDate'>
                                                            Sort by Due Date
                                                         </option>
                                                      )}
                                                      {!categoryHidden && (
                                                         <option value='category'>
                                                            Sort by Category
                                                         </option>
                                                      )}
                                                   </select>
                                                )}
                                             </div>
                                          )}
                                       </div>
                                    </div>
                                 </div>
                                 {/* //Todo Grid  */}
                                 <div>
                                    <div className='p-3 sm:p-4 overflow-y-auto md:h-[55vh] lg:h-[88vh] '>
                                       <div className='space-y-3 '>
                                          {viewMode === 'list' && (
                                             <div className='space-y-3  '>
                                                {displayTodos.map((todo) => (
                                                   <TodoItem
                                                      key={todo.id}
                                                      todo={todo}
                                                   />
                                                ))}
                                                {displayTodos.length === 0 && (
                                                   <p className='text-center text-gray-500 dark:text-gray-400 py-4'>
                                                      No tasks to display
                                                   </p>
                                                )}
                                             </div>
                                          )}
                                          {viewMode === 'kanban' && (
                                             <KanbanView />
                                          )}
                                          {viewMode === 'matrix' && (
                                             <MatrixView />
                                          )}
                                          {viewMode === 'timeline' && (
                                             <TimelineView />
                                          )}
                                          {viewMode === 'calendar' && (
                                             <CalendarView />
                                          )}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </>
                        )}

                        {/* //? MINIMAL MODE */}
                        {appTheme.taskInterface.mode === 'minimal' && (
                           <>
                              <div className='px-3.5 pt-4 pb-2 sm:px-6 sm:pt-5 sm:pb-3 border-b border-gray-200 dark:border-gray-700'>
                                 <h2
                                    className='text-base font-medium text-gray-800 dark:text-gray-200 
                            mb-3 sm:mb-4 space-grotesk'
                                 >
                                    Add New Task
                                 </h2>
                                 <TodoForm />
                              </div>

                              <div className='px-4 py-2 sm:px-6 sm:py-4  bg-gray-50 dark:bg-gray-800/50 border-b border-gray-400 dark:border-gray-700 '>
                                 <div className='flex flex-col gap-3 sm:gap-4'>
                                    {appTheme.taskInterface.features
                                       .viewModes && (
                                       <div>
                                          <h3 className='space-grotesk text-sm font-medium text-gray-500 dark:text-gray-400 mb-2'>
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
                                       <div className='flex flex-col sm:flex-row sm:gap-4 gap-3 justify-between '>
                                          <div className='flex flex-wrap gap-2'>
                                             <button
                                                onClick={() => setFilter('all')}
                                                className={`space-grotesk px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
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
                                                onClick={() =>
                                                   setFilter('active')
                                                }
                                                className={`space-grotesk px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
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
                                                onClick={() =>
                                                   setFilter('completed')
                                                }
                                                className={`space-grotesk px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
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
                                          {!allSortHidden && (
                                             <select
                                                value={sortBy}
                                                onChange={(e) =>
                                                   setSortBy(e.target.value)
                                                }
                                                className='space-grotesk px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 w-full sm:w-auto'
                                             >
                                                {!priorityHidden && (
                                                   <option value='priority'>
                                                      Sort by Priority
                                                   </option>
                                                )}
                                                {!dueDateHidden && (
                                                   <option value='dueDate'>
                                                      Sort by Due Date
                                                   </option>
                                                )}
                                                {!categoryHidden && (
                                                   <option value='category'>
                                                      Sort by Category
                                                   </option>
                                                )}
                                             </select>
                                          )}
                                       </div>
                                    )}
                                 </div>
                              </div>

                              <div className='p-4 sm:p-6'>
                                 <div className='space-y-3'>
                                    {viewMode === 'list' && (
                                       <div className='space-y-3 p-3 sm:p-4 overflow-y-auto sm:h-[45vh] h-[52vh]'>
                                          {displayTodos.map((todo) => (
                                             <TodoItem
                                                key={todo.id}
                                                todo={todo}
                                             />
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
                                    {viewMode === 'timeline' && (
                                       <TimelineView />
                                    )}
                                    {viewMode === 'calendar' && (
                                       <CalendarView />
                                    )}
                                 </div>
                              </div>
                           </>
                        )}

                        {/* //? CUSTOM MODE */}
                        {appTheme.taskInterface.mode === 'custom' && (
                           <>
                              <div className='px-3.5 pt-4 pb-2 sm:px-6 sm:pt-5 sm:pb-3 border-b border-gray-200 dark:border-gray-700'>
                                 <h2
                                    className='text-base font-medium text-gray-800 dark:text-gray-200 
                            mb-3 sm:mb-4 space-grotesk'
                                 >
                                    Add New Task
                                 </h2>
                                 <TodoForm />
                              </div>

                              <div className='px-4 py-2 sm:px-6 sm:py-4  bg-gray-50 dark:bg-gray-800/50 border-b border-gray-400 dark:border-gray-700 '>
                                 <div className='flex flex-col gap-3 sm:gap-4'>
                                    {appTheme.taskInterface.features
                                       .viewModes && (
                                       <div>
                                          <h3 className='space-grotesk text-sm font-medium text-gray-500 dark:text-gray-400 mb-2'>
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
                                       <div className='flex flex-col sm:flex-row sm:gap-4 gap-3 justify-between '>
                                          <div className='flex flex-wrap gap-2'>
                                             <button
                                                onClick={() => setFilter('all')}
                                                className={`space-grotesk px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
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
                                                onClick={() =>
                                                   setFilter('active')
                                                }
                                                className={`space-grotesk px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
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
                                                onClick={() =>
                                                   setFilter('completed')
                                                }
                                                className={`space-grotesk px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
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
                                          {!allSortHidden && (
                                             <select
                                                value={sortBy}
                                                onChange={(e) =>
                                                   setSortBy(e.target.value)
                                                }
                                                className='space-grotesk px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 w-full sm:w-auto'
                                             >
                                                {!priorityHidden && (
                                                   <option value='priority'>
                                                      Sort by Priority
                                                   </option>
                                                )}
                                                {!dueDateHidden && (
                                                   <option value='dueDate'>
                                                      Sort by Due Date
                                                   </option>
                                                )}
                                                {!categoryHidden && (
                                                   <option value='category'>
                                                      Sort by Category
                                                   </option>
                                                )}
                                             </select>
                                          )}
                                       </div>
                                    )}
                                 </div>
                              </div>

                              <div className='p-4 sm:p-6'>
                                 <div className='space-y-3'>
                                    {viewMode === 'list' && (
                                       <div className='space-y-3'>
                                          {displayTodos.map((todo) => (
                                             <TodoItem
                                                key={todo.id}
                                                todo={todo}
                                             />
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
                                    {viewMode === 'timeline' && (
                                       <TimelineView />
                                    )}
                                    {viewMode === 'calendar' && (
                                       <CalendarView />
                                    )}
                                 </div>
                              </div>
                           </>
                        )}
                     </div>

                     {/* <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 transition-colors duration-300 relative z-10'>
                     <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4'>
                        Your Achievements
                     </h2>
                     <Achievements todos={todos} />
                  </div> */}
                  </div>
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
