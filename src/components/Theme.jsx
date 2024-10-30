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

         <MenuButton className='btn btn-square btn-outline rounded-none md:btn-lg btn-md  hover:ring-base-100 hover:ring-2 '>
            <img
               style={{ width: "auto", height: "auto" }}
               src='/theme-brush.gif'
               alt='themeChangeIcon'
            />
         </MenuButton>

         <MenuItems
            transition
            className='block w-lg mx-2 my-2 z-10 absolute top-14 right-0 xl:absolute xl:right-0 xl:top-20 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in anchor:"bottom"'
         >
            <div className='py-0'>
               <MenuItem>
                  <button
                     onClick={() => setThemeName("aqua")}
                     className='block w-full text-center xl:text-xl text-xs font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-gradient-to-r from-blue-600 via-purple-700 to-blue-400 
                     data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     Aqua
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() => setThemeName("retro")}
                     className='block w-full text-center xl:text-xl text-xs font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-gradient-to-r from-yellow-200  via-green-200 to-pink-300 data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     Retro
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() => setThemeName("coffee")}
                     className='block w-full text-center xl:text-xl text-xs font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-gradient-to-r from-gray-800  via-teal-900 to-yellow-600 data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     Coffee
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() => setThemeName("cupcake")}
                     className='block w-full text-center xl:text-xl text-xs font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-gradient-to-r from-white via-pink-400 to-teal-600 data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     Cupcake
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() => setThemeName("halloween")}
                     className='block w-full text-center xl:text-xl text-xs font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-gradient-to-r from-gray-800 via-purple-700 to-orange-400 data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     Halloween
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() => setThemeName("bumblebee")}
                     className='block w-full text-center xl:text-xl text-xs font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-gradient-to-r from-white via-orange-400 to-yellow-300 data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     BumbleBee
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() => setThemeName("corporate")}
                     className='block w-full text-center xl:text-xl text-xs font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-gradient-to-r from-white via-gray-500 to-blue-600 data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     Corporate
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() => setThemeName("valentine")}
                     className='block w-full text-center xl:text-xl text-xs font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-gradient-to-r from-white via-purple-400 to-pink-400 hover:shadow-lg rounded-sm'
                  >
                     Valentine
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() => setThemeName("lemonade")}
                     className='block w-full text-center xl:text-xl text-xs font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-gradient-to-r from-white via-yellow-300 to-green-700 data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     Lemonade
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() => setThemeName("dim")}
                     className='block w-full text-center xl:text-xl text-xs font-semibold px-3 py-2 text-black data-[focus]:bg-gradient-to-r from-gray-800 via-orange-300 to-green-300 data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     Dim
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() => setThemeName("light")}
                     className='block w-full text-center xl:text-xl text-xs font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-gradient-to-r from-white via-blue-600 to-pink-700 hover:text-black data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     Light
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() => setThemeName("dark")}
                     className='block w-full text-center xl:text-xl text-xs font-semibold px-3 py-2 text-black data-[focus]:bg-gradient-to-r from-gray-800 via-pink-500 to-purple-400 data-[focus]:text-gray-900 hover:shadow-lg rounded-sm'
                  >
                     Dark
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() => setThemeName("synthwave")}
                     className='block w-full text-center xl:text-xl text-xs font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-gradient-to-r from-blue-950 via-blue-400 to-pink-400 data-[focus]:text-gray-900 rounded-sm'
                  >
                     Synthwave
                  </button>
               </MenuItem>
               <MenuItem>
                  <button
                     onClick={() => setThemeName("forest")}
                     className='block w-full text-center xl:text-xl text-xs font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-gradient-to-r from-gray-700 via-teal-500 to-green-600 data-[focus]:text-gray-900 rounded-sm'
                  >
                     Forest
                  </button>
               </MenuItem>

               <MenuItem>
                  <button
                     onClick={() => setThemeName("cyberpunk")}
                     className='block w-full text-center xl:text-xl text-xs font-semibold px-3 py-2 text-gray-700 data-[focus]:bg-gradient-to-r from-yellow-300 via-blue-500 to-pink-400 data-[focus]:text-gray-900 rounded-sm'
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
