import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlineQuestionCircle } from 'react-icons/ai'

const MatrixHelpTooltip = () => {
   const [showInfo, setShowInfo] = useState(false)

   return (
      <div className='absolute sm:bottom-4 left-20 z-50'>
         <div
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
            onClick={() => setShowInfo(!showInfo)}
            className='cursor-pointer text-purple-600 dark:text-purple-300'
         >
            <AiOutlineQuestionCircle size={20} />
         </div>

         <AnimatePresence>
            {showInfo && (
               <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className='mt-2 p-4 sm:w-80 text-xs sm:text-sm rounded-lg shadow-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 absolute left-0 top-8 w-64'
               >
                  <p className='mb-2 font-semibold text-purple-700 dark:text-purple-300'>
                     Matrix Guide
                  </p>
                  <ul className='space-y-1 text-gray-700 dark:text-gray-300 list-disc list-inside'>
                     <li>
                        <strong>Do First:</strong> High priority & due in 24
                        hours.
                     </li>
                     <li>
                        <strong>Schedule:</strong> High priority, but not due
                        soon.
                     </li>
                     <li>
                        <strong>Delegate:</strong> Low priority & due in 24
                        hours.
                     </li>
                     <li>
                        <strong>Don't Do:</strong> Low priority & not urgent.
                     </li>
                  </ul>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   )
}

export default MatrixHelpTooltip
