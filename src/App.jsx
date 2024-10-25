import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts/ToDoContext";
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

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
      setTodos((prev) => prev.filter((singleTodo) => singleTodo.id !== id));
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
         {/* {document
            .querySelector("html")
            .setAttribute("data-theme", "")} */}

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
               <h1 className='text-5xl mb-8 mt-2 text-primary-content font-black text-center'>
                  <u>Manage Todo's</u>
               </h1>

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
      </TodoProvider>
   );
}

export default App;
