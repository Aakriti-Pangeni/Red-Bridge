import React, { useState, useEffect, useRef } from 'react';
import { Menu, User, LogOut, Mail } from 'lucide-react';

const Header = ({ sidebarOpen, setSidebarOpen, activeTab }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const dropdownRef = useRef(null);

 
  useEffect(() => {
    const getAdminInfo = () => {
      try {
      
        let userInfo = localStorage.getItem('userInfo');
        
        if (!userInfo) {
          
          const cookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('userInfo='));
          
          if (cookie) {
            userInfo = decodeURIComponent(cookie.split('=')[1]);
          }
        }

        if (userInfo) {
          const parsed = JSON.parse(userInfo);
          setAdminInfo(parsed);
          console.log('Admin info loaded:', parsed);
        }
      } catch (error) {
        console.error('Error parsing admin info:', error);
      }
    };

    getAdminInfo();
  }, []);

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const getAdminName = () => {
    if (!adminInfo) return 'Admin';
    return adminInfo.name || adminInfo.userName || 'Admin User';
  };

 
  const getAdminInitial = () => {
    const name = getAdminName();
    return name.charAt(0).toUpperCase();
  };

 
  const handleLogout = () => {
    try {
     
      localStorage.removeItem('authToken');
      localStorage.removeItem('userInfo');
      
      document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'userInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      console.log('✅ Admin logged out successfully');
      
     
      window.location.href = 'http://localhost:5173/login';
    } catch (error) {
      console.error('Error during logout:', error);
     
      window.location.href = 'http://localhost:5173/login';
    }
  };

  return (
    <header className="bg-slate-800 shadow-sm border-b border-slate-700">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white mr-4"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-semibold text-white capitalize">{activeTab}</h2>
        </div>

      
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 hover:bg-slate-700 rounded-lg px-3 py-2 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">{getAdminInitial()}</span>
            </div>
            <span className="text-sm font-medium text-white">{getAdminName()}</span>
            <svg 
              className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

       
          {dropdownOpen && (
            <div className="absolute right-0 top-12 bg-white text-gray-800 w-72 py-3 px-4 rounded-lg shadow-lg z-50 border">
             
              <div className="border-b border-gray-200 pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{getAdminName()}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {adminInfo?.email || 'admin@redbridge.com'}
                    </p>
                    <p className="text-xs text-blue-600 font-medium">Administrator</p>
                  </div>
                </div>
              </div>

            
              <div className="space-y-1">
                <div className="flex items-center gap-3 px-3 py-2 text-gray-700">
                 
                </div>
                
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-50 rounded-md transition-colors text-left"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span className="text-red-600 font-medium text-sm">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;


