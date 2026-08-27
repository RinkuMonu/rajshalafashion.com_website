// import { AlignLeft } from "lucide-react";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// interface DropdownProps {
//   categories: string[];
// }

// const Dropdown: React.FC<DropdownProps> = ({ categories }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

//   const toggleDropdown = (): void => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   return (
//     <div className="relative inline-block">
//       <button
//         id="dropdownDefaultButton"
//         onClick={toggleDropdown}
//         style={{ backgroundColor:"rgb(82, 82, 162)" ,
//             height:"49px",
//             width:"275px",
//             gap:"25px"
//         }}
//         className="text-white hover:bg-blue-800  focus:outline-none  font-medium  text-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         type="button"
//       >
//         <AlignLeft/>
//         All Category  
//         <svg
//           className="w-2.5 h-2.5 ms-10"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 10 2"
//         >
//           <path
//             stroke="currentColor"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="m1 1 4 4 4-4"
//           />
//         </svg>
//       </button>

//       {isDropdownOpen && (
//         <div
//           id="dropdown"
//           className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-2 dark:bg-gray-700"
//         >
            
//           <ul
//             className="py-2 text-sm text-gray-700 dark:text-gray-200"
//             aria-labelledby="dropdownDefaultButton"
//           >
//             {categories.map((item) => (
//               <li key={item}>
//                 <Link
//                   to={`/category/${item.toLowerCase()}`}
//                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                   onClick={() => setIsDropdownOpen(false)}
//                 >
//                   {item}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dropdown;



import { AlignLeft, ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

interface DropdownProps {
  categories: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ categories }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (): void => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        onClick={toggleDropdown}
        className="flex items-center justify-between w-64 h-12 px-4 py-2 text-white bg-purple-950 hover:bg-purple-900 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none rounded-lg transition-all duration-200 shadow-md font-medium"
      >
        <div className="flex items-center gap-3">
          <AlignLeft size={20} />
          <span className="text-base font-medium">All Categories</span>
        </div>
        <ChevronDown 
          size={18}
          className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} 
        />
      </button>

      <div
        className={`absolute z-20 mt-2 w-full origin-top rounded-xl bg-white shadow-lg ring-1 ring-black/5 transition-all duration-300 ease-in-out ${isDropdownOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 invisible"}`}
      >
        <ul className="py-2">
          {categories.map((item) => (
            <li key={item}>
              <Link
                to={`/category/${item.toLowerCase()}`}
                className="flex items-center px-4 py-3 text-gray-800 hover:bg-indigo-50 transition-colors duration-150 group"
                onClick={() => setIsDropdownOpen(false)}
              >
                <span className="flex-grow font-medium">{item}</span>
                <span className="h-px flex-grow max-w-[20px] bg-indigo-300 transition-all duration-300 group-hover:max-w-[40px] group-hover:bg-indigo-500"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;