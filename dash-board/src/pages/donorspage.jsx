import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import axios from 'axios';


const DonorsPage = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get('http://localhost:4000/donor'); 
        setDonors(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donors:', error);
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  // Delete donor by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/donor/${id}`);
      setDonors(donors.filter((donor) => donor._id !== id));
    } catch (error) {
      console.error('Error deleting donor:', error);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="bg-slate-800 rounded-lg shadow-sm p-6 border border-slate-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Donors Management</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 px-4 font-medium text-gray-400">Donor</th>
              <th className="text-left py-3 px-4 font-medium text-gray-400">Blood Type</th>
              <th className="text-left py-3 px-4 font-medium text-gray-400">Location</th>
              <th className="text-left py-3 px-4 font-medium text-gray-400">Last Donation</th>
              <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor._id} className="border-b border-slate-700 hover:bg-slate-700">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-medium text-sm">{donor.name?.charAt(0)}</span>
                    </div>
                    <div>
                      <span className="font-medium text-white">{donor.name}</span>
                      <p className="text-sm text-gray-400">{donor.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-red-600 text-white px-2 py-1 rounded-full text-sm font-medium">
                    {donor.bloodGroup}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-300">{donor.address}</td>
                <td className="py-3 px-4 text-gray-300">{donor.lastDonation || 'N/A'}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    !donor.lastDonation || new Date(donor.lastDonation) <= new Date(new Date().setMonth(new Date().getMonth() - 4))
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {
                      !donor.lastDonation || new Date(donor.lastDonation) <= new Date(new Date().setMonth(new Date().getMonth() - 4))
                        ? 'Available'
                        : 'Not Available'
                    }
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(donor._id)}
                    className="text-red-500 hover:text-red-300 p-1 rounded hover:bg-slate-600"
                    title="Delete donor"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonorsPage;
