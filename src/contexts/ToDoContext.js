import { createContext, useContext } from 'react'

export const todoContext = createContext({
   todos: [
      {
         id: 1,
         todo: 'Example Task',
         completed: false,
         createdAt: new Date().toISOString(),
         completedAt: null,
         priority: 'medium',
         category: 'personal',
         dueDate: null,
         stage: 'notStarted',
         isRecurring: false,
         recurringInterval: null,
         subtasks: [],
         note: null,
      },
   ],
   addTodo: (todo) => {},
   updateTodo: (id, todo) => {},
   deleteTodo: (id) => {},
   toggleComplete: (id) => {},
})

export const useTodo = () => {
   return useContext(todoContext)
}

export const TodoProvider = todoContext.Provider
