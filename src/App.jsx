import { useState, useEffect } from 'react'
import { TodoProvider } from './contexts/ToDoContext'
import Navbar from './components/Navbar'
import { TodoForm, TodoItem } from './components/index'
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
   //here i thought to use todo.map directly but using that u cant change todo directly, since we are updating todos, we need setTodos, thats why using that
   //todoinstance is single todo from previous todos, mentioned already ~ similiarly singleTodo and prevTodo are same just used for different methods with different names
   //setTodos(prev) is just providing todos already available in app
   //const updatedTodo = (id, todo) , here todo , is the new todo which we have entered

   const deleteTodo = (id) => {
      if (window.confirm('Are you sure, you want to Delete this Task ?')) {
         setTodos((prev) => prev.filter((singleTodo) => singleTodo.id !== id))
         toast('Task Deleted!')
      }
   }

   const toggleComplete = (id) => {
      // console.log(id);
      setTodos((prev) =>
         prev.map((prevTodo) =>
            prevTodo.id === id
               ? { ...prevTodo, completed: !prevTodo.completed }
               : prevTodo
         )
      )
   }
   //whenever we are using single to do, since its an object we are getting complete objects, means with all 3 properties, now in case we want to override some property, then we can mention its property and provide it new value like here { ...prevTodo, completed: "true" }

   {
      /* Till here we have completed basic functionalities of A todo App, now below this we will be doing Storage Functionality */
   }

   //we are using useEFffect here so that when app loads, we are creating a function here which will go to local storage and bring out all existing values there and insert it in todos...
   useEffect(() => {
      const todos = JSON.parse(localStorage.getItem('todos'))
      if (todos && todos.length > 0) {
         setTodos(todos)
      }
   }, [])

   //using this useEffect to add todos to local storage whenever there is a change in todos, thats why added it as a dependency
   useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos))
   }, [todos])

   return (
      <TodoProvider
         value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
      >
         {/* {localStorage.clear()} */}
         <div className='min-h-screen'>
            {/* Navigation Bar */}
            <Navbar />

            <div className='xl:w-full xl:max-w-3xl max-w-sm sm:mx-auto mx-4 shadow-md rounded-lg px-4 xl:py-4 py-2 text-white bg-secondary'>
               <h1 className='xl:text-4xl text-2xl xl:mb-2 xl:mt-2 text-primary-content font-semibold font-sans text-center'>
                  Manage Todo's
               </h1>

               {/* Divider */}
               <div className='flex w-full flex-col'>
                  <div className='divider divider-primary mt-0 xl:mb-2 mb-1'></div>
               </div>

               <div className='flex flex-wrap gap-3 justify-end mb-0'>
                  {/* Sorting Functionality */}
                  <Sorting todos={todos} setTodos={setTodos} />

                  {/* Clear All Button */}
                  <ClearTodos todos={todos} setTodos={setTodos} />
               </div>

               <div className='mb-4 text-primary-content'>
                  <TodoForm />
               </div>
               <div className='flex flex-wrap gap-y-3'>
                  {todos.map((todo) => (
                     <div className='w-full' key={todo.id}>
                        {/* {console.log(todo)} */}
                        <TodoItem todo={todo} />
                     </div>
                  ))}
               </div>
            </div>
         </div>
         <ToastContainer position='bottom-right' autoClose={1500} />
      </TodoProvider>
   )
}

export default App
