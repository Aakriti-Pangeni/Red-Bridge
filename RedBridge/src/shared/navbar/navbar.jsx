



// import React, { useState, useEffect, useRef } from "react";
// import { NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons"

// const NavBar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [bloodInfoOpen, setBloodInfoOpen] = useState(false);
//   const dropdownRef = useRef(null);


//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setBloodInfoOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-blue-950 text-white text-[15px] px-6 py-4 shadow-md">
//       <div className="flex items-center justify-between">

//         <div className="flex items-center gap-2">
//           <NavLink to="/home" className="flex items-center gap-2">
//             <img src="/bloodIcon.ico" alt="img" className="h-8 w-8" />
//             <span className="font-semibold text-[17px] text-white">RedBridge</span>
//           </NavLink>
//         </div>

//         {/* Hamburger Button */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="md:hidden text-white"
//         >
//           <label htmlFor="menu-toggle" className="cursor-pointer">
//             <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </label>
//         </button>

//         <ul className="hidden md:flex gap-8 items-center text-[16px]">
          
//           <li><NavLink to="/home" className="hover:text-cyan-500">Home</NavLink></li>
//           <li><NavLink to="/about" className="hover:text-cyan-500">About Us</NavLink></li>
//           <li><NavLink to="/contactus" className="hover:text-cyan-500">Contact Us</NavLink></li>
//           <li><NavLink to="/faqs" className="hover:text-cyan-500">FAQs</NavLink></li>


//           <li className="relative" ref={dropdownRef}>
//             <button
//               onClick={() => setBloodInfoOpen(!bloodInfoOpen)}
//               className="hover:text-cyan-500 flex items-center gap-1"
//             >
//               Blood Info <FontAwesomeIcon icon={faCircleChevronDown} />
//             </button>

//             {bloodInfoOpen && (
//               <ul className="absolute top-8 left-0 bg-blue-950 text-white w-56 py-2 px-3 rounded-md shadow-lg z-50">
//                 <li className="py-1">
//                   <NavLink
//                     to="/info/bloodbasics"
//                     onClick={() => setBloodInfoOpen(false)}
//                     className="block hover:text-cyan-500"
//                   >
//                     Blood Basics
//                   </NavLink>
//                 </li>
//                 <li className="py-1">
//                   <NavLink
//                     to="/info/bloodbank"
//                     onClick={() => setBloodInfoOpen(false)}
//                     className="block hover:text-cyan-500"
//                   >
//                     Blood Bank Information
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//           </li>
//         </ul>


//         <div className="hidden md:block">
//           <button className="w-24 h-10 rounded-2xl bg-white text-black">
//             <NavLink to="/login" className="hover:text-cyan-500">Log In</NavLink>
//           </button>
//         </div>
//       </div>



//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden mt-4 flex flex-col gap-4">
//           <NavLink to="/home" className="hover:text-cyan-500">Home</NavLink>
//           <NavLink to="/about" className="hover:text-cyan-500">About Us</NavLink>
//           <NavLink to="/contactus" className="hover:text-cyan-500">Contact Us</NavLink>
//           <NavLink to="/faqs" className="hover:text-cyan-500">FAQs</NavLink>


//           <div className="">
//             <button onClick={() => setBloodInfoOpen(!bloodInfoOpen)} className="hover:text-cyan-500">Blood Info <FontAwesomeIcon icon={faCircleChevronDown} /> </button>
//             {bloodInfoOpen && (
//               <ul className="ml-4 mt-2 flex flex-col gap-2">
//                 <li>
//                   <NavLink to="/info/bloodbasics" onClick={() => setBloodInfoOpen(false)} className="hover:text-cyan-500">Blood Basics</NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/info/bloodbank" onClick={() => setBloodInfoOpen(false)} className="hover:text-cyan-500">Blood Bank Information</NavLink>
//                 </li>
//               </ul>
//             )}
//           </div>

//           <NavLink to="/login">
//             <button className="w-full h-10 rounded-2xl bg-white text-black mt-2">Log In</button>
//           </NavLink>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default NavBar;



// import React, { useState, useEffect, useRef } from "react";
// import { NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";

