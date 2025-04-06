import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
   todos: [
      {
         id: '3293d036-fefd-4c0b-a713-8d7c0dccf133',
         todo: 'Do laundry',
         completed: false,
         createdAt: '2025-04-05T12:55:13.291Z',
         completedAt: null,
         priority: 'medium',
         category: 'work',
         dueDate: '2025-04-20',
         stage: 'notStarted',
         isRecurring: false,
         recurringInterval: null,
         subtasks: [
            {
               id: 1743908033049.047,
               text: 'Go to Laundromat',
               completed: false,
               createdAt: '2025-04-06T02:53:53.049Z',
            },
            {
               id: 1743908043562.263,
               text: 'Buy Washing Powder',
               completed: false,
               createdAt: '2025-04-06T02:54:03.562Z',
            },
            {
               id: 1743908059459.4272,
               text: 'Buy Cofee on the way back to home',
               completed: false,
               createdAt: '2025-04-06T02:54:19.459Z',
            },
         ],
         note: null,
      },
      {
         id: '141d2e10-dd48-4ce7-960f-fa91a8458922',
         todo: 'Take a shower',
         completed: true,
         createdAt: '2025-04-05T12:55:05.692Z',
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
      {
         id: 'a463d8ff-5dbf-4931-abc0-3bccfaf87646',
         todo: 'Gym workout',
         completed: false,
         createdAt: '2025-04-05T12:55:00.060Z',
         completedAt: null,
         priority: 'low',
         category: 'personal',
         dueDate: null,
         stage: 'notStarted',
         isRecurring: false,
         recurringInterval: null,
         subtasks: [],
         note: null,
      },
      {
         id: '5fb4c496-ed2f-4669-8826-8a42a837cedd',
         todo: 'Set goals',
         completed: false,
         createdAt: '2025-04-04T13:08:37.145Z',
         completedAt: null,
         priority: 'high',
         category: 'personal',
         dueDate: '2025-04-06',
         stage: 'notStarted',
         isRecurring: false,
         recurringInterval: null,
         subtasks: [],
         note: 'Set Higher Goals which exceeds your current Capacity , then work towards them',
      },
      {
         id: '8895bfe3-b3cf-4c11-813a-06b68a99c7a4',
         todo: 'Meditate',
         completed: false,
         createdAt: '2025-04-04T13:03:49.730Z',
         completedAt: null,
         priority: 'high',
         category: 'personal',
         dueDate: '2025-04-11',
         stage: 'notStarted',
         isRecurring: false,
         recurringInterval: null,
         subtasks: [],
         note: null,
      },
      {
         id: '94c6ab04-478f-4c6e-abc6-01467de33437',
         todo: 'Buy groceries',
         completed: false,
         createdAt: '2025-04-04T13:02:21.207Z',
         completedAt: null,
         priority: 'medium',
         category: 'shopping',
         dueDate: '2025-04-10',
         stage: 'notStarted',
         isRecurring: false,
         recurringInterval: null,
         subtasks: [],
         note: null,
      },
   ],
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
      clearTodo: (state) => {
         state.todos = []
      },
   },
})

export const { addTodo, updateTodo, deleteTodo, toggleComplete, clearTodo } =
   todoSlice.actions
export default todoSlice.reducer
