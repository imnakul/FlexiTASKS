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
      addTodo({ todo, completed: false });
      setTodo("");
   };

   return (
      <form onSubmit={add} className='flex'>
         <input
            type='text'
            placeholder='Write Todo...'
            className='xl:w-full w-2/3 border border-black/10 rounded-md  duration-150 bg-base-100 text-primary font-bold px-3 py-1.5 xl:text-xl text-xs hover:ring-primary hover:ring-2'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
         />
         <button
            type='submit'
            disabled={!todo}
            className='xl:w-24 w-1/3 btn btn-square xl:btn-lg btn-sm rounded-md px-12 py-1 bg-base-100 hover:ring-primary hover:ring-2  active:bg-green-400 border border-black/10 ml-3'
         >
            Add
         </button>
      </form>
   );
}

export default TodoForm;
