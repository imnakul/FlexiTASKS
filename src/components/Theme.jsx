import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState, useEffect } from "react";

function Theme() {
   const [themeName, setThemeName] = useState(
      localStorage.getItem("themeIdName")
   );

   //   useEffect(() => {
   //      const currentTheme = localStorage.getItem("themeIdName");
   //      //   document.querySelector("html").setAttribute("data-theme", currentTheme);
   //      //  setThemeName(currentTheme);
   //   }, []);

   useEffect(() => {
      localStorage.setItem("themeIdName", themeName);
      document.querySelector("html").setAttribute("data-theme", themeName);
   }, [themeName]);

   return (
      <Menu as='div' className='relative text-left'>
         {/* <MenuButton className='btn btn-ghost hover:bg-secondary focus:bg-primary hover:ring-green-300 hover:ring-2 text-lg px-6 py-2 rounded-md'>
            Themes
         </MenuButton> */}

         <MenuButton className='btn btn-square btn-outline rounded-none btn-lg mr-2 hover:ring-base-100 hover:ring-2 '>
            <img
               style={{ width: "auto", height: "auto" }}
               src='/theme-brush.gif'
               alt='themeChangeIcon'
            />
         </MenuButton>

         <MenuItems
            transition
            className='block max-w-fit mx-2 my-2 absolute right-0 z-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
         >
            <div className='py-0'>
               <MenuItem>
                  <button
                     onClick={() => setThemeName("aqua")}
                     className='block w-full text-center text-lg font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-blue-400 data-[hover]:bg-blue-500 data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     Aqua
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() => setThemeName("retro")}
                     className='block w-full text-center text-lg font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-orange-300 data-[hover]:bg-orange-300 data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     Retro
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() =>
                        document
                           .querySelector("html")
                           .setAttribute("data-theme", "luxury")
                     }
                     className='block w-full text-center text-lg font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-red-900 data-[hover]:bg-red-900 data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     Luxury
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() =>
                        document
                           .querySelector("html")
                           .setAttribute("data-theme", "valentine")
                     }
                     className='block w-full text-center text-lg font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-pink-400 data-[hover]:bg-pink-400 data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     Valentine
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() =>
                        document
                           .querySelector("html")
                           .setAttribute("data-theme", "lemonade")
                     }
                     className='block w-full text-center text-lg font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-yellow-200 data-[hover]:bg-yellow-200 data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     Lemonade
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() =>
                        document
                           .querySelector("html")
                           .setAttribute("data-theme", "dim")
                     }
                     className='block w-full text-center text-lg font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-blue-800 data-[hover]:bg-blue-800 data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     Dim
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() =>
                        document
                           .querySelector("html")
                           .setAttribute("data-theme", "light")
                     }
                     className='block w-full text-center text-lg font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-white data-[hover]:bg-white hover:text-black data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     Light
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() =>
                        document
                           .querySelector("html")
                           .setAttribute("data-theme", "dark")
                     }
                     className='block w-full text-center text-lg font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-gray-700 [hover]:bg-gray-700 data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     Dark
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() =>
                        document
                           .querySelector("html")
                           .setAttribute("data-theme", "synthwave")
                     }
                     className='block w-full text-center text-lg font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-blue-700 data-[hover]:to-blue-950 data-[focus]:text-gray-900 rounded-sm'
                  >
                     Synthwave
                  </button>
               </MenuItem>
               <MenuItem>
                  <button
                     onClick={() =>
                        document
                           .querySelector("html")
                           .setAttribute("data-theme", "forest")
                     }
                     className='block w-full text-center text-lg font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-green-700 data-[hover]:bg-green-700 data-[focus]:text-gray-900 rounded-sm'
                  >
                     Forest
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() =>
                        document
                           .querySelector("html")
                           .setAttribute("data-theme", "cyberpunk")
                     }
                     className='block w-full text-center text-lg font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-yellow-300 data-[hover]:bg-yellow-300 data-[focus]:text-gray-900 rounded-sm'
                  >
                     Cyberpunk
                  </button>
               </MenuItem>
            </div>
         </MenuItems>
      </Menu>
   );
}
export default Theme;
