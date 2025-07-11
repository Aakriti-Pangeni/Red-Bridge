import React from 'react';
import StatsCard from './statscard';
import { Users, Activity, CheckCircle, Clock } from 'lucide-react';

const DashboardPage = () => {
  const statsCards = [
    {
      title: 'Total Donors',
      value: '1,234',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-600'
    },
    {
      title: 'Active Requests',
      value: '87',
      change: '+8.2%',
      trend: 'up',
      icon: Activity,
      color: 'bg-red-600'
    },
    {
      title: 'Successful Matches',
      value: '456',
      change: '+15.3%',
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-green-600'
    },
    {
      title: 'Pending Requests',
      value: '23',
      change: '-5.1%',
      trend: 'down',
      icon: Clock,
      color: 'bg-yellow-600'
    }
  ];

  const recentRequests = [
    { id: 1, name: 'Hari Sharma', bloodType: 'O+', location: 'Kathmandu', urgency: 'High', time: '2 hours ago' },
    { id: 2, name: 'Aastha Devkota', bloodType: 'A-', location: 'Lalitpur', urgency: 'Medium', time: '4 hours ago' },
    { id: 3, name: 'Aarav Kafle', bloodType: 'B+', location: 'Bhaktapur', urgency: 'Low', time: '6 hours ago' },
    { id: 4, name: 'Aadesh Marasini', bloodType: 'AB-', location: 'Pokhara', urgency: 'High', time: '8 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <StatsCard key={index} {...card} />
        ))}
      </div>

      {/* Recent Requests and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Blood Requests */}
        <div className="bg-slate-800 rounded-lg shadow-sm p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Blood Requests</h3>
          <div className="space-y-3">
            {recentRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{request.bloodType}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{request.name}</p>
                    <p className="text-sm text-gray-400">{request.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.urgency === 'High' ? 'bg-red-100 text-red-800' :
                    request.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {request.urgency}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">{request.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blood Type Distribution */}
        <div className="bg-slate-800 rounded-lg shadow-sm p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Blood Type Distribution</h3>
          <div className="space-y-3">
            {['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-'].map((type, index) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-gray-300">{type}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full" 
                      style={{ width: `${Math.random() * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400">{Math.floor(Math.random() * 200) + 50}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;