import { useState, useRef, useEffect } from 'react'
import {
   FaEdit,
   FaTrash,
   FaCheck,
   FaClock,
   FaTags,
   FaList,
   FaStickyNote,
   FaChevronDown,
   FaChevronRight,
   FaLayerGroup,
} from 'react-icons/fa'
import TodoForm from './TodoForm'
import { useAppTheme } from '../contexts/AppThemeContext'
import { useDispatch } from 'react-redux'
import { updateTodo, deleteTodo } from '../store/TodoSlice' // Import Redux actions

function TodoItem({ todo }) {
   const dispatch = useDispatch() // Redux Dispatch
   const [isEditing, setIsEditing] = useState(false)
   const [editedTodo, setEditedTodo] = useState(todo.todo)
   const [showSubtasks, setShowSubtasks] = useState(false)
   const [showNote, setShowNote] = useState(false)
   const noteRef = useRef(null)
   const { appTheme, getColorClass } = useAppTheme()

   const handleEdit = () => {
      if (isEditing) {
         dispatch(
            updateTodo({
               id: todo.id,
               updatedTodo: { ...todo, todo: editedTodo },
            })
         )
      }
      setIsEditing(!isEditing)
   }

   const handleSave = () => {
      dispatch(
         updateTodo({ id: todo.id, updatedTodo: { ...todo, todo: editedTodo } })
      )
      setIsEditing(false)
   }

   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         handleSave()
      }
   }

   const handleDelete = () => {
      if (window.confirm('Are you sure you want to delete this task?')) {
         dispatch(deleteTodo(todo.id))
      }
   }

   const handleToggleComplete = () => {
      dispatch(
         updateTodo({
            id: todo.id,
            updatedTodo: { ...todo, completed: !todo.completed },
         })
      )
   }

   const handleToggleSubtask = (subtaskId) => {
      const updatedSubtasks = todo.subtasks.map((subtask) =>
         subtask.id === subtaskId
            ? { ...subtask, completed: !subtask.completed }
            : subtask
      )

      dispatch(
         updateTodo({
            id: todo.id,
            updatedTodo: { ...todo, subtasks: updatedSubtasks },
         })
      )
   }

   const handleDeleteSubtask = (subtaskId) => {
      const updatedSubtasks = todo.subtasks.filter(
         (subtask) => subtask.id !== subtaskId
      )
      dispatch(
         updateTodo({
            id: todo.id,
            updatedTodo: { ...todo, subtasks: updatedSubtasks },
         })
      )
   }

   const handleStageChange = (newStage) => {
      dispatch(
         updateTodo({ id: todo.id, updatedTodo: { ...todo, stage: newStage } })
      )
   }

   const getPriorityColor = (priority) => {
      switch (priority) {
         case 'high':
            return 'text-red-500 dark:text-red-400'
         case 'medium':
            return 'text-yellow-500 dark:text-yellow-400'
         case 'low':
            return 'text-green-500 dark:text-green-400'
         default:
            return 'text-gray-500 dark:text-gray-400'
      }
   }

   const getStageColor = (stage) => {
      switch (stage) {
         case 'notStarted':
            return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300'
         case 'inProgress':
            return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300'
         case 'completed':
            return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300'
         default:
            return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
      }
   }

   const getStageName = (stage) => {
      switch (stage) {
         case 'notStarted':
            return 'Not Started'
         case 'inProgress':
            return 'In Progress'
         case 'completed':
            return 'Completed'
         default:
            return 'Unknown'
      }
   }

   const getCategoryEmoji = (category) => {
      switch (category) {
         case 'work':
            return '💼'
         case 'personal':
            return '👤'
         case 'learning':
            return '📚'
         default:
            return '📝'
      }
   }

   const completedSubtasks =
      todo.subtasks?.filter((subtask) => subtask.completed).length || 0
   const totalSubtasks = todo.subtasks?.length || 0

   const isOverdue =
      todo.dueDate &&
      new Date(todo.dueDate).setHours(0, 0, 0, 0) <
         new Date().setHours(0, 0, 0, 0) &&
      !todo.completed
   const isDueToday =
      todo.dueDate &&
      new Date(todo.dueDate).setHours(0, 0, 0, 0) ===
         new Date().setHours(0, 0, 0, 0) &&
      !todo.completed

   useEffect(() => {
      const handleClickOutside = (e) => {
         if (noteRef.current && !noteRef.current.contains(e.target)) {
            setShowNote(false)
         }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [])

   if (isEditing) {
      return (
         <div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4'>
            <TodoForm
               editingTodo={todo}
               onCancelEdit={() => setIsEditing(false)}
            />
         </div>
      )
   }

   return (
      <div
         className={`group  ${getColorClass(
            appTheme.colorTheme
         )} ${getColorClass(appTheme.colorTheme, 'hover')}  ${getColorClass(
            appTheme.colorTheme,
            'shadow'
         )} p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700   transition-all duration-300`}
      >
         <div className='flex items-start gap-4'>
            {/* Checkbox and Main Content */}
            <div className='flex-1 min-w-0'>
               <div className='flex items-center gap-2'>
                  <input
                     type='checkbox'
                     checked={todo.completed}
                     onChange={handleToggleComplete}
                     className='w-5 h-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500'
                  />
                  <div
                     className={`text-gray-900 dark:text-gray-100 break-words ${
                        todo.completed
                           ? 'line-through text-gray-500 dark:text-gray-400'
                           : ''
                     }`}
                  >
                     {todo.todo}
                  </div>
               </div>

               {/* Mobile-friendly metadata */}
               <div className='mt-2 flex flex-wrap gap-2 text-sm'>
                  <span
                     className={`${getPriorityColor(
                        todo.priority
                     )} font-medium`}
                  >
                     {todo.priority}
                  </span>
                  <span className='text-gray-400'>•</span>
                  <span className='text-gray-600 dark:text-gray-400 flex items-center gap-1'>
                     <FaTags className='w-3 h-3' />
                     {todo.category}
                  </span>
                  {/* Stage Status */}
                  <span className='text-gray-400'>•</span>
                  <div className='relative group/stage'>
                     <span
                        className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                           todo.completed
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300'
                              : getStageColor(todo.stage)
                        } ${
                           !todo.completed ? 'group-hover/stage:opacity-0' : ''
                        }`}
                     >
                        <FaLayerGroup className='w-3 h-3' />
                        {todo.completed
                           ? 'Completed'
                           : getStageName(todo.stage)}
                     </span>
                     {!todo.completed && (
                        <select
                           value={todo.stage || 'notStarted'}
                           onChange={(e) => handleStageChange(e.target.value)}
                           className='absolute left-0 top-0 w-full h-full opacity-0 group-hover/stage:opacity-100 cursor-pointer disabled:cursor-not-allowed bg-transparent dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 appearance-none px-2 py-1'
                           disabled={todo.completed}
                        >
                           <option
                              value='notStarted'
                              className='dark:bg-gray-800 dark:text-gray-200 px-2 py-1'
                           >
                              Not Started
                           </option>
                           <option
                              value='inProgress'
                              className='dark:bg-gray-800 dark:text-gray-200 px-2 py-1'
                           >
                              In Progress
                           </option>
                        </select>
                     )}
                  </div>
                  {todo.dueDate && (
                     <>
                        <span className='text-gray-400'>•</span>
                        <span className='flex items-center gap-1'>
                           <FaClock className='w-3 h-3 flex-shrink-0' />
                           {isOverdue ? (
                              <span className='px-2 py-1 text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-md'>
                                 Due Date Passed
                              </span>
                           ) : isDueToday ? (
                              <span className='px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 rounded-md'>
                                 Due Today
                              </span>
                           ) : (
                              <span className='text-gray-600 dark:text-gray-400'>
                                 {new Date(todo.dueDate).toLocaleDateString()}
                              </span>
                           )}
                        </span>
                     </>
                  )}
               </div>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center gap-3 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200'>
               {!todo.completed && (
                  <>
                     {todo.note && (
                        <div className='relative' ref={noteRef}>
                           <button
                              onClick={() => setShowNote(!showNote)}
                              className='p-2 rounded-lg text-gray-500 hover:text-purple-500 hover:bg-purple-50 dark:text-gray-400 dark:hover:text-purple-400 dark:hover:bg-purple-900/30'
                           >
                              <FaStickyNote className='w-4 h-4' />
                           </button>
                           {showNote && (
                              <div className='absolute right-0 mt-2 w-64 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-10'>
                                 <p className='text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap'>
                                    {todo.note}
                                 </p>
                              </div>
                           )}
                        </div>
                     )}

                     <button
                        onClick={() => setIsEditing(true)}
                        className='p-2 rounded-lg text-gray-500 hover:text-purple-500 hover:bg-purple-50 dark:text-gray-400 dark:hover:text-purple-400 dark:hover:bg-purple-900/30'
                     >
                        <FaEdit className='w-4 h-4' />
                     </button>
                  </>
               )}

               <button
                  onClick={handleDelete}
                  className='p-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/30'
               >
                  <FaTrash className='w-4 h-4' />
               </button>
            </div>
         </div>

         {/* Subtasks Section */}
         {todo.subtasks && todo.subtasks.length > 0 && !todo.completed && (
            <div className='mt-3 pl-7'>
               <button
                  onClick={() => setShowSubtasks(!showSubtasks)}
                  className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-200'
               >
                  {showSubtasks ? (
                     <FaChevronDown className='w-3 h-3' />
                  ) : (
                     <FaChevronRight className='w-3 h-3' />
                  )}
                  <FaList className='w-3 h-3' />
                  <span>
                     Subtasks (
                     {todo.subtasks.filter((st) => st.completed).length}/
                     {todo.subtasks.length})
                  </span>
               </button>

               {showSubtasks && (
                  <div className='mt-2 space-y-2'>
                     {todo.subtasks.map((subtask) => (
                        <div
                           key={subtask.id}
                           className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'
                        >
                           <input
                              type='checkbox'
                              checked={subtask.completed}
                              onChange={() => handleToggleSubtask(subtask.id)}
                              className='w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500'
                              disabled={todo.completed}
                           />
                           <span
                              className={
                                 subtask.completed ? 'line-through' : ''
                              }
                           >
                              {subtask.text}
                           </span>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         )}
      </div>
   )
}

export default TodoItem