// const NavBar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [bloodInfoOpen, setBloodInfoOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setBloodInfoOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     const cookie = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("userInfo="));
//     if (cookie) {
//       try {
//         const parsed = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
//         setUser(parsed);
//       } catch (err) {
//         console.error("Invalid userInfo cookie");
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     document.cookie = "userInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     window.location.href = "/";
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-blue-950 text-white text-[15px] px-6 py-4 shadow-md">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <NavLink to="/home" className="flex items-center gap-2">
//             <img src="/bloodIcon.ico" alt="img" className="h-8 w-8" />
//             <span className="font-semibold text-[17px] text-white">RedBridge</span>
//           </NavLink>
//         </div>

//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="md:hidden text-white"
//         >
//           <label htmlFor="menu-toggle" className="cursor-pointer">
//             <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </label>
//         </button>

//         <ul className="hidden md:flex gap-8 items-center text-[16px]">
//           <li><NavLink to="/home" className="hover:text-cyan-500">Home</NavLink></li>
//           <li><NavLink to="/about" className="hover:text-cyan-500">About Us</NavLink></li>
//           <li><NavLink to="/contactus" className="hover:text-cyan-500">Contact Us</NavLink></li>
//           <li><NavLink to="/faqs" className="hover:text-cyan-500">FAQs</NavLink></li>

//           <li className="relative" ref={dropdownRef}>
//             <button
//               onClick={() => setBloodInfoOpen(!bloodInfoOpen)}
//               className="hover:text-cyan-500 flex items-center gap-1"
//             >
//               Blood Info <FontAwesomeIcon icon={faCircleChevronDown} />
//             </button>

//             {bloodInfoOpen && (
//               <ul className="absolute top-8 left-0 bg-blue-950 text-white w-56 py-2 px-3 rounded-md shadow-lg z-50">
//                 <li className="py-1">
//                   <NavLink
//                     to="/info/bloodbasics"
//                     onClick={() => setBloodInfoOpen(false)}
//                     className="block hover:text-cyan-500"
//                   >
//                     Blood Basics
//                   </NavLink>
//                 </li>
//                 <li className="py-1">
//                   <NavLink
//                     to="/info/bloodbank"
//                     onClick={() => setBloodInfoOpen(false)}
//                     className="block hover:text-cyan-500"
//                   >
//                     Blood Bank Information
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//           </li>
//         </ul>

//         <div className="hidden md:flex items-center gap-4">
//           {user ? (
//             <>
//               <span className="text-white font-semibold">{user.userName.split(" ")[0]}</span>
//               <button
//                 onClick={handleLogout}
//                 className="bg-white text-black px-4 py-2 rounded-2xl hover:bg-gray-200"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <NavLink to="/login">
//               <button className="w-24 h-10 rounded-2xl bg-white text-black hover:bg-gray-200">
//                 Log In
//               </button>
//             </NavLink>
//           )}
//         </div>
//       </div>

//       {menuOpen && (
//         <div className="md:hidden mt-4 flex flex-col gap-4">
//           <NavLink to="/home" className="hover:text-cyan-500">Home</NavLink>
//           <NavLink to="/about" className="hover:text-cyan-500">About Us</NavLink>
//           <NavLink to="/contactus" className="hover:text-cyan-500">Contact Us</NavLink>
//           <NavLink to="/faqs" className="hover:text-cyan-500">FAQs</NavLink>

//           <div>
//             <button onClick={() => setBloodInfoOpen(!bloodInfoOpen)} className="hover:text-cyan-500">Blood Info <FontAwesomeIcon icon={faCircleChevronDown} /> </button>
//             {bloodInfoOpen && (
//               <ul className="ml-4 mt-2 flex flex-col gap-2">
//                 <li>
//                   <NavLink to="/info/bloodbasics" onClick={() => setBloodInfoOpen(false)} className="hover:text-cyan-500">Blood Basics</NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/info/bloodbank" onClick={() => setBloodInfoOpen(false)} className="hover:text-cyan-500">Blood Bank Information</NavLink>
//                 </li>
//               </ul>
//             )}
//           </div>

