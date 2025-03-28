import { createContext, useContext, useState, useEffect } from 'react'

const TodoContext = createContext()

export function TodoProvider({ children }) {
   const [todos, setTodos] = useState([])
   const [archivedTodos, setArchivedTodos] = useState([])
   const [viewMode, setViewMode] = useState('list') // list, kanban, calendar, timeline, matrix

   // Load todos from localStorage on initial render
   useEffect(() => {
      const savedTodos = JSON.parse(localStorage.getItem('todos')) || []
      const savedArchivedTodos =
         JSON.parse(localStorage.getItem('archivedTodos')) || []
      setTodos(savedTodos)
      setArchivedTodos(savedArchivedTodos)
   }, [])

   // Save todos to localStorage whenever they change
   useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos))
   }, [todos])

   useEffect(() => {
      localStorage.setItem('archivedTodos', JSON.stringify(archivedTodos))
   }, [archivedTodos])

   const addTodo = (todo) => {
      const newTodo = {
         id: Date.now(),
         ...todo,
         completed: false,
         archived: false,
         stage: 'notStarted',
         subtasks: [],
         createdAt: new Date().toISOString(),
         completedAt: null,
         isRecurring: todo.isRecurring || false,
         recurringInterval: todo.recurringInterval || null, // daily, weekly, monthly
         lastCompleted: null,
      }
      setTodos((prev) => [newTodo, ...prev])
   }

   const updateTodo = (id, updatedTodo) => {
      setTodos((prev) =>
         prev.map((todo) =>
            todo.id === id ? { ...todo, ...updatedTodo } : todo
         )
      )
   }

   const deleteTodo = (id) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
   }

   const toggleComplete = (id) => {
      setTodos((prev) =>
         prev.map((todo) => {
            if (todo.id === id) {
               const completed = !todo.completed
               const completedAt = completed ? new Date().toISOString() : null
               const lastCompleted = completed
                  ? new Date().toISOString()
                  : todo.lastCompleted

               // Handle recurring tasks
               if (completed && todo.isRecurring) {
                  const newTodo = {
                     ...todo,
                     completed: false,
                     completedAt: null,
                     lastCompleted,
                     createdAt: new Date().toISOString(),
                  }
                  return newTodo
               }

               return {
                  ...todo,
                  completed,
                  completedAt,
                  lastCompleted,
               }
            }
            return todo
         })
      )
   }

   const archiveTodo = (id) => {
      setTodos((prev) => {
         const todoToArchive = prev.find((todo) => todo.id === id)
         if (todoToArchive) {
            setArchivedTodos((archived) => [
               {
                  ...todoToArchive,
                  archived: true,
                  archivedAt: new Date().toISOString(),
               },
               ...archived,
            ])
            return prev.filter((todo) => todo.id !== id)
         }
         return prev
      })
   }

   const unarchiveTodo = (id) => {
      setArchivedTodos((prev) => {
         const todoToUnarchive = prev.find((todo) => todo.id === id)
         if (todoToUnarchive) {
            setTodos((todos) => [
               { ...todoToUnarchive, archived: false, archivedAt: null },
               ...todos,
            ])
            return prev.filter((todo) => todo.id !== id)
         }
         return prev
      })
   }

   const updateTaskStage = (id, stage) => {
      setTodos((prev) =>
         prev.map((todo) => (todo.id === id ? { ...todo, stage } : todo))
      )
   }

   const addSubtask = (todoId, subtask) => {
      setTodos((prev) =>
         prev.map((todo) =>
            todo.id === todoId
               ? {
                    ...todo,
                    subtasks: [
                       ...todo.subtasks,
                       {
                          id: Date.now(),
                          text: subtask,
                          completed: false,
                          createdAt: new Date().toISOString(),
                       },
                    ],
                 }
               : todo
         )
      )
   }

   const toggleSubtask = (todoId, subtaskId) => {
      setTodos((prev) =>
         prev.map((todo) =>
            todo.id === todoId
               ? {
                    ...todo,
                    subtasks: todo.subtasks.map((subtask) =>
                       subtask.id === subtaskId
                          ? {
                               ...subtask,
                               completed: !subtask.completed,
                               completedAt: !subtask.completed
                                  ? new Date().toISOString()
                                  : null,
                            }
                          : subtask
                    ),
                 }
               : todo
         )
      )
   }

   const deleteSubtask = (todoId, subtaskId) => {
      setTodos((prev) =>
         prev.map((todo) =>
            todo.id === todoId
               ? {
                    ...todo,
                    subtasks: todo.subtasks.filter(
                       (subtask) => subtask.id !== subtaskId
                    ),
                 }
               : todo
         )
      )
   }

   const value = {
      todos,
      archivedTodos,
      viewMode,
      setViewMode,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleComplete,
      archiveTodo,
      unarchiveTodo,
      updateTaskStage,
      addSubtask,
      toggleSubtask,
      deleteSubtask,
   }

   return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export function useTodo() {
   const context = useContext(TodoContext)
   if (!context) {
      throw new Error('useTodo must be used within a TodoProvider')
   }
   return context
}
