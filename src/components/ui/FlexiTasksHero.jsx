import { Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useEffect } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useMotionTemplate, useMotionValue, motion, animate } from 'framer-motion'
import { useAppTheme } from '../../contexts/AppThemeContext'

const COLORS_TOP = ['#4f46e5', '#7c3aed', '#2563eb', '#0891b2']

export const FlexiTasksHero = () => {
   const navigate = useNavigate()
   const { appTheme, getColorClass } = useAppTheme()
   const color = useMotionValue(COLORS_TOP[0])

   useEffect(() => {
      animate(color, COLORS_TOP, {
         ease: 'easeInOut',
         duration: 12,
         repeat: Infinity,
         repeatType: 'mirror',
      })
   }, [])

   const backgroundImage = useMotionTemplate`radial-gradient(110% 110% at 50% 0%, #020617 60%, ${color})`
   const border = useMotionTemplate`1px solid ${color}`
   const boxShadow = useMotionTemplate`0px 4px 24px ${color}`

   const features = [
      {
         title: 'Multiple Views',
         description: 'List, Kanban, Matrix, Timeline & Calendar views for perfect organization',
         delay: 0.1,
      },
      {
         title: 'Dynamic Themes',
         description: 'Switch between Dark, Light, and stunning animated themes',
         delay: 0.2,
      },
      {
         title: 'Smart Organization',
         description: 'Categories, priorities, and flexible task management',
         delay: 0.3,
      },
      {
         title: 'Flexible Layouts',
         description: 'Choose between Compact, Detailed, or Custom UI modes',
         delay: 0.4,
      },
      {
         title: 'Rich Features',
         description: 'SubTasks, Notes, Sorting, and advanced task management',
         delay: 0.5,
      },
      {
         title: 'Data Control',
         description: 'Local backup & restore with cloud sync coming soon',
         delay: 0.6,
      },
   ]

   return (
      <motion.section
         style={{ backgroundImage }}
         className='relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gray-950 px-2 py-0 text-gray-200'
      >
         {/* 3D Stars Background */}
         <div className='absolute inset-0 z-0 pointer-events-none'>
            <Canvas camera={{ position: [0, 0, 1] }}>
               <Stars
                  radius={50}
                  count={1800}
                  factor={3.5}
                  fade
                  speed={2}
               />
            </Canvas>
            <div className='absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#181a2a] to-transparent pointer-events-none' />
         </div>

         {/* Main Content */}
         <div className='relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto'>
            {/* Hero Content */}
            <div className='w-full flex flex-col items-center gap-3 pt-3 pb-6'>
               <motion.img
                  src='/checklist.gif'
                  alt='FlexiTASKS Logo'
                  className='w-16 h-16 rounded-2xl bg-indigo-950/30 p-1 border border-indigo-300/20 shadow-md'
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
               />
               <span className='inline-block rounded-full bg-indigo-600/50 px-3 py-1 text-xs font-medium mt-2 mb-1'>
                  🚀 Now Live!
               </span>
               <motion.h1
                  className='bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-extrabold leading-tight text-transparent sm:text-5xl md:text-6xl space-grotesk mb-2'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
               >
                  FlexiTASKS
               </motion.h1>
               <motion.p
                  className='max-w-2xl text-center text-base leading-relaxed md:text-lg text-indigo-100/90 space-grotesk mb-2'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
               >
                  A modern, powerful, and beautiful task management app with seamless local storage and delightful
                  micro-interactions
               </motion.p>
               <motion.button
                  onClick={() => navigate('/app')}
                  style={{ border, boxShadow }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className='group flex items-center gap-2 rounded-full bg-gray-950/20 px-6 py-3 text-base font-semibold text-gray-50 transition-colors hover:bg-gray-950/40 backdrop-blur-sm shadow-md mt-2'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
               >
                  Start Using FlexiTASKS
                  <FiArrowRight className='transition-transform group-hover:-rotate-45 group-active:-rotate-12' />
               </motion.button>
            </div>

            {/* Features Grid */}
            <motion.div
               className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl mx-auto mt-2'
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.8, delay: 0.8 }}
            >
               {features.map((feature, index) => (
                  <motion.div
                     key={feature.title}
                     className='p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-indigo-300/10 hover:bg-white/10 hover:border-indigo-300/20 transition-all duration-300 shadow-sm'
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{
                        duration: 0.5,
                        delay: 0.8 + feature.delay,
                     }}
                  >
                     <h3 className='text-base font-semibold text-white/90 mb-1'>{feature.title}</h3>
                     <p className='text-indigo-100/70 text-xs'>{feature.description}</p>
                  </motion.div>
               ))}
            </motion.div>

            {/* Coming Soon Badge */}
            <motion.div
               className='flex justify-center mt-6'
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 1.4 }}
            >
               <div className='bg-indigo-950/30 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-300/10'>
                  <span className='text-xs text-indigo-100/80'>🚀 Cross-Device Sync Coming Soon</span>
               </div>
            </motion.div>
         </div>
      </motion.section>
   )
}
