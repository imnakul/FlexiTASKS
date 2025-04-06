// import { motion, AnimatePresence } from 'framer-motion'

// const ThemeTransitionOverlay = ({ isAnimating }) => {
//    return (
//       <AnimatePresence>
//          {isAnimating && (
//             <motion.div
//                className='fixed inset-0 z-[9999] pointer-events-none'
//                initial={{ opacity: 0, scale: 1 }}
//                animate={{
//                   opacity: 1,
//                   scale: 0.8,
//                   backdropFilter: 'blur(6px) brightness(0.8)',
//                   WebkitBackdropFilter: 'blur(6px) brightness(0.8)',
//                }}
//                exit={{
//                   opacity: 0,
//                   scale: 1,
//                   backdropFilter: 'blur(0px) brightness(1)',
//                   WebkitBackdropFilter: 'blur(0px) brightness(1)',
//                }}
//                transition={{ duration: 0.8, ease: 'easeInOut' }}
//                style={{
//                   backgroundColor: 'rgba(255,255,255,0)', // fully transparent
//                }}
//             />
//          )}
//       </AnimatePresence>
//    )
// }

// export default ThemeTransitionOverlay

// ThemeSlideTransition.jsx
// ThemeSlideTransition.jsx

//? Smooth tranisiton to left side, but two screens visible black and white
// import { motion, AnimatePresence } from 'framer-motion'

// const ThemeSlideTransition = ({ isAnimating, direction = 'left' }) => {
//    const slideVariants = {
//       initial: {
//          x:
//             direction === 'left'
//                ? '100%'
//                : direction === 'right'
//                ? '-100%'
//                : '0%',
//          y:
//             direction === 'top'
//                ? '100%'
//                : direction === 'bottom'
//                ? '-100%'
//                : '0%',
//       },
//       animate: {
//          x: '0%',
//          y: '0%',
//          transition: { duration: 0.5, ease: 'easeInOut' },
//       },
//       exit: {
//          x:
//             direction === 'left'
//                ? '-100%'
//                : direction === 'right'
//                ? '100%'
//                : '0%',
//          y:
//             direction === 'top'
//                ? '-100%'
//                : direction === 'bottom'
//                ? '100%'
//                : '0%',
//          transition: { duration: 0.4, ease: 'easeInOut' },
//       },
//    }

//    return (
//       <AnimatePresence>
//          {isAnimating && (
//             <motion.div
//                className='fixed inset-0 z-[9999] pointer-events-none'
//                variants={slideVariants}
//                initial='initial'
//                animate='animate'
//                exit='exit'
//                style={{
//                   backgroundColor: 'var(--theme-slide-color)',
//                }}
//             />
//          )}
//       </AnimatePresence>
//    )
// }

// export default ThemeSlideTransition

import { motion, AnimatePresence } from 'framer-motion'

const ThemeWipeTransition = ({ isAnimating, direction }) => {
   return (
      <AnimatePresence mode='wait'>
         {isAnimating && (
            <motion.div
               key={direction ? 'leftToRight' : 'rightToLeft'} // Forces re-render
               className='fixed inset-0 z-[9999] pointer-events-none'
               initial={{ x: direction ? '-100%' : '100%' }}
               animate={{ x: direction ? '100%' : '-100%' }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.8, ease: 'easeInOut' }}
               style={{
                  background: 'rgba(255,255,255,0.3)',
                  mixBlendMode: 'color',
                  width: '100vw',
               }}
            />
         )}
      </AnimatePresence>
   )
}

export default ThemeWipeTransition
