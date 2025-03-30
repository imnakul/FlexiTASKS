import { FaDownload, FaUpload, FaSync } from 'react-icons/fa'
import { useTodo } from '../contexts/TodoContext'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

function TaskBackups({ onClose }) {
   const { todos, addTodo, updateTodo } = useTodo()
   const fileInputRef = useRef(null)
   const [isImporting, setIsImporting] = useState(false)

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

         // Ask for confirmation before proceeding
         const confirmImport = window.confirm(
            '⚠️ Warning: Importing tasks will overwrite your current tasks. All existing tasks will be replaced with the imported ones.\n\nAre you sure you want to proceed?'
         )

         if (!confirmImport) {
            // Clear the file input if user cancels
            if (fileInputRef.current) {
               fileInputRef.current.value = ''
            }
            return
         }

         setIsImporting(true)

         console.log('File selected:', file.name)
         const text = await file.text()
         console.log('File content:', text.substring(0, 100) + '...') // Log first 100 chars

         let importedData
         try {
            importedData = JSON.parse(text)
            console.log('Parsed data structure:', {
               hasTasks: !!importedData.tasks,
               isArray: Array.isArray(importedData.tasks),
               taskCount: importedData.tasks?.length,
            })
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

         // Update tasks in localStorage
         localStorage.setItem('todos', JSON.stringify(importedData.tasks))

         // Update context with new tasks
         importedData.tasks.forEach((task) => {
            if (todos.find((t) => t.id === task.id)) {
               updateTodo(task.id, task)
            } else {
               addTodo(task)
            }
         })

         // Clear the file input
         if (fileInputRef.current) {
            fileInputRef.current.value = ''
         }

         // Show success message
         toast.success('Tasks imported successfully!')
         onClose?.() // Close modal after successful import
      } catch (error) {
         console.error('Error importing tasks:', error)
         toast.error(`Failed to import tasks: ${error.message}`)
      } finally {
         setIsImporting(false)
      }
   }

   return (
      <div className='bg-purple-800/90 dark:bg-purple-900/90 p-6 rounded-lg shadow-lg border border-purple-500/30 dark:border-purple-400/30'>
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

         {/* Title */}
         <h2 className='text-2xl font-semibold text-center mb-6 text-white flex items-center justify-center gap-2'>
            Tasks Backup
         </h2>

         {/* Divider */}
         <div className='border-b border-purple-400/30 mb-6'></div>

         {/* Export/Import Section */}
         <div className='flex justify-center gap-6 mb-6'>
            {/* Export Button */}
            <button
               onClick={handleExportTasks}
               className='px-4 py-2 bg-emerald-600/40 hover:bg-emerald-500/50 border border-emerald-400/50 text-white rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-105'
               disabled={isImporting}
            >
               <FaDownload className='w-4 h-4' />
               Export Tasks
            </button>

            {/* Import Button */}
            <button
               onClick={() => fileInputRef.current?.click()}
               className='px-4 py-2 bg-amber-600/40 hover:bg-amber-500/50 border border-amber-400/50 text-white rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-105'
               disabled={isImporting}
            >
               <FaUpload className='w-4 h-4' />
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

         {/* Divider */}
         <div className='border-b border-purple-400/30 mb-8'></div>

         {/* Notion Sync Section */}
         <div className='flex flex-col gap-4'>
            <button
               className='w-full px-4 py-3 bg-blue-600/40 hover:bg-blue-500/50 border border-blue-400/50 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105'
               disabled={isImporting}
            >
               <FaSync className='w-4 h-4' />
               Fetch Data from Notion and SYNC this Device
            </button>

            <button
               className='w-full px-4 py-3 bg-indigo-600/40 hover:bg-indigo-500/50 border border-indigo-400/50 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105'
               disabled={isImporting}
            >
               <FaSync className='w-4 h-4' />
               Upload Data to Notion and SYNC this Device
            </button>
         </div>
      </div>
   )
}

export default TaskBackups
