import { useState, useEffect, useContext, useRef } from 'react'
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
import { VscFoldDown, VscFoldUp } from 'react-icons/vsc'
import { IoIosAdd } from 'react-icons/io'
import { motion, AnimatePresence } from 'framer-motion'
import MatrixHelpTooltip from './components/MatrixHelpToolkit.jsx'

function App() {
   const todos = useSelector((state) => state.todos.todos)
   const [filter, setFilter] = useState('all')
   const [sortBy, setSortBy] = useState('priority')
   const [viewMode, setViewMode] = useState('list')
   const [formAreaShow, setFormAreaShow] = useState(false)
   const [isMobile, setIsMobile] = useState(false)
   const { appTheme, getColorClass } = useAppTheme()
   let priorityHidden = !appTheme.taskInterface.features.priority
   let categoryHidden = !appTheme.taskInterface.features.category
   let dueDateHidden = !appTheme.taskInterface.features.dueDate
   let allSortHidden = false

   if (priorityHidden && categoryHidden && dueDateHidden) {
      allSortHidden = true
   }

   useEffect(() => {
      const checkScreen = () => {
         setIsMobile(window.innerWidth < 640)
      }

      checkScreen() // run once at mount
      window.addEventListener('resize', checkScreen)

      return () => window.removeEventListener('resize', checkScreen)
   }, [])

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

   const handleFormArea = () => {
      setFormAreaShow(!formAreaShow)
   }

   const todoFormRef = useRef(null)

   const variants = {
      hidden: {
         opacity: 0,
         scale: 0.95,
         filter: 'blur(4px)',
      },
      visible: {
         opacity: 1,
         scale: 1,
         filter: 'blur(0px)',
         transition: { duration: 0.4 },
      },
      exit: {
         opacity: 0,
         scale: 0.97,
         filter: 'blur(2px)',
         transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      },
   }

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
            <MistyGlowParticles particleCount={50} particleColor={particle} />
         )}
         {appTheme.background === 'orbs' && (
            <FloatingGlowingOrbs orbColor={particle} />
         )}
         {appTheme.background === 'rain' && (
            <RainBackground rainColor={particle} />
         )}

         {appTheme.background === 'none' && <></>}

         <div className='min-h-screen min-w-screen overflow-x-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300'>
            <Navbar />

            <div
               className={`flex w-full min-h-screen transition-colors duration-1000 ease-in-out ${getColorClass(
                  appTheme.colorTheme,
                  'background'
               )}`}
            >
               <div className='container mx-auto pb-4 pt-20 '>
                  <div
                     className={`${
                        appTheme.taskInterface.mode === 'minimal'
                           ? 'sm:max-w-2xl max-w-sm'
                           : appTheme.taskInterface.mode === 'custom'
                           ? 'max-w-5xl'
                           : viewMode === 'kanban'
                           ? 'max-w-7xl'
                           : 'sm:max-w-7xl max-w-sm'
                     } mx-auto space-y-8 transition-all duration-1000 ease-out `}
                  >
                     <motion.div
                        initial={{
                           opacity: 0,
                           scale: 0.9,
                           filter: 'blur(6px)',
                        }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{
                           duration: 0.8,
                           ease: 'easeOut',
                        }}
                     >
                        <div
                           className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300 relative z-10 overflow-hidden border ${getColorClass(
                              appTheme.colorTheme,
                              'border'
                           )}`}
                        >
                           {/* //* MAXIMAL MODE SPLIT VIEW */}
                           {appTheme.taskInterface.mode === 'maximal' && (
                              <>
                                 <div
                                    className={`relative grid grid-cols-1 ${
                                       viewMode === 'timeline'
                                          ? 'lg:grid lg:grid-cols-2'
                                          : viewMode === 'calendar' ||
                                            viewMode === 'kanban'
                                          ? 'lg:grid-cols-1'
                                          : 'lg:grid-cols-2'
                                    } gap-2`}
                                 >
                                    {/* //?Form grid  */}
                                    {/* //Collpase extend button for mobile view */}
                                    <button
                                       className='sm:hidden block absolute top-5 right-5'
                                       onClick={handleFormArea}
                                    >
                                       {formAreaShow ? (
                                          <VscFoldUp
                                             className={`size-4 font-bold text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 `}
                                             style={{ strokeWidth: 1 }}
                                          />
                                       ) : (
                                          <VscFoldDown
                                             className={`size-4 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200`}
                                             style={{ strokeWidth: 1 }}
                                          />
                                       )}
                                    </button>
                                    {/* //? Form - Left Side part  */}
                                    {/* <motion.div
                                       initial={{ opacity: 0, x: -30 }}
                                       animate={{ opacity: 1, x: 0 }}
                                       transition={{
                                          duration: 0.6,
                                          delay: 0.6,
                                       }}
                                    > */}
                                    <div>
                                       <AnimatePresence>
                                          {(!isMobile ||
                                             (isMobile && formAreaShow)) && (
                                             <>
                                                <motion.div
                                                   key='form-slide'
                                                   initial={{
                                                      height: 0,
                                                      opacity: 0,
                                                      y: -20,
                                                   }}
                                                   animate={{
                                                      height: 'auto',
                                                      opacity: 1,
                                                      y: 0,
                                                   }}
                                                   exit={{
                                                      height: 0,
                                                      opacity: 0,
                                                      y: -20,
                                                   }}
                                                   transition={{
                                                      duration: 0.5,
                                                      ease: 'easeInOut',
                                                   }}
                                                   className={`overflow-hidden ${
                                                      viewMode === 'timeline'
                                                         ? 'lg:w-[500px]'
                                                         : ''
                                                   }`}
                                                >
                                                   <div className='px-3.5 pt-4 pb-2 sm:px-6 sm:pt-5 sm:pb-3 border-b border-gray-200 dark:border-gray-700 transition-all ease-in-out duration-800'>
                                                      <h2
                                                         className='text-sm font-medium text-gray-500 dark:text-gray-400 
                            mb-3 space-grotesk'
                                                      >
                                                         Add New Task
                                                      </h2>

                                                      <TodoForm
                                                         ref={todoFormRef}
                                                      />
                                                   </div>
                                                </motion.div>
                                             </>
                                          )}
                                       </AnimatePresence>
                                       <div className='px-4 py-2 sm:px-6 sm:py-4  bg-gray-50 dark:bg-gray-800/50 border-b border-gray-400 dark:border-gray-700 '>
                                          <div className='flex flex-col gap-3 sm:gap-4'>
                                             {appTheme.taskInterface.features
                                                .viewModes && (
                                                <div>
                                                   <div className='flex items-center relative'>
                                                      <h3
                                                         className={`space-grotesk text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-4 ${
                                                            !formAreaShow &&
                                                            isMobile
                                                               ? 'mt-3 mb-3'
                                                               : 'mt-0 mb-2'
                                                         }`}
                                                      >
                                                         View Mode
                                                      </h3>
                                                      {viewMode ===
                                                         'matrix' && (
                                                         <MatrixHelpTooltip />
                                                      )}
                                                   </div>
                                                   <ViewModeSelector
                                                      viewMode={viewMode}
                                                      setViewMode={setViewMode}
                                                   />
                                                </div>
                                             )}

                                             {/* //? Visible sorting and Filtering in List mode only  */}
                                             {viewMode === 'list' && (
                                                <div className='flex flex-col sm:flex-row sm:gap-4 gap-3 justify-between '>
                                                   <div className='relative flex flex-wrap gap-2'>
                                                      {[
                                                         'all',
                                                         'active',
                                                         'completed',
                                                      ].map((item) => (
                                                         <div
                                                            key={item}
                                                            className='relative'
                                                         >
                                                            {filter ===
                                                               item && (
                                                               <motion.div
                                                                  layoutId='filterHighlight'
                                                                  className={`absolute inset-0 z-0 rounded-lg ${getColorClass(
                                                                     appTheme.colorTheme,
                                                                     'buttonbg'
                                                                  )}`}
                                                                  transition={{
                                                                     type: 'spring',
                                                                     stiffness: 200,
                                                                     damping: 30,
                                                                  }}
                                                               />
                                                            )}

                                                            <button
                                                               onClick={() =>
                                                                  setFilter(
                                                                     item
                                                                  )
                                                               }
                                                               className={`relative z-10 space-grotesk px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                                  filter ===
                                                                  item
                                                                     ? 'text-white'
                                                                     : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                                               }`}
                                                            >
                                                               {item
                                                                  .charAt(0)
                                                                  .toUpperCase() +
                                                                  item.slice(1)}
                                                            </button>
                                                         </div>
                                                      ))}
                                                   </div>
                                                   {!allSortHidden && (
                                                      <select
                                                         value={sortBy}
                                                         onChange={(e) =>
                                                            setSortBy(
                                                               e.target.value
                                                            )
                                                         }
                                                         className={`space-grotesk px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 ${getColorClass(
                                                            appTheme.colorTheme,
                                                            'ring'
                                                         )} transition-all duration-200 w-full sm:w-auto`}
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
                                    {/* </motion.div> */}

                                    {/* //Todo Grid  */}

                                    <div>
                                       <div
                                          className={`p-4 sm:p-4 overflow-y-auto 
                                       ${
                                          !formAreaShow && viewMode === 'list'
                                             ? 'h-[65vh]'
                                             : !formAreaShow &&
                                               viewMode !== 'list'
                                             ? 'h-[68vh]'
                                             : ''
                                       } md:h-[55vh] lg:h-[88vh] `}
                                       >
                                          <div className='space-y-3 '>
                                             <AnimatePresence mode='wait'>
                                                <motion.div
                                                   key={viewMode}
                                                   variants={variants}
                                                   initial='hidden'
                                                   animate='visible'
                                                   exit='exit'
                                                   className='space-y-3'
                                                >
                                                   {viewMode === 'list' && (
                                                      <div className='space-y-4  '>
                                                         <AnimatePresence>
                                                            {displayTodos.map(
                                                               (todo) => (
                                                                  <motion.div
                                                                     key={
                                                                        todo.id
                                                                     }
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
                                                                     <TodoItem
                                                                        key={
                                                                           todo.id
                                                                        }
                                                                        todo={
                                                                           todo
                                                                        }
                                                                     />
                                                                  </motion.div>
                                                               )
                                                            )}
                                                         </AnimatePresence>
                                                         {displayTodos.length ===
                                                            0 && (
                                                            <p className='text-center text-gray-500 dark:text-gray-400 py-4'>
                                                               No tasks to
                                                               display
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
                                                </motion.div>
                                             </AnimatePresence>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <button
                                    onClick={() => {
                                       setFormAreaShow(true)
                                       setTimeout(() => {
                                          todoFormRef.current?.focusInput()
                                       }, 50) // Short delay, just enough for DOM to render
                                    }}
                                    className={`lg:hidden flex fixed right-8 bottom-16 space-grotesk px-4 py-4 rounded-xl text-sm font-medium ${getColorClass(
                                       appTheme.colorTheme,
                                       'buttonbg'
                                    )} text-white ${getColorClass(
                                       appTheme.colorTheme,
                                       'buttonbghover'
                                    )} transition-all duration-200 `}
                                 >
                                    <IoIosAdd className='size-6' />
                                 </button>
                              </>
                           )}

                           {/* //* MINIMAL MODE */}
                           {appTheme.taskInterface.mode === 'minimal' && (
                              <>
                                 <div className='px-3.5 pt-4 pb-2 sm:px-6 sm:pt-5 sm:pb-3 border-b border-gray-200 dark:border-gray-700'>
                                    <h2
                                       className='text-base font-medium text-gray-800 dark:text-gray-200 
                            mb-3 sm:mb-4 space-grotesk'
                                    >
                                       Add New Task
                                    </h2>
                                    <TodoForm ref={todoFormRef} />
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
                                                      setSortBy(e.target.value)
                                                   }
                                                   className={`space-grotesk px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 ${getColorClass(
                                                      appTheme.colorTheme,
                                                      'ring'
                                                   )} transition-all duration-200 w-full sm:w-auto`}
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

                                 <div className='p-2 sm:p-6'>
                                    <div className='space-y-3'>
                                       {viewMode === 'list' && (
                                          <div className='space-y-4 p-2 sm:p-4 overflow-y-auto sm:h-[45vh] h-[52vh]'>
                                             <AnimatePresence>
                                                {displayTodos.map((todo) => (
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
                                                      <TodoItem
                                                         key={todo.id}
                                                         todo={todo}
                                                      />
                                                   </motion.div>
                                                ))}
                                             </AnimatePresence>
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
                                 <button
                                    onClick={() => {
                                       setFormAreaShow(true)
                                       setTimeout(() => {
                                          todoFormRef.current?.focusInput()
                                       }, 0) // Short delay, just enough for DOM to render
                                    }}
                                    className={`lg:hidden flex fixed right-8 bottom-16 space-grotesk px-4 py-4 rounded-xl text-sm font-medium ${getColorClass(
                                       appTheme.colorTheme,
                                       'buttonbg'
                                    )} text-white ${getColorClass(
                                       appTheme.colorTheme,
                                       'buttonbghover'
                                    )} transition-all duration-200 `}
                                 >
                                    <IoIosAdd className='size-6' />
                                 </button>
                              </>
                           )}

                           {/* //* CUSTOM MODE */}
                           {appTheme.taskInterface.mode === 'custom' && (
                              <>
                                 <div className='relative'>
                                    <button
                                       className=' absolute top-5 right-5 sm:right-7'
                                       onClick={handleFormArea}
                                    >
                                       {formAreaShow ? (
                                          <VscFoldUp
                                             className={`size-4 font-bold text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 `}
                                             style={{ strokeWidth: 1 }}
                                          />
                                       ) : (
                                          <VscFoldDown
                                             className={`size-4 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200`}
                                             style={{ strokeWidth: 1 }}
                                          />
                                       )}
                                    </button>

                                    {formAreaShow && (
                                       <>
                                          <div className='px-3.5 pt-4 pb-2 sm:px-6 sm:pt-5 sm:pb-3 border-b border-gray-200 dark:border-gray-700 transition-all ease-in-out duration-800'>
                                             <h2
                                                className='text-sm font-medium text-gray-500 dark:text-gray-400 
                            mb-3 sm:mb-4 space-grotesk'
                                             >
                                                Add New Task
                                             </h2>

                                             <TodoForm ref={todoFormRef} />
                                          </div>
                                       </>
                                    )}
                                 </div>

                                 <div className='px-4 py-2 sm:px-6 sm:py-4  bg-gray-50 dark:bg-gray-800/50 border-b border-gray-400 dark:border-gray-700 '>
                                    <div className='flex flex-col gap-3 sm:gap-4'>
                                       {appTheme.taskInterface.features
                                          .viewModes && (
                                          <div>
                                             <div className='flex items-center relative'>
                                                <h3
                                                   className={`space-grotesk text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-4 ${
                                                      !formAreaShow && isMobile
                                                         ? 'mt-3 mb-3'
                                                         : 'mt-0 mb-2'
                                                   }`}
                                                >
                                                   View Mode
                                                </h3>
                                                {viewMode === 'matrix' && (
                                                   <MatrixHelpTooltip />
                                                )}
                                             </div>
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
                                                      setSortBy(e.target.value)
                                                   }
                                                   className={`space-grotesk px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 ${getColorClass(
                                                      appTheme.colorTheme,
                                                      'ring'
                                                   )} transition-all duration-200 w-full sm:w-auto`}
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

                                 <div
                                    className={`p-4 sm:p-6 overflow-y-auto ${
                                       !formAreaShow && viewMode === 'list'
                                          ? 'h-[65vh] '
                                          : !formAreaShow && viewMode !== 'list'
                                          ? 'h-[68vh]'
                                          : ''
                                    } `}
                                 >
                                    <div className='space-y-3'>
                                       <AnimatePresence mode='wait'>
                                          <motion.div
                                             key={viewMode}
                                             variants={variants}
                                             initial='hidden'
                                             animate='visible'
                                             exit='exit'
                                             className='space-y-3'
                                          >
                                             {viewMode === 'list' && (
                                                <div className='space-y-4'>
                                                   <AnimatePresence>
                                                      {displayTodos.map(
                                                         (todo) => (
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
                                                               <TodoItem
                                                                  key={todo.id}
                                                                  todo={todo}
                                                               />
                                                            </motion.div>
                                                         )
                                                      )}
                                                   </AnimatePresence>
                                                   {displayTodos.length ===
                                                      0 && (
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
                                          </motion.div>
                                       </AnimatePresence>
                                    </div>
                                 </div>
                                 <button
                                    onClick={() => {
                                       setFormAreaShow(true)
                                       setTimeout(() => {
                                          todoFormRef.current?.focusInput()
                                       }, 30) // Short delay, just enough for DOM to render
                                    }}
                                    className={`lg:hidden flex fixed right-8 bottom-16 space-grotesk px-4 py-4 rounded-xl text-sm font-medium ${getColorClass(
                                       appTheme.colorTheme,
                                       'buttonbg'
                                    )} text-white ${getColorClass(
                                       appTheme.colorTheme,
                                       'buttonbghover'
                                    )} transition-all duration-200 `}
                                 >
                                    <IoIosAdd className='size-6' />
                                 </button>
                              </>
                           )}
                           {/* //? Custom Mode Ends Here  */}
                        </div>
                     </motion.div>

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
