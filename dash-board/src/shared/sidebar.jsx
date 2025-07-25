import React from 'react';
import { Home, Users, Heart, Activity, Settings, X } from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) => {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'donors', label: 'Donors', icon: Users },
    { id: 'users', label: 'Users', icon: Heart },
   
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center">
          {/* <Heart className="w-8 h-8 text-red-600 mr-2" /> */}
          <img src='/bloodIcon.ico' className="w-8 h-8 text-red-600 mr-2"/>
          <h1 className="text-xl font-bold text-white">RedBridge</h1>
        </div>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav className="mt-6">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-6 py-3 text-left hover:bg-slate-700 transition-colors ${
              activeTab === item.id ? 'bg-blue-900 text-blue-300 border-r-2 border-blue-500' : 'text-gray-300'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;