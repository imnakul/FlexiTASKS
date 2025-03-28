import { useState } from 'react'
import { useTodo } from '../contexts/ToDoContext'

function TodoForm() {
   const [todo, setTodo] = useState('')
   const [dueDate, setDueDate] = useState('')
   const [priority, setPriority] = useState('medium')
   const [category, setCategory] = useState('personal')
   const { addTodo } = useTodo()

   const add = (e) => {
      e.preventDefault()
      if (!todo) return
      addTodo({
         todo,
         completed: false,
         dueDate: dueDate || null,
         priority: priority,
         category: category,
         createdAt: new Date().toISOString(),
      })
      setTodo('')
      setDueDate('')
      setPriority('medium')
      setCategory('personal')
   }

   const today = new Date().toISOString().split('T')[0]

   return (
      <form onSubmit={add} className='flex flex-col gap-3'>
         <div className='flex flex-wrap gap-2'>
            <input
               type='text'
               placeholder='Add a new task...'
               className='flex-1 min-w-[200px] input input-sm input-bordered bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300'
               value={todo}
               onChange={(e) => setTodo(e.target.value)}
            />
            <div className='flex flex-wrap gap-2 flex-1 min-w-[300px]'>
               <input
                  type='date'
                  min={today}
                  className='input input-sm input-bordered bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300'
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
               />
               <select
                  className='select select-sm select-bordered bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300'
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
               >
                  <option value='low'>Low Priority</option>
                  <option value='medium'>Medium Priority</option>
                  <option value='high'>High Priority</option>
               </select>
               <select
                  className='select select-sm select-bordered bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
               >
                  <option value='work'>Work</option>
                  <option value='personal'>Personal</option>
                  <option value='learning'>Learning</option>
               </select>
            </div>
            <button
               type='submit'
               disabled={!todo}
               className='btn btn-sm btn-primary px-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
               Add Task
            </button>
         </div>
      </form>
   )
}

export default TodoForm
