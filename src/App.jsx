import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts/ToDoContext";
import Navbar from "./components/Navbar";
import { TodoForm, TodoItem } from "./components/index";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
   const [todos, setTodos] = useState([]);

   const addTodo = (todo) => {
      setTodos((prev) => [{ id: DataTransfer.now, ...todo }, ...prev]);
   };

   const updateTodo = (id, todo) => {
      setTodos((prev) =>
         prev.map((todoInstance) =>
            todoInstance.id === id ? todo : todoInstance
         )
      );
   };
   //here i thought to use todo.map directly but using that u cant change todo directly, since we are updating todos, we need setTodos, thats why using that
   //todoinstance is single todo from previous todos, mentioned already ~ similiarly singleTodo and prevTodo are same just used for different methods with different names
   //setTodos(prev) is just providing todos already available in app
   //const updatedTodo = (id, todo) , here todo , is the new todo which we have entered

   const deleteTodo = (id) => {
      if (window.confirm("Are you sure, you want to Delete ?")) {
         setTodos((prev) => prev.filter((singleTodo) => singleTodo.id !== id));
         toast("Todo Deleted!");
      }
   };

   const toggleComplete = (id) => {
      console.log(id);
      setTodos((prev) =>
         prev.map((prevTodo) =>
            prevTodo.id === id
               ? { ...prevTodo, completed: !prevTodo.completed }
               : prevTodo
         )
      );
   };
   //whenever we are using single to do, since its an object we are getting complete objects, means with all 3 properties, now in case we want to override some property, then we can mention its property and provide it new value like here { ...prevTodo, completed: "true" }

   {
      /* Till here we have completed basic functionalities of A todo App, now below this we will be doing Storage Functionality */
   }

   //we are using useEFffect here so that when app loads, we are creating a function here which will go to local storage and bring out all existing values there and insert it in todos...
   useEffect(() => {
      const todos = JSON.parse(localStorage.getItem("todos"));
      if (todos && todos.length > 0) {
         setTodos(todos);
      }
   }, []);

   //using this useEffect to add todos to local storage whenever there is a change in todos, thats why added it as a dependency
   useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
   }, [todos]);

   return (
      <TodoProvider
         value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
      >
         <div
            className='min-h-screen'
            // style={{
            //    backgroundImage: 'url("./public/done-clipart-md.png")',
            //    backgroundSize: "55vh 25vw",
            //    backgroundPosition: "97% 65%",
            //    backgroundRepeat: "no-repeat",
            //    "@media (maxWidth: 992px)": {
            //       display: "none",
            //    },
            // }}
         >
            <Navbar />

            <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white bg-secondary'>
               <h1 className='text-6xl mb-2 mt-2 text-primary-content font-semibold font-sans text-start'>
                  Manage Todo's
               </h1>

               {/* Divider */}
               <div className='flex w-full flex-col'>
                  <div className='divider divider-primary mt-0 mb-2'></div>
               </div>

               <div className='flex flex-row gap-3 justify-end'>
                  {/* Sorting functionality */}
                  <label className='swap swap-flip text-9xl'>
                     {/* this hidden checkbox controls the state */}
                     <input
                        type='checkbox'
                        onClick={(e) => {
                           if (e.target.checked) {
                              const todos = JSON.parse(
                                 localStorage.getItem("todos")
                              );
                              todos.sort((a, b) => a.id - b.id);
                              setTodos(todos);
                           } else {
                              const todos = JSON.parse(
                                 localStorage.getItem("todos")
                              );
                              todos.sort((a, b) => b.id - a.id);
                              setTodos(todos);
                           }
                        }}
                     />

                     <div className='swap-on btn btn-square btn-outline btn-md ml-50 bg-white hover:ring-2 rounded-none mb-5 p-1'>
                        <img
                           src='./filter.png'
                           alt='green'
                           style={{
                              width: "auto",
                              height: "auto",
                              paddding: 2,
                           }}
                        />
                     </div>
                     <div className='swap-off btn btn-square btn-outline btn-md mr-3 bg-white hover:ring-2 rounded-none mb-5 p-1'>
                        <img
                           src='./filter2.png'
                           alt='red'
                           style={{ width: "auto", height: "auto" }}
                        />
                     </div>
                  </label>
                  {/* Sorting Ends HEre*/}

                  {/* Clear All Button */}
                  <button
                     className='btn btn-square btn-outline btn-md ml-50 bg-white hover:ring-2 rounded-none mb-5 p-1 mr-2'
                     onClick={() => {
                        if (
                           window.confirm(
                              "Are you sure, you want to Clear All Tasks?"
                           )
                        ) {
                           setTodos([]);
                           toast.success("Todos List Cleared!");
                        }
                     }}
                  >
                     <img
                        src='./clear.png'
                        alt='green'
                        style={{
                           width: "auto",
                           height: "auto",
                           paddding: 2,
                        }}
                     />
                  </button>
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
         <ToastContainer />
      </TodoProvider>
   );
}

export default App;
