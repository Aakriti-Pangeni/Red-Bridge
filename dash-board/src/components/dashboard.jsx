import React, { useState } from 'react';
import Sidebar from '../shared/sidebar';
import Header from '../shared/header';
import DashboardPage from '../pages/dashboardpage';
import DonorsPage from '../pages/donorspage';
import UsersPage from '../pages/userspage'; 




const BloodDonorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'donors':
        return <DonorsPage />;
        
        case 'users':
      case 'Users':
        return <UsersPage />;
     
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <div className={`${sidebarOpen ? 'lg:ml-64' : ''} transition-all duration-300`}>
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
        />
        
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default BloodDonorDashboard;