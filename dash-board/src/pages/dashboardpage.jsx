


import React, { useEffect, useState } from 'react';
import StatsCard from './statscard';
import { Users, Clock, CheckCircle, XCircle } from 'lucide-react';
import {toast, ToastContainer} from 'react-toastify';

const DashboardPage = () => {
  const [stats, setStats] = useState({ totalDonors: 0, totalUsers: 0 });
  const [bloodData, setBloodData] = useState({});
  const [pendingDonors, setPendingDonors] = useState([]);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

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

   const fetchPendingDonors = async () => {
  try {
  
    let token = localStorage.getItem('authToken');
    
    if (!token) {
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
      };
      token = getCookie('authToken');
    }

    console.log('=== PENDING DONORS DEBUG ===');
    console.log('Token found:', token ? 'YES' : 'NO');
    console.log('Token value:', token?.substring(0, 20) + '...');
    console.log('All cookies:', document.cookie);
    console.log('LocalStorage authToken:', localStorage.getItem('authToken'));

    if (!token) {
      console.log(' No token found, skipping pending donors fetch');
      return;
    }

    console.log('Making request to: http://localhost:4000/donor/pending');
    
    const response = await fetch('http://localhost:4000/donor/pending', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Response status:', response.status);

    if (response.status === 401) {
      console.log('Authentication failed - invalid token');
      const errorText = await response.text();
      console.log('Error response:', errorText);
    } else if (response.status === 403) {
      console.log(' Access denied - not admin');
      const errorText = await response.text();
      console.log('Error response:', errorText);
    } else if (response.ok) {
      const data = await response.json();
      console.log(' Pending donors data:', data);
      console.log('Number of pending donors:', data.length);
      setPendingDonors(data);
    } else {
      console.error(' Failed to fetch pending donors:', response.status);
      const errorText = await response.text();
      console.log('Error response:', errorText);
    }
  } catch (error) {
    console.error(' Network error:', error);
  }
};

    fetchStats();
    fetchBlood();
    fetchPendingDonors();
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
    },
    {
      title: 'Pending Approvals',
      value: pendingDonors.length,
      icon: Clock,
      color: 'bg-yellow-600'
    }
  ];
 

  const handleApprove = async (donorId) => {
    try {
    
      let token = localStorage.getItem('authToken');
      if (!token) {
        const getCookie = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(";").shift();
          return null;
        };
        token = getCookie('authToken');
      }

      const response = await fetch(`http://localhost:4000/donor/approve/${donorId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setPendingDonors(pendingDonors.filter(donor => donor._id !== donorId));
        toast.success('Donor approved successfully');
      } else {
        toast.error('Failed to approve donor');
      }
    } catch (error) {
      console.error('Error approving donor:', error);
      toast.error('Error approving donor');
    }
  };

  const handleReject = async () => {
    try {
     
      let token = localStorage.getItem('authToken');
      if (!token) {
        const getCookie = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(";").shift();
          return null;
        };
        token = getCookie('authToken');
      }

      const response = await fetch(`http://localhost:4000/donor/reject/${selectedDonor._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason: rejectionReason })
      });

      if (response.ok) {
        setPendingDonors(pendingDonors.filter(donor => donor._id !== selectedDonor._id));
        setShowRejectModal(false);
        setRejectionReason('');
        setSelectedDonor(null);
        toast.success('Donor rejected successfully');
      } else {
        toast.error('Failed to reject donor');
      }
    } catch (error) {
      console.error('Error rejecting donor:', error);
      toast.error('Error rejecting donor');
    }
  };

  const openRejectModal = (donor) => {
    setSelectedDonor(donor);
    setShowRejectModal(true);
  };

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


      <div className="bg-slate-800 rounded-lg shadow-sm p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Pending Donor Approvals ({pendingDonors.length})</h3>
        {pendingDonors.length === 0 ? (
          <p className="text-gray-400">No pending donor registrations</p>
        ) : (
          <div className="space-y-4">
            {pendingDonors.map((donor) => (
              <div key={donor._id} className="bg-slate-700 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <h4 className="text-white font-semibold">{donor.name}</h4>
                    <p className="text-gray-300 text-sm">Blood Group: {donor.bloodGroup}</p>
                    <p className="text-gray-300 text-sm">Email: {donor.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Phone: {donor.phone}</p>
                    <p className="text-gray-300 text-sm">Address: {donor.address}</p>
                    <p className="text-gray-300 text-sm">Registered: {new Date(donor.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(donor._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition flex items-center gap-1"
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>
                  <button
                    onClick={() => openRejectModal(donor)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition flex items-center gap-1"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Reject Donor Registration</h3>
            <p className="mb-4">Please provide a reason for rejecting {selectedDonor?.name}'s registration:</p>
            
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full p-3 border rounded-lg mb-4 h-24 resize-none"
              required
            />
            
            <div className="flex gap-3">
              <button
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:bg-gray-400"
              >
                Confirm Reject
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                  setSelectedDonor(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
       <ToastContainer />
    </div>
  );
};

export default DashboardPage;


