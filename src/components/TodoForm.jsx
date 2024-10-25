import { useState } from "react";
import { useTodo } from "../contexts/ToDoContext";

function TodoForm() {
   const [todo, setTodo] = useState("");
   const { addTodo } = useTodo();

   const add = (e) => {
      e.preventDefault();

      if (!todo) return;

      //   addTodo({ id: Date.now(), todo: todo, completed: false });
      // or
      addTodo({ id: Date.now(), todo, completed: false });
      setTodo("");
   };

   return (
      <form onSubmit={add} className='flex'>
         <input
            type='text'
            placeholder='Write Todo...'
            className='w-full border border-black/10 rounded-md px-3 duration-150  bg-base-100 text-primary-content py-1.5 font-medium text-lg hover:ring-primary hover:ring-2'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
         />
         <button
            type='submit'
            className='btn btn-square btn-lg rounded-md px-12 py-1 bg-base-100 hover:ring-primary hover:ring-2 hover:bg-accent border border-black/10 ml-3 active:bg-green-500 duration-150'
         >
            Add
         </button>
      </form>
   );
}

export default TodoForm;