//           {!user ? (
//             <NavLink to="/login">
//               <button className="w-full h-10 rounded-2xl bg-white text-black mt-2">Log In</button>
//             </NavLink>
//           ) : (
//             <div className="flex flex-col gap-2 mt-4">
//               <span className="text-white font-semibold">{user.userName.split(" ")[0]}</span>
//               <button
//                 onClick={handleLogout}
//                 className="w-full h-10 rounded-2xl bg-white text-black"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default NavBar;


import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bloodInfoOpen, setBloodInfoOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setBloodInfoOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userInfo="));
    if (cookie) {
      try {
        const parsed = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
        setUser(parsed);
      } catch (err) {
        console.error("Invalid userInfo cookie");
      }
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "userInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-950 text-white text-[15px] px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <NavLink to="/home" className="flex items-center gap-2">
            <img src="/bloodIcon.ico" alt="img" className="h-8 w-8" />
            <span className="font-semibold text-[17px] text-white">RedBridge</span>
          </NavLink>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          <label htmlFor="menu-toggle" className="cursor-pointer">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
        </button>

        <ul className="hidden md:flex gap-8 items-center text-[16px]">
          <li><NavLink to="/home" className="hover:text-cyan-500">Home</NavLink></li>
          <li><NavLink to="/about" className="hover:text-cyan-500">About Us</NavLink></li>
          <li><NavLink to="/contactus" className="hover:text-cyan-500">Contact Us</NavLink></li>
          <li><NavLink to="/faqs" className="hover:text-cyan-500">FAQs</NavLink></li>

          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setBloodInfoOpen(!bloodInfoOpen)}
              className="hover:text-cyan-500 flex items-center gap-1"
            >
              Blood Info <FontAwesomeIcon icon={faCircleChevronDown} />
            </button>

            {bloodInfoOpen && (
              <ul className="absolute top-8 left-0 bg-blue-950 text-white w-56 py-2 px-3 rounded-md shadow-lg z-50">
                <li className="py-1">
                  <NavLink
                    to="/info/bloodbasics"
                    onClick={() => setBloodInfoOpen(false)}
                    className="block hover:text-cyan-500"
                  >
                    Blood Basics
                  </NavLink>
                </li>
                <li className="py-1">
                  <NavLink
                    to="/info/bloodbank"
                    onClick={() => setBloodInfoOpen(false)}
                    className="block hover:text-cyan-500"
                  >
                    Blood Bank Information
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <NavLink to="/donorprofile" className="text-white font-semibold hover:text-cyan-400">
                {user.userName.split(" ")[0]}
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-white text-black px-4 py-2 rounded-2xl hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login">
              <button className="w-24 h-10 rounded-2xl bg-white text-black hover:bg-gray-200">
                Log In
              </button>
            </NavLink>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          <NavLink to="/home" className="hover:text-cyan-500">Home</NavLink>
          <NavLink to="/about" className="hover:text-cyan-500">About Us</NavLink>
          <NavLink to="/contactus" className="hover:text-cyan-500">Contact Us</NavLink>
          <NavLink to="/faqs" className="hover:text-cyan-500">FAQs</NavLink>

          <div>
            <button onClick={() => setBloodInfoOpen(!bloodInfoOpen)} className="hover:text-cyan-500">Blood Info <FontAwesomeIcon icon={faCircleChevronDown} /> </button>
            {bloodInfoOpen && (
              <ul className="ml-4 mt-2 flex flex-col gap-2">
                <li>
                  <NavLink to="/info/bloodbasics" onClick={() => setBloodInfoOpen(false)} className="hover:text-cyan-500">Blood Basics</NavLink>
                </li>
                <li>
                  <NavLink to="/info/bloodbank" onClick={() => setBloodInfoOpen(false)} className="hover:text-cyan-500">Blood Bank Information</NavLink>
                </li>
              </ul>
            )}
          </div>

          {!user ? (
            <NavLink to="/login">
              <button className="w-full h-10 rounded-2xl bg-white text-black mt-2">Log In</button>
            </NavLink>
          ) : (
            <div className="flex flex-col gap-2 mt-4">
              <NavLink to="/donorprofile" className="text-white font-semibold hover:text-cyan-400">
                {user.userName.split(" ")[0]}
              </NavLink>
              <button
                onClick={handleLogout}
                className="w-full h-10 rounded-2xl bg-white text-black"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
