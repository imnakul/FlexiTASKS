const Sorting = ({ todos, setTodos }) => {
   return (
      <>
         {/* Sorting functionality */}
         <label className='swap swap-flip text-9xl'>
            {/* this hidden checkbox controls the state */}
            <input
               type='checkbox'
               onClick={(e) => {
                  if (e.target.checked) {
                     const sortedTodos = [...todos].sort((a, b) => a.id - b.id)
                     setTodos(sortedTodos)
                  } else {
                     const sortedTodos = [...todos].sort((a, b) => b.id - a.id)
                     setTodos(sortedTodos)
                  }
               }}
            />
            <div className='swap-on btn btn-square btn-outline btn-sm bg-gray-50 hover:bg-gray-300  hover:ring-base-100 hover:ring-2 rounded-none xl:mb-5 mb-3 p-1 xl:btn-sm xl:p-1'>
               <img
                  src='./filter.png'
                  alt='green'
                  style={{
                     width: 'auto',
                     height: 'auto',
                     paddding: 2,
                  }}
               />
            </div>
            <div className='swap-off btn btn-square btn-outline btn-sm bg-gray-50 hover:bg-gray-300 hover:ring-base-100 hover:ring-2 rounded-none xl:mb-5 mb-3 p-1 xl:btn-sm xl:p-1'>
               <img
                  src='./filter2.png'
                  alt='red'
                  style={{ width: 'auto', height: 'auto' }}
               />
            </div>
         </label>
      </>
   )
}
export default Sorting
