import React from 'react';
import { Heart, Mail, Phone } from 'lucide-react';

const ReceiversPage = () => {
  const receivers = [
    { id: 1, name: 'Sara Thapa', bloodType: 'O-', location: 'Kathmandu', phone: '+977-9841234571', urgency: 'High', requestDate: '2024-07-10' },
    { id: 2, name: 'Bikas Kafle', bloodType: 'A+', location: 'Lalitpur', phone: '+977-9841234572', urgency: 'Medium', requestDate: '2024-07-09' },
    { id: 3, name: 'Emma Sharma', bloodType: 'B-', location: 'Bhaktapur', phone: '+977-9841234573', urgency: 'Low', requestDate: '2024-07-08' },
    { id: 4, name: 'Aakrist Poudel', bloodType: 'AB+', location: 'Pokhara', phone: '+977-9841234574', urgency: 'High', requestDate: '2024-07-07' },
    { id: 5, name: 'Adhik K.c.', bloodType: 'O+', location: 'Kathmandu', phone: '+977-9841234575', urgency: 'Critical', requestDate: '2024-07-10' },
    { id: 6, name: 'Raj Thapa', bloodType: 'A-', location: 'Lalitpur', phone: '+977-9841234576', urgency: 'Medium', requestDate: '2024-07-09' },
  ];

  return (
    <div className="bg-slate-800 rounded-lg shadow-sm p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Blood Receivers</h2>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
          <Heart className="w-4 h-4 mr-2" />
          Add Request
        </button>
      </div>
      <div className="space-y-4">
        {receivers.map((receiver) => (
          <div key={receiver.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{receiver.bloodType}</span>
              </div>
              <div>
                <h3 className="font-medium text-white">{receiver.name}</h3>
                <p className="text-sm text-gray-400">{receiver.phone}</p>
                <p className="text-sm text-gray-400 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {receiver.location}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                receiver.urgency === 'Critical' ? 'bg-red-200 text-red-900' :
                receiver.urgency === 'High' ? 'bg-red-100 text-red-800' :
                receiver.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {receiver.urgency}
              </span>
              <p className="text-xs text-gray-400 mt-2">Requested: {receiver.requestDate}</p>
              <div className="flex items-center space-x-2 mt-2">
                <button className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-slate-500">
                  <Mail className="w-4 h-4" />
                </button>
                <button className="text-green-400 hover:text-green-300 p-1 rounded hover:bg-slate-500">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700">
                  Match Donor
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceiversPage;