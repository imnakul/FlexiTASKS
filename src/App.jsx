import { useState, useEffect } from 'react'
import { TodoProvider } from './contexts/ToDoContext'
import Navbar from './components/Navbar'
import { TodoForm, TodoItem, Achievements } from './components/index'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Sorting, ClearTodos } from './functionalities/index.js'

function App() {
   const [todos, setTodos] = useState([])

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

   const sortTodos = (todos) => {
      return [...todos].sort((a, b) => {
         // First sort by completion status
         if (a.completed !== b.completed) {
            return a.completed ? 1 : -1
         }

         // Then sort by due date
         if (a.dueDate && b.dueDate) {
            const dateA = new Date(a.dueDate)
            const dateB = new Date(b.dueDate)
            return dateA - dateB
         }
         if (a.dueDate) return -1
         if (b.dueDate) return 1

         // Finally sort by priority
         const priorityOrder = { high: 0, medium: 1, low: 2 }
         return priorityOrder[a.priority] - priorityOrder[b.priority]
      })
   }

   const groupTodosByCategory = (todos) => {
      const categories = {
         work: { title: '💼 Work', todos: [] },
         personal: { title: '👤 Personal', todos: [] },
         learning: { title: '📚 Learning', todos: [] },
      }

      todos.forEach((todo) => {
         if (categories[todo.category]) {
            categories[todo.category].todos.push(todo)
         } else {
            categories.personal.todos.push(todo)
         }
      })

      return categories
   }

   useEffect(() => {
      const todos = JSON.parse(localStorage.getItem('todos'))
      if (todos && todos.length > 0) {
         setTodos(sortTodos(todos))
      }
   }, [])

   useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos))
   }, [todos])

   const sortedTodos = sortTodos(todos)
   const groupedTodos = groupTodosByCategory(sortedTodos)

   return (
      <TodoProvider
         value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
      >
         <div className='min-h-screen bg-gradient-to-br from-base-200 to-base-300'>
            <Navbar />

            <div className='container mx-auto px-4 py-8'>
               <div className='max-w-3xl mx-auto'>
                  <div className='bg-base-100 rounded-2xl shadow-xl p-6 md:p-8'>
                     <h1 className='text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                        Manage Your Tasks
                     </h1>

                     <div className='divider'></div>

                     <div className='flex flex-wrap gap-3 justify-end mb-6'>
                        <Sorting todos={todos} setTodos={setTodos} />
                        <ClearTodos todos={todos} setTodos={setTodos} />
                     </div>

                     <div className='mb-8'>
                        <TodoForm />
                     </div>

                     <Achievements todos={todos} />

                     <div className='space-y-8'>
                        {Object.entries(groupedTodos).map(
                           ([category, { title, todos }]) =>
                              todos.length > 0 && (
                                 <div key={category} className='space-y-4'>
                                    <h2 className='text-xl font-semibold text-base-content/80'>
                                       {title}
                                    </h2>
                                    <div className='space-y-3'>
                                       {todos.map((todo) => (
                                          <div key={todo.id}>
                                             <TodoItem todo={todo} />
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              )
                        )}
                     </div>
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
   )
}

export default App
