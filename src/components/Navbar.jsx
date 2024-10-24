import Theme from "./Theme";

function Navbar() {
   return (
      <div className='navbar bg-primary p-8 mb-4 mt-3'>
         <div className='flex-none'>
            <button className='btn btn-square btn-outline btn-lg mr-3 hover:ring-secondary hover:ring-2'>
               <img
                  style={{ width: "auto", height: "auto" }}
                  src='/checklist.gif'
                  alt='todoicon'
               />
            </button>
         </div>
         <div className='flex-1'>
            <a className='m-2 text-5xl font-serif text-primary-content  font-bold text-center'>
               To-Do App
            </a>
         </div>
         <div className='flex-none'>
            <Theme />
         </div>
      </div>
   );
}
export default Navbar;
