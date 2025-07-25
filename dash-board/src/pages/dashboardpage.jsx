


import React, { useEffect, useState } from 'react';
import StatsCard from './statscard';
import { Users } from 'lucide-react';

const DashboardPage = () => {
  const [stats, setStats] = useState({ totalDonors: 0, totalUsers: 0 });
  const [bloodData, setBloodData] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:4000/dashboard/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      }
    };

    const fetchBlood = async () => {
      try {
        const res = await fetch('http://localhost:4000/dashboard/blood-distribution');
        const data = await res.json();
        setBloodData(data);
      } catch (err) {
        console.error('Error fetching blood distribution', err);
      }
    };

    fetchStats();
    fetchBlood();
  }, []);

  const statsCards = [
    {
      title: 'Total Donors',
      value: stats.totalDonors,
      icon: Users,
      color: 'bg-blue-600'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-green-600'
    }
  ];

  return (
    <div className="space-y-6 px-4 py-6 md:px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <StatsCard key={index} {...card} />
        ))}
      </div>

      <div className="bg-slate-800 rounded-lg shadow-sm p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Blood Type Distribution</h3>
        <div className="space-y-3">
          {Object.entries(bloodData).map(([type, count]) => (
            <div key={type} className="flex items-center justify-between">
              <span className="text-gray-300">{type}</span>
              <div className="flex items-center space-x-2 w-2/3 md:w-1/2">
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full" 
                    style={{ width: `${Math.min(count * 5, 100)}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-400">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;


