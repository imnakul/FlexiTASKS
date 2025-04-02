import { FaDownload, FaUpload } from 'react-icons/fa'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, clearTodo } from '../store/TodoSlice.js'
import { toast } from 'react-toastify'
import { useAppTheme } from '../contexts/AppThemeContext.jsx'

function TaskBackups({ onClose }) {
   const todos = useSelector((state) => state.todos.todos)
   const fileInputRef = useRef(null)
   const [isImporting, setIsImporting] = useState(false)
   const [importModalOpen, setImportModalOpen] = useState(false)
   const [importedTasks, setImportedTasks] = useState([])
   const dispatch = useDispatch()
   const { appTheme, getColorClass } = useAppTheme()

   const handleExportTasks = () => {
      try {
         // Get tasks from context
         const tasksData = {
            tasks: todos,
            exportDate: new Date().toISOString(),
         }

         // Convert to JSON string with formatting
         const dataStr = JSON.stringify(tasksData, null, 2)

         // Create blob and download link
         const blob = new Blob([dataStr], { type: 'application/json' })
         const url = URL.createObjectURL(blob)

         // Create and trigger download
         const link = document.createElement('a')
         link.href = url
         link.download = `tasks_backup_${
            new Date().toISOString().split('T')[0]
         }.json`
         document.body.appendChild(link)
         link.click()

         // Cleanup
         document.body.removeChild(link)
         URL.revokeObjectURL(url)

         toast.success('Tasks exported successfully!')
         onClose?.() // Close modal after successful export
      } catch (error) {
         console.error('Error exporting tasks:', error)
         toast.error('Failed to export tasks. Please try again.')
      }
   }

   const handleImportTasks = async (event) => {
      try {
         const file = event.target.files[0]
         if (!file) {
            console.error('No file selected')
            toast.error('Please select a file to import')
            return
         }

         setIsImporting(true)

         console.log('File selected:', file.name)
         const text = await file.text()
         // console.log('File content:', text.substring(0, 100) + '...') // Log first 100 chars

         let importedData
         try {
            importedData = JSON.parse(text)
            // console.log('Parsed data structure:', {
            //    hasTasks: !!importedData.tasks,
            //    isArray: Array.isArray(importedData.tasks),
            //    taskCount: importedData.tasks?.length,
            // })
         } catch (parseError) {
            console.error('JSON Parse Error:', parseError)
            toast.error(
               'Invalid JSON format in the backup file. Please ensure the file is not corrupted.'
            )
            setIsImporting(false)
            return
         }

         // Validate imported data structure
         if (!importedData.tasks) {
            console.error('Missing tasks property in imported data')
            toast.error('Invalid backup format: Missing tasks data')
            setIsImporting(false)
            return
         }

         if (!Array.isArray(importedData.tasks)) {
            console.error(
               'Tasks property is not an array:',
               typeof importedData.tasks
            )
            toast.error(
               'Invalid backup format: Tasks data is not in the correct format'
            )
            setIsImporting(false)
            return
         }

         // Validate task objects
         const isValidTask = (task) => {
            return (
               task.id &&
               typeof task.todo === 'string' &&
               typeof task.completed === 'boolean'
            )
         }

         if (!importedData.tasks.every(isValidTask)) {
            console.error('Some tasks are missing required properties')
            console.log(
               'Task validation failed. Task structure:',
               importedData.tasks[0]
            )
            toast.error(
               'Invalid backup format: Tasks must have id, todo text, and completed status'
            )
            setIsImporting(false)
            return
         }

         setImportedTasks(importedData.tasks)
         setImportModalOpen(true)
      } catch (error) {
         console.error('Error importing tasks:', error)
         toast.error(`Failed to import tasks: ${error.message}`)
      } finally {
         setIsImporting(false)
      }
   }

   const handleImportOption = (option) => {
      if (option === 'replace') {
         dispatch(clearTodo()) // Clear existing tasks
         importedTasks.forEach((task) => dispatch(addTodo(task))) // Add all new tasks
      } else if (option === 'merge') {
         const existingIds = new Set(todos.map((t) => t.id)) // Get all existing IDs in a Set

         importedTasks.forEach((task) => {
            if (!existingIds.has(task.id)) {
               dispatch(addTodo(task))
            }
         })
      } else if (option === 'keep') {
         importedTasks.forEach((task) => dispatch(addTodo(task)))
      }

      toast.success('Tasks imported successfully!')
      setImportModalOpen(false)
      if (fileInputRef.current) {
         fileInputRef.current.value = ''
      }
      onClose?.()
   }

   return (
      <div className='bg-gray-800 dark:bg-gray-800 sm:p-6 p-2 rounded-lg shadow-lg border border-gray-700 '>
         {isImporting && (
            <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
               <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col items-center gap-4'>
                  <div className='animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent'></div>
                  <p className='text-gray-900 dark:text-gray-100 text-lg font-medium'>
                     Importing Tasks...
                  </p>
               </div>
            </div>
         )}

         {/* Export/Import Section */}
         <div className='flex justify-center sm:gap-6 gap-4'>
            {/* Export Button */}
            <button
               onClick={handleExportTasks}
               className='px-4 py-2 bg-emerald-600/40 hover:bg-emerald-500/50 border border-emerald-400/50 text-white sm:text-base text-sm rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-105'
               disabled={isImporting}
            >
               <FaUpload className='w-4 h-4' />
               Export Tasks
            </button>

            {/* Import Button */}
            <button
               onClick={() => fileInputRef.current?.click()}
               className='px-4 py-2 bg-amber-600/40 hover:bg-amber-500/50 border border-amber-400/50 text-white sm:text-base text-sm rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-105'
               disabled={isImporting}
            >
               <FaDownload className='w-4 h-4' />
               Import Tasks
            </button>
            <input
               type='file'
               ref={fileInputRef}
               onChange={handleImportTasks}
               accept='.json'
               className='hidden'
               disabled={isImporting}
            />
         </div>

         {importModalOpen && (
            <div className='flex flex-col gap-2'>
               <p className='text-gray-600 dark:text-gray-300 my-4 text-center'>
                  Choose how you want to import your tasks:
               </p>

               <button
                  onClick={() => handleImportOption('replace')}
                  className={`w-full bg-gray-500/30 text-white py-2 rounded-md mb-2 ${getColorClass(
                     appTheme.colorTheme,
                     'buttonbghover'
                  )}`}
                  title='Remove all existing tasks and replace them with the imported ones.'
               >
                  🚨 Replace All Tasks
               </button>

               <button
                  onClick={() => handleImportOption('merge')}
                  className={`w-full bg-gray-500/30 text-white py-2 rounded-md mb-2 ${getColorClass(
                     appTheme.colorTheme,
                     'buttonbghover'
                  )}`}
                  title='Existing Tasks will remain unchanged, while new tasks will be added. - NO DUPLICATES OF Matching tasks'
               >
                  🔄 Merge (Keep Existing, Add New - No Duplicates)
               </button>

               <button
                  onClick={() => handleImportOption('keep')}
                  className={`w-full bg-gray-500/30 text-white py-2 rounded-md mb-2 ${getColorClass(
                     appTheme.colorTheme,
                     'buttonbghover'
                  )}`}
                  title='Preserve existing tasks and add imported tasks as new ones - DUPLICATES of Matching tasks.'
               >
                  ✅ Keep Existing & Add New - Duplicates Included
               </button>
            </div>
         )}
      </div>
   )
}

export default TaskBackups
