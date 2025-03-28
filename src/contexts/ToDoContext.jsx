import { createContext, useContext, useState } from 'react'

const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
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
      setTodos((prev) => prev.filter((singleTodo) => singleTodo.id !== id))
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

   return (
      <TodoContext.Provider
         value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
      >
         {children}
      </TodoContext.Provider>
   )
}

export const useTodo = () => {
   const context = useContext(TodoContext)
   if (!context) {
      throw new Error('useTodo must be used within a TodoProvider')
   }
   return context
}
