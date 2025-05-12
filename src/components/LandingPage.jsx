import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppTheme } from '../contexts/AppThemeContext'
import Particles from './backgrounds/Particles'
import Squares from './backgrounds/Squares'

function LandingPage() {
   const navigate = useNavigate()
   const { appTheme, getColorClass } = useAppTheme()

   const features = [
      {
         title: 'Multiple Views',
         description:
            'List, Kanban, Matrix, Timeline & Calendar views for perfect organization',
         delay: 0.1,
      },
      {
         title: 'Dynamic Themes',
         description:
            'Switch between Dark, Light, and stunning animated themes',
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
      <div className='relative min-h-screen overflow-hidden'>
         {/* Background layer */}
         <div className='fixed inset-0 z-0'>
            {/* <Squares
               speed={0.3}
               squareSize={40}
               direction='diagonal'
               borderColor={
                  appTheme.colorTheme === 'none'
                     ? '#666'
                     : getColorClass(appTheme.colorTheme, 'particle')
               }
               hoverFillColor={
                  appTheme.colorTheme === 'none'
                     ? '#222'
                     : getColorClass(appTheme.colorTheme, 'particle')
               }
            /> */}            <Particles
               particleColors={['#c7d2fe', '#6366f1', '#4338ca']}
               particleCount={100}
               particleSpread={40}
               speed={0.05}
               particleBaseSize={50}
               moveParticlesOnHover={true}
               alphaParticles={true}
               disableRotation={true}
            />
         </div>

         {/* Content layer */}         <div className='relative z-10 min-h-screen flex flex-col bg-gradient-to-br from-indigo-600/95 via-purple-600/95 to-blue-700/95 dark:from-indigo-900/95 dark:via-purple-900/95 dark:to-blue-900/95 backdrop-blur-sm'>
            <div className='flex-1 flex items-center justify-center p-4 py-12'>
               <div className='max-w-6xl w-full space-y-12'>
                  {/* Hero Section */}
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8 }}
                     className='text-center space-y-8'
                  >
                     {/* Logo and Title */}
                     <div className='flex flex-col items-center space-y-6'>
                        <motion.img                           src='/checklist.gif'
                           alt='FlexiTASKS Logo'
                           className='w-24 h-24 lg:w-32 lg:h-32 filter-glow-logo rounded-3xl bg-indigo-900/50 p-2'
                           initial={{ scale: 0.8 }}
                           animate={{ scale: 1 }}
                           transition={{ duration: 0.5 }}
                        />                        <h1 className='text-4xl lg:text-6xl font-extrabold space-grotesk text-white'>
                           FlexiTASKS
                        </h1>
                     </div>

                     {/* Tagline */}
                     <h2 className='text-xl lg:text-2xl text-indigo-100 max-w-3xl mx-auto font-medium space-grotesk leading-relaxed'>
                        A modern, powerful, and beautiful task management app
                        with seamless local storage and delightful
                        micro-interactions
                     </h2>

                     {/* Feature Grid */}
                     <motion.div
                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12 px-4'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                     >
                        {features.map((feature, index) => (
                           <motion.div
                              key={feature.title}
                              className='p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-indigo-300/20 hover:bg-white/20 hover:border-indigo-300/30 transition-all duration-300'
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                 duration: 0.5,
                                 delay: feature.delay,
                              }}
                           >                              <h3 className='text-lg font-semibold text-white mb-2'>
                                 {feature.title}
                              </h3>
                              <p className='text-indigo-100'>
                                 {feature.description}
                              </p>
                           </motion.div>
                        ))}
                     </motion.div>

                     {/* Bottom Section */}
                     <div className='mt-12 space-y-6'>
                        {/* CTA Button */}
                        <motion.button
                           onClick={() => navigate('/app')}
                           className={`px-8 py-4 text-lg font-semibold text-white rounded-xl transform transition-all duration-200 
                              ${getColorClass(appTheme.colorTheme, 'buttonbg')} 
                              ${getColorClass(
                                 appTheme.colorTheme,
                                 'buttonbghover'
                              )}
                              hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl`}
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                        >
                           Start Using FlexiTASKS
                        </motion.button>

                        {/* Coming Soon Badge */}
                        <div className='flex justify-center'>                           <div className='bg-indigo-300/10 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-300/20'>
                              <span className='text-sm text-indigo-100'>
                                 🚀 Cross-Device Sync Coming Soon
                              </span>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default LandingPage
