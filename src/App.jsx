import { useState } from "react";
import { todoProvider } from "./contexts/ToDoContext";

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
      setTodos((prev) =>
         prev.map((prevTodo) =>
            prevTodo === id
               ? { ...prevTodo, completed: !prevTodo.completed }
               : prevTodo
         )
      );
   };
   //whenever we are using single to do, since its an object we are getting complete objects, means with all 3 properties, now in case we want to override some property, then we can mention its property and provide it new value like here { ...prevTodo, completed: "true" }

   {
      /* Till here we have completed basic functionalities of A todo App, now below this we will be doing Storage Functionality */
   }

   return (
      <todoProvider
         value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
      >
         <div className='min-h-screen py-8'>
            <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
               <h1 className='text-2xl font-bold text-center mb-8 mt-2'>
                  Manage Your Todos
               </h1>
               <div className='mb-4'>{/* Todo form goes here */}</div>
               <div className='flex flex-wrap gap-y-3'>
                  {/*Loop and Add TodoItem here */}
               </div>
            </div>
         </div>
      </todoProvider>
   );
}

export default App;
