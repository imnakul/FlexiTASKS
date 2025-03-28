import Theme from './Theme'

function Navbar() {
   return (
      <div className='navbar bg-primary shadow-md mb-6'>
         <div className='container mx-auto px-4'>
            <div className='flex items-center justify-between w-full'>
               <div className='flex items-center gap-4'>
                  <button className='btn btn-ghost hover:bg-base-100/20 rounded-lg'>
                     <img
                        className='w-8 h-8'
                        src='/checklist.gif'
                        alt='todoicon'
                     />
                  </button>
                  <a className='text-2xl font-bold text-primary-content'>
                     To-Do App
                  </a>
               </div>
               <div className='flex items-center'>
                  <Theme />
               </div>
            </div>
         </div>
      </div>
   )
}

export default Navbar
