import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import todoReducer from '../store/TodoSlice'

const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['todos'], // 👈 Only persist the 'todos' state
}

const persistedReducer = persistReducer(persistConfig, todoReducer)

export const store = configureStore({
   reducer: {
      todos: persistedReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
})

export const persistor = persistStore(store)
