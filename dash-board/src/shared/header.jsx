import React from 'react';
import { Menu } from 'lucide-react';

const Header = ({ sidebarOpen, setSidebarOpen, activeTab }) => {
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

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">A</span>
          </div>
          <span className="text-sm font-medium text-white">Admin User</span>
        </div>
      </div>
    </header>
  );
 };

export default Header;


