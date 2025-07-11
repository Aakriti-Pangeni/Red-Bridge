import React from 'react';
import { UserPlus, Mail, Phone, MapPin } from 'lucide-react';

const DonorsPage = () => {
  const donors = [
    { id: 1, name: 'Sudha Acharya', bloodType: 'B+', location: 'Nuwakot, Arghakhanchi', phone: '+977-9841234567', lastDonation: '2024-01-15', status: 'Available' },
    { id: 2, name: 'Aakriti Pangeni', bloodType: 'O+', location: 'Rampur, Palpa', phone: '+977-9841234568', lastDonation: '2024-02-20', status: 'Available' },
    { id: 3, name: 'Arzu Devkota', bloodType: 'A-', location: 'Butwal', phone: '+977-9841234569', lastDonation: '2024-03-10', status: 'Not Available' },
    { id: 4, name: 'Rakshya Bhusal', bloodType: 'A+', location: 'Kapilvastu', phone: '+977-9841234570', lastDonation: '2024-01-30', status: 'Available' },
    { id: 5, name: 'Sarad Bashyal', bloodType: 'B+', location: 'Tamnagar, Butwal', phone: '+977-9841234571', lastDonation: '2024-03-05', status: 'Available' },
    { id: 6, name: 'Alisha Poudel', bloodType: 'AB+', location: 'Tulsipur, Dang', phone: '+977-9841234572', lastDonation: '2024-02-28', status: 'Available' },
    { id: 7, name: 'Ram Sharma', bloodType: 'O-', location: 'Bardiya', phone: '+977-9841234572', lastDonation: '2024-02-28', status: 'Available' },
    { id: 8, name: 'Gita Acharya', bloodType: 'O+', location: 'Gulmi', phone: '+977-9841234572', lastDonation: '2024-02-28', status: 'Available' },
  ];

  return (
    <div className="bg-slate-800 rounded-lg shadow-sm p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Donors Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Donor
        </button>
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
              <tr key={donor.id} className="border-b border-slate-700 hover:bg-slate-700">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-medium text-sm">{donor.name.charAt(0)}</span>
                    </div>
                    <div>
                      <span className="font-medium text-white">{donor.name}</span>
                      <p className="text-sm text-gray-400">{donor.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-red-600 text-white px-2 py-1 rounded-full text-sm font-medium">
                    {donor.bloodType}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-300">{donor.location}</td>
                <td className="py-3 px-4 text-gray-300">{donor.lastDonation}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    donor.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {donor.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-slate-600">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="text-green-400 hover:text-green-300 p-1 rounded hover:bg-slate-600">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-slate-600">
                      <MapPin className="w-4 h-4" />
                    </button>
                  </div>
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