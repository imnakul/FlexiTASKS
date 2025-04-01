import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
   todos: [],
}

const todoSlice = createSlice({
   name: 'todos',
   initialState,
   reducers: {
      addTodo: (state, action) => {
         const newTodo = {
            id: uuidv4(),

            todo: action.payload.todo,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null,
            priority: action.payload.priority || 'medium',
            category: action.payload.category || 'personal',
            dueDate: action.payload.dueDate || null,
            stage: action.payload.stage || 'notStarted',
            isRecurring: action.payload.isRecurring || false,
            recurringInterval: action.payload.recurringInterval || null,
            subtasks: (action.payload.subtasks || []).map((subtask) => ({
               id: subtask.id || uuidv4(),
               text: subtask.text,
               completed: false,
               createdAt: new Date().toISOString(),
               completedAt: null,
            })),
            note: action.payload.note || null,
         }
         state.todos.unshift(newTodo)
      },
      updateTodo: (state, action) => {
         const { id, updatedTodo } = action.payload
         state.todos = state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updatedTodo } : todo
         )
      },
      deleteTodo: (state, action) => {
         state.todos = state.todos.filter((todo) => todo.id !== action.payload)
      },
      toggleComplete: (state, action) => {
         state.todos = state.todos.map((todo) =>
            todo.id === action.payload
               ? { ...todo, completed: !todo.completed }
               : todo
         )
      },
   },
})

export const { addTodo, updateTodo, deleteTodo, toggleComplete } =
   todoSlice.actions
export default todoSlice.reducer
