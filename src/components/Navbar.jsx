import Theme from "./Theme";

function Navbar() {
   return (
      <div className='navbar bg-primary xl:p-8 xl:mb-4 xl:mt-3 mb-2 mt-2 flex flex-wrap justify-between'>
         {/* <div className='flex-none'> */}
         <button
            className='btn btn-square btn-outline xl:btn-lg
          btn-md  hover:ring-base-100 hover:ring-2 rounded-none'
         >
            <img
               style={{ width: "auto", height: "auto" }}
               src='/checklist.gif'
               alt='todoicon'
            />
         </button>
         {/* </div> */}
         {/* <div className='flex-1'> */}
         <a className='m-2 xl:text-7xl text-3xl font-serif text-primary-content font-bold text-center'>
            To-Do App
         </a>
         {/* </div> */}
         {/* <div className='flex-none'> */}
         <Theme />
         {/* </div> */}
      </div>
   );
}
export default Navbar;
