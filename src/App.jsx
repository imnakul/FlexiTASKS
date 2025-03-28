import { useState, useEffect } from 'react'
import { TodoProvider } from './contexts/ToDoContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import { TodoForm, TodoItem, Achievements } from './components/index'
import ViewModeSelector from './components/ViewModeSelector'
import KanbanView from './components/views/KanbanView'
import MatrixView from './components/views/MatrixView'
import TimelineView from './components/views/TimelineView'
import CalendarView from './components/views/CalendarView'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Sorting, ClearTodos } from './functionalities/index.js'
import ParticleBackground from './components/ParticleBackground'

function App() {
   const [todos, setTodos] = useState([])
   const [filter, setFilter] = useState('all')
   const [sortBy, setSortBy] = useState('priority')
   const [viewMode, setViewMode] = useState('list')

   const addTodo = (todo) => {
      setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
   }

   const updateTodo = (id, todo) => {
      setTodos((prev) =>
         prev.map((todoInstance) =>
            todoInstance.id === id ? todo : todoInstance
         )
      )
   }

   const deleteTodo = (id) => {
      if (window.confirm('Are you sure, you want to Delete this Task ?')) {
         setTodos((prev) => prev.filter((singleTodo) => singleTodo.id !== id))
         toast('Task Deleted!')
      }
   }

   const toggleComplete = (id, completedAt) => {
      setTodos((prev) =>
         prev.map((prevTodo) =>
            prevTodo.id === id
               ? {
                    ...prevTodo,
                    completed: !prevTodo.completed,
                    completedAt: completedAt,
                 }
               : prevTodo
         )
      )
   }

   useEffect(() => {
      const todos = JSON.parse(localStorage.getItem('todos'))
      if (todos && todos.length > 0) {
         setTodos(todos)
      }
   }, [])

   useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos))
   }, [todos])

   // Filter todos based on the current filter
   const filteredTodos = todos.filter((todo) => {
      if (filter === 'active') return !todo.completed
      if (filter === 'completed') return todo.completed
      return true
   })

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

   return (
      <ThemeProvider>
         <TodoProvider
            value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
         >
            <ParticleBackground particleCount={80} />
            <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300'>
               <Navbar />

               <div className='container mx-auto px-4 py-8'>
                  <div className='max-w-6xl mx-auto space-y-8'>
                     <div className='text-center space-y-4'>
                        <h1 className='text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                           Task Master
                        </h1>
                        <p className='text-gray-600 dark:text-gray-300'>
                           Organize your tasks with style and efficiency
                        </p>
                     </div>

                     <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6 transition-colors duration-300 relative z-10'>
                        <TodoForm />

                        <div className='flex flex-wrap gap-4 items-center justify-between'>
                           <div className='flex gap-2'>
                              <button
                                 onClick={() => setFilter('all')}
                                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    filter === 'all'
                                       ? 'bg-purple-500 text-white'
                                       : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                 }`}
                              >
                                 All
                              </button>
                              <button
                                 onClick={() => setFilter('active')}
                                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    filter === 'active'
                                       ? 'bg-purple-500 text-white'
                                       : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                 }`}
                              >
                                 Active
                              </button>
                              <button
                                 onClick={() => setFilter('completed')}
                                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    filter === 'completed'
                                       ? 'bg-purple-500 text-white'
                                       : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                 }`}
                              >
                                 Completed
                              </button>
                           </div>

                           <select
                              value={sortBy}
                              onChange={(e) => setSortBy(e.target.value)}
                              className='px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200'
                           >
                              <option value='priority'>Sort by Priority</option>
                              <option value='dueDate'>Sort by Due Date</option>
                              <option value='category'>Sort by Category</option>
                           </select>
                        </div>

                        <ViewModeSelector
                           viewMode={viewMode}
                           setViewMode={setViewMode}
                        />

                        <div className='space-y-3'>
                           {viewMode === 'list' && (
                              <div className='space-y-3'>
                                 {displayTodos.map((todo) => (
                                    <TodoItem key={todo.id} todo={todo} />
                                 ))}
                              </div>
                           )}
                           {viewMode === 'kanban' && <KanbanView />}
                           {viewMode === 'matrix' && <MatrixView />}
                           {viewMode === 'timeline' && <TimelineView />}
                           {viewMode === 'calendar' && <CalendarView />}
                        </div>
                     </div>

                     <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300 relative z-10'>
                        <Achievements todos={todos} />
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
         </TodoProvider>
      </ThemeProvider>
   )
}

export default App
