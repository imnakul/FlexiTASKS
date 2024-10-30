import { toast } from "react-toastify";

function ClearTodos({ todos, setTodos }) {
   return (
      <button
         className='btn btn-square btn-outline btn-sm ml-50 bg-gray-50 hover:bg-gray-300 hover:ring-base-100 hover:ring-2 rounded-none xl:mb-5 mr-2 p-1 xl:btn-md xl:p-1'
         onClick={() => {
            if (todos.length > 0) {
               if (
                  window.confirm("Are you sure, you want to Clear All Tasks?")
               ) {
                  setTodos([]);
                  toast.success("Todos List Cleared!", { theme: "dark" });
               }
            } else {
               window.alert("No Tasks To Clear!");
            }
         }}
      >
         <img
            src='./clear.png'
            alt='green'
            style={{
               width: "auto",
               height: "auto",
               paddding: 2,
            }}
         />
      </button>
   );
}
export default ClearTodos;
