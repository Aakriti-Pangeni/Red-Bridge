


import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown, faUser, faSignOutAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bloodInfoOpen, setBloodInfoOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false); 
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setBloodInfoOpen(false);
      }
      
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
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

  
  const getUserDisplayName = () => {
    if (!user) return "Guest";
    
    
    if (user.name) {
      return user.name.split(" ")[0];
    }
    
   
    if (user.userName) {
      return user.userName.split(" ")[0];
    }
    
    // Fallback
    return user.email ? user.email.split("@")[0] : "User";
  };

  //  GET FULL NAME FUNCTION
  const getUserFullName = () => {
    if (!user) return "Guest User";
    
    if (user.name) {
      return user.name;
    }
    
    if (user.userName) {
      return user.userName;
    }
    
    return user.email ? user.email.split("@")[0] : "User";
  };

  const handleLogout = () => {
    document.cookie = "userInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Clear localStorage too
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-950 text-white text-[15px] px-6 py-4 shadow-md">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <NavLink to="/home" className="flex items-center gap-2">
            <img src="/bloodIcon.ico" alt="img" className="h-8 w-8" />
            <span className="font-semibold text-[17px] text-white">RedBridge</span>
          </NavLink>
        </div>

        
        {user && (
          <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
            <span className="text-white font-semibold">
              Welcome, {getUserDisplayName()}
            </span>
          </div>
        )}

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white"
          >
            <label htmlFor="menu-toggle" className="cursor-pointer">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </button>
        </div>

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
                  <NavLink to="/info/bloodbasics" onClick={() => setBloodInfoOpen(false)} className="block hover:text-cyan-500">
                    Blood Basics
                  </NavLink>
                </li>
                <li className="py-1">
                  <NavLink to="/info/bloodbank" onClick={() => setBloodInfoOpen(false)} className="block hover:text-cyan-500">
                    Blood Bank Information
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>

       
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Welcome message */}
              <span className="text-white font-semibold">
                Welcome, {getUserDisplayName()}
              </span>
              
              {/*  USER DROPDOWN */}
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="w-10 h-10 bg-white text-blue-950 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <FontAwesomeIcon icon={faUser} className="text-lg" />
                </button>

                {/* DROPDOWN MENU */}
                {userDropdownOpen && (
                  <div className="absolute top-12 right-0 bg-white text-gray-800 w-64 py-3 px-4 rounded-lg shadow-lg z-50 border">
                    {/* User Info Section */}
                    <div className="border-b border-gray-200 pb-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-950 text-white rounded-full flex items-center justify-center">
                          <FontAwesomeIcon icon={faUser} className="text-lg" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{getUserFullName()}</p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-2">
                      <NavLink 
                        to="/donorprofile" 
                        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <FontAwesomeIcon icon={faUser} className="text-blue-950" />
                        <span className="text-gray-700">My Profile</span>
                      </NavLink>
                      
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-50 rounded-md transition-colors text-left"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="text-red-600" />
                        <span className="text-red-600 font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <NavLink to="/login">
              <button className="w-24 h-10 rounded-2xl bg-white text-black hover:bg-gray-200">
                Log In
              </button>
            </NavLink>
          )}
        </div>
      </div>

      {/*  UPDATED MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          <NavLink to="/home" className="hover:text-cyan-500">Home</NavLink>
          <NavLink to="/about" className="hover:text-cyan-500">About Us</NavLink>
          <NavLink to="/contactus" className="hover:text-cyan-500">Contact Us</NavLink>
          <NavLink to="/faqs" className="hover:text-cyan-500">FAQs</NavLink>

          <div>
            <button onClick={() => setBloodInfoOpen(!bloodInfoOpen)} className="hover:text-cyan-500">
              Blood Info <FontAwesomeIcon icon={faCircleChevronDown} />
            </button>
            {bloodInfoOpen && (
              <ul className="ml-4 mt-2 flex flex-col gap-2">
                <li>
                  <NavLink to="/info/bloodbasics" onClick={() => setBloodInfoOpen(false)} className="hover:text-cyan-500">
                    Blood Basics
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/info/bloodbank" onClick={() => setBloodInfoOpen(false)} className="hover:text-cyan-500">
                    Blood Bank Information
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          {/*  MOBILE USER SECTION */}
          {!user ? (
            <NavLink to="/login">
              <button className="w-full h-10 rounded-2xl bg-white text-black mt-2">Log In</button>
            </NavLink>
          ) : (
            <div className="border-t border-blue-800 pt-4 mt-4">
              {/* User Info in Mobile */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white text-blue-950 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div>
                  <p className="text-white font-semibold">{getUserFullName()}</p>
                  <p className="text-cyan-300 text-sm">{user.email}</p>
                </div>
              </div>
              
              {/* Mobile Menu Items */}
              <div className="flex flex-col gap-2">
                <NavLink 
                  to="/donorprofile" 
                  className="flex items-center gap-3 text-white hover:text-cyan-400 py-2"
                >
                  <FontAwesomeIcon icon={faUser} />
                  My Profile
                </NavLink>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-red-300 hover:text-red-200 py-2 text-left"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;