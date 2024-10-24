import { createContext, useContext } from "react";

export const todoContext = createContext({
   todos: [
      {
         id: 1,
         todo: "To Do Tasks",
         completed: false,
      },
   ],
   addToDo: (todo) => {},
   updateToDo: (id, todo) => {},
   deleteToDo: (id) => {},
   toggleComplete: (id) => {},
});

export const useTodo = () => {
   return useContext(todoContext);
};

export const todoProvider = todoContext.Provider;
