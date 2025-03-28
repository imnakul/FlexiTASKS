import { createContext, useContext, useState, useEffect } from 'react'

const TodoContext = createContext()

export function TodoProvider({ children, value }) {
   return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export function useTodo() {
   const context = useContext(TodoContext)
   if (!context) {
      throw new Error('useTodo must be used within a TodoProvider')
   }
   return context
}

export default TodoContext
