import {
   FaPalette,
   FaCheck,
   FaDesktop,
   FaMobileAlt,
   FaTabletAlt,
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useAppTheme } from '../contexts/AppThemeContext'

function ThemeSettings({ onClose }) {
   const {
      appTheme,
      setDesignBasis,
      setColorTheme,
      setBackground,
      setTaskInterface,
      updateTaskFeatures,
      getColorClass,
   } = useAppTheme()

   const colorOptions = [
      { name: 'green', class: 'bg-green-400' },
      { name: 'purple', class: 'bg-purple-400' },
      { name: 'red', class: 'bg-red-400' },
      { name: 'orange', class: 'bg-orange-400' },
      { name: 'yellow', class: 'bg-yellow-400' },
      { name: 'blue', class: 'bg-blue-400' },
      { name: 'emerald', class: 'bg-emerald-500' },
      { name: 'cyan', class: 'bg-cyan-500' },
      { name: 'fuchsia', class: 'bg-fuchsia-500' },
   ]

   const backgroundOptions = [
      { name: 'particle' },
      { name: 'space' },
      { name: 'fog' },
      { name: 'mistyGlow' },
      { name: 'orbs' },
      { name: 'rain' },
      { name: 'none' },
   ]

   const handleInterfaceChange = (mode) => {
      setTaskInterface(mode)
   }

   const toggleFeature = (feature) => {
      if (appTheme.taskInterface.mode !== 'custom') return
      updateTaskFeatures({
         ...appTheme.taskInterface.features,
         [feature]: !appTheme.taskInterface.features[feature],
      })
   }

   const handleSaveSettings = () => {
      try {
         // Save all current settings to localStorage through AppThemeContext
         toast.success('Theme settings saved successfully!')
         onClose?.()
      } catch (error) {
         console.error('Error saving theme settings:', error)
         toast.error('Failed to save theme settings')
      }
   }

   return (
      <div className='bg-gray-800 dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700'>
         {/* Title */}
         {/* <h2 className='text-xl font-semibold text-center mb-4 text-white flex items-center justify-center gap-2'>
            <FaPalette className='w-5 h-5 text-purple-500' />
            Theme Settings
         </h2> */}

         {/* Divider */}
         {/* <div className='border-b border-gray-700 mb-4'></div> */}

         {/* Settings Grid */}
         <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            {/* Left Column */}
            <div
               className={`space-y-8 border ${getColorClass(
                  appTheme.colorTheme,
                  'border'
               )} rounded-md p-2`}
            >
               {/* Tasks Interface */}
               <div>
                  <h3
                     className={`flex items-center justify-center text-sm font-bold text-white mb-2 border-b ${getColorClass(
                        appTheme.colorTheme,
                        'border'
                     )} py-1 `}
                  >
                     Tasks Interface
                  </h3>
                  <div className='space-y-1.5'>
                     {['minimal', 'maximal', 'custom'].map((option) => (
                        <button
                           key={option}
                           onClick={() => handleInterfaceChange(option)}
                           className={`w-full px-3 py-1.5 rounded-md transition-all duration-200 flex items-center gap-2 text-sm
                              ${
                                 appTheme.taskInterface.mode === option
                                    ? `${getColorClass(
                                         appTheme.colorTheme,
                                         'buttonbg'
                                      )} text-white`
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                              }`}
                        >
                           {option === 'minimal' && (
                              <FaMobileAlt className='w-3.5 h-3.5' />
                           )}
                           {option === 'maximal' && (
                              <FaDesktop className='w-3.5 h-3.5' />
                           )}
                           {option === 'custom' && (
                              <FaTabletAlt className='w-3.5 h-3.5' />
                           )}
                           {option.charAt(0).toUpperCase() + option.slice(1)}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Feature Toggles - Only show if custom interface is selected */}
               {appTheme.taskInterface.mode === 'custom' && (
                  <>
                     <div>
                        <h3
                           className={`flex items-center justify-center  text-sm font-bold border-b ${getColorClass(
                              appTheme.colorTheme,
                              'border'
                           )} py-1 text-white mb-2`}
                        >
                           Features
                        </h3>
                        <div className='space-y-2 bg-gray-800/50 rounded-md p-3'>
                           {Object.entries(appTheme.taskInterface.features).map(
                              ([feature, enabled]) => (
                                 <div
                                    key={feature}
                                    className='flex items-center justify-between'
                                 >
                                    <span className='text-gray-300 text-sm'>
                                       {feature.charAt(0).toUpperCase() +
                                          feature.slice(1)}
                                    </span>
                                    <button
                                       onClick={() => toggleFeature(feature)}
                                       className={`px-3 py-1 rounded-md transition-all duration-200 text-sm
                                    ${
                                       enabled
                                          ? `${getColorClass(
                                               appTheme.colorTheme,
                                               'buttonbg'
                                            )} text-white`
                                          : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                    }`}
                                    >
                                       {enabled ? 'Enable' : 'Disable'}
                                    </button>
                                 </div>
                              )
                           )}
                        </div>
                     </div>
                  </>
               )}
            </div>

            {/* Right Column */}

            <div
               className={`space-y-4 border ${getColorClass(
                  appTheme.colorTheme,
                  'border'
               )} rounded-md p-2`}
            >
               {/* Background */}
               {/* Design Basis */}
               <div>
                  <h3
                     className={`flex items-center justify-center  text-sm font-bold text-white mb-2 py-1 border-b ${getColorClass(
                        appTheme.colorTheme,
                        'border'
                     )}`}
                  >
                     Design Basis
                  </h3>
                  <div className='flex gap-2'>
                     <button
                        onClick={() => setDesignBasis('text')}
                        className={`flex-1 px-3 py-1.5 rounded-md transition-all duration-200 flex items-center justify-center gap-2 text-sm
                           ${
                              appTheme.designBasis === 'text'
                                 ? `${getColorClass(
                                      appTheme.colorTheme,
                                      'buttonbg'
                                   )} text-white`
                                 : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                           }`}
                     >
                        Text
                     </button>
                     <button
                        onClick={() => setDesignBasis('icon')}
                        className={`flex-1 px-3 py-1.5 rounded-md transition-all duration-200 flex items-center justify-center gap-2 text-sm
                           ${
                              appTheme.designBasis === 'icon'
                                 ? `${getColorClass(
                                      appTheme.colorTheme,
                                      'buttonbg'
                                   )} text-white`
                                 : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                           }`}
                     >
                        Icon
                     </button>
                  </div>
               </div>
               <div>
                  <h3
                     className={`flex items-center justify-center text-sm font-bold border-b ${getColorClass(
                        appTheme.colorTheme,
                        'border'
                     )} py-1 text-white mb-2`}
                  >
                     Background
                  </h3>
                  <div className='grid grid-cols-2 gap-2'>
                     {backgroundOptions.map((option) => (
                        <button
                           key={option.name}
                           onClick={() => setBackground(option.name)}
                           className={`px-3 py-1.5 rounded-md transition-all duration-200 flex items-center justify-center gap-2 text-sm
                              ${
                                 appTheme.background === option.name
                                    ? `${getColorClass(
                                         appTheme.colorTheme,
                                         'buttonbg'
                                      )} text-white`
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                              }`}
                        >
                           {/* <span>{option.icon}</span> */}
                           {option.name.charAt(0).toUpperCase() +
                              option.name.slice(1)}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Color Theme */}
               <div>
                  <h3
                     className={`flex items-center justify-center  text-sm font-bold border-b ${getColorClass(
                        appTheme.colorTheme,
                        'border'
                     )} py-1 text-white mb-2`}
                  >
                     Color Theme
                  </h3>
                  <div className='bg-gray-800/50 p-3 rounded-md'>
                     <div className='grid grid-cols-3 gap-2'>
                        {colorOptions.map((color) => (
                           <button
                              key={color.name}
                              title={color.name}
                              onClick={() => setColorTheme(color.name)}
                              className={`aspect-square rounded-md size-10 ${
                                 color.class
                              } transition-all duration-200 flex items-center justify-center
                                 ${
                                    appTheme.colorTheme === color.name
                                       ? 'ring-2 ring-white scale-95'
                                       : 'hover:scale-95'
                                 }`}
                           >
                              {appTheme.colorTheme === color.name && (
                                 <FaCheck className='w-3.5 h-3.5 text-white' />
                              )}
                           </button>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Save Button */}
               <div className='flex items-center justify-center mt-8'>
                  <button
                     onClick={handleSaveSettings}
                     className={`px-4 py-1.5 ${getColorClass(
                        appTheme.colorTheme,
                        'buttonbg'
                     )}
                     
                     ${getColorClass(
                        appTheme.colorTheme,
                        'buttonbghover'
                     )} ${getColorClass(
                        appTheme.colorTheme,
                        'text'
                     )} text-white rounded-md transition-all duration-200 flex items-center gap-2 text-sm`}
                  >
                     <FaCheck className='w-3.5 h-3.5' />
                     Save Changes
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ThemeSettings
