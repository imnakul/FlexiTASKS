import { FaDownload, FaUpload, FaSync } from 'react-icons/fa'

function TaskBackups() {
   return (
      <div className='bg-purple-800/90 dark:bg-purple-900/90 p-8 rounded-lg shadow-lg border border-purple-500/30 dark:border-purple-400/30'>
         {/* Title */}
         <h2 className='text-2xl font-semibold text-center mb-8 text-white flex items-center justify-center gap-2'>
            Tasks Backup
         </h2>

         {/* Divider */}
         <div className='border-b border-purple-400/30 mb-8'></div>

         {/* Export/Import Section */}
         <div className='flex justify-center gap-6 mb-8'>
            {/* Export Button */}
            <button className='px-6 py-3 bg-emerald-600/40 hover:bg-emerald-500/50 border border-emerald-400/50 text-white rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-105'>
               <FaDownload className='w-4 h-4' />
               Export Tasks
            </button>

            {/* Import Button */}
            <button className='px-6 py-3 bg-amber-600/40 hover:bg-amber-500/50 border border-amber-400/50 text-white rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-105'>
               <FaUpload className='w-4 h-4' />
               Import Tasks
            </button>
         </div>

         {/* Divider */}
         <div className='border-b border-purple-400/30 mb-8'></div>

         {/* Notion Sync Section */}
         <div className='flex flex-col gap-4'>
            <button className='w-full px-6 py-4 bg-blue-600/40 hover:bg-blue-500/50 border border-blue-400/50 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105'>
               <FaSync className='w-4 h-4' />
               Fetch Data from Notion and SYNC this Device
            </button>

            <button className='w-full px-6 py-4 bg-indigo-600/40 hover:bg-indigo-500/50 border border-indigo-400/50 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105'>
               <FaSync className='w-4 h-4' />
               Upload Data to Notion and SYNC this Device
            </button>
         </div>
      </div>
   )
}

export default TaskBackups
