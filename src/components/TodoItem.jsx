import { useState } from "react";
import { useTodo } from "../contexts/ToDoContext";

function TodoItem({ todo }) {
   const [isTodoEditable, setIsTodoEditable] = useState(false);
   const [todoMsg, setTodoMsg] = useState(todo.todo);
   const { updateTodo, deleteTodo, toggleComplete } = useTodo();

   const editTodo = () => {
      updateTodo(todo.id, { ...todo, todo: todoMsg });
      setIsTodoEditable(false);
   };

   const toggleCompleted = () => {
      toggleComplete(todo.id);
   };

   return (
      <div
         className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
            todo.completed
               ? "bg-base-100 text-gray-700 opacity-80"
               : "bg-primary"
         }`}
      >
         <input
            type='checkbox'
            className='cursor-pointer'
            checked={todo.completed}
            onChange={toggleCompleted}
         />
         <input
            type='text'
            className={`border outline-none w-full bg-transparent rounded-lg text-xs xl:text-xl  font-semibold font-mono ${
               isTodoEditable ? "border-black/10 px-2" : "border-transparent"
            } ${todo.completed ? "line-through" : ""}`}
            value={todoMsg}
            onChange={(e) => setTodoMsg(e.target.value)}
            readOnly={!isTodoEditable}
         />

         {/* Edit, Save Button */}
         <button
            className='inline-flex xl:w-8 xl:h-8 w-6 h-6 rounded-lg text-lg border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-300 shrink-0 disabled:opacity-50'
            onClick={() => {
               if (todo.completed) return;

               if (isTodoEditable) {
                  editTodo();
               } else setIsTodoEditable((prev) => !prev);
            }}
            disabled={todo.completed}
         >
            {isTodoEditable ? "📁" : "✏️"}
         </button>

         {/* Delete Todo Button */}
         <button
            className='inline-flex xl:w-8 xl:h-8 w-6 h-6 rounded-lg text-lg border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-300 shrink-0'
            onClick={() => deleteTodo(todo.id)}
         >
            🗑️
         </button>
      </div>
   );
}

export default TodoItem;
