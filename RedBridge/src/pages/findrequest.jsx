import React, { useState } from 'react';
import MainLayout from '../shared/sidebar/mainlayout';

const donorData = [
    { id: 1, name: 'Sudha Acharya', address: 'Nuwakot , Arghakhanchi', phone: '9847102937', bloodGroup: 'B+' },
    { id: 2, name: 'Aakriti Pangeni', address: 'Rampur , Palpa', phone: '9847234938', bloodGroup: 'O+' },
    { id: 3, name: 'Arzu Devkota', address: 'Butwal , Rupandehi', phone: '9847102408', bloodGroup: 'A-' },
    { id: 4, name: 'Rakshya Bhushal', address: '4 no. , Kapilbastu', phone: '9847109840', bloodGroup: 'A+' },
    { id: 5, name: 'Sarad Bashyal', address: 'Butwal , Rupandehi', phone: '9847058378', bloodGroup: 'B+' },
    { id: 6, name: 'Alisha Poudel', address: 'Tulsipur, Dang', phone: '9847167937', bloodGroup: 'AB+' },
    { id: 7, name: 'Ram Sharma', address: 'Bardiya', phone: '9847111222', bloodGroup: 'A+' },
    { id: 8, name: 'Gita Acharya', address: 'Gulmi', phone: '9847004567', bloodGroup: 'AB-' },
];

const FindDonorWithRequest = () => {
    const [searchLocation, setSearchLocation] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');

    const filteredDonors = donorData.filter((donor) =>
        donor.address.toLowerCase().includes(searchLocation.trim().toLowerCase()) &&
        (selectedGroup === '' || donor.bloodGroup === selectedGroup)
    );

    return (
        <MainLayout>
            <div className="px-4 py-8 mx-auto min-h-screen mt-18 bg-gray-100">
                <div className="text-center mb-6">
                    <img src="bloodIcon.ico" alt="avatar" className="w-16 mx-auto mb-2" />
                    <h1 className="text-2xl font-bold text-red-800">Donors Lists</h1>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center bg-white p-6 rounded-xl gap-4 mb-4 shadow">
                    <input
                        type="text"
                        placeholder="Search Location"
                        className="px-4 py-2 border rounded-lg w-64 focus:outline-none shadow-sm"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                    />
                    <select
                        className="px-4 py-2 border rounded-lg w-44 focus:outline-none shadow-sm"
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                    >
                        <option value="">Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded-lg shadow border-collapse table-auto">
                        <thead>
                            <tr className="bg-red-900 text-white text-sm">
                                <th className="p-3 border">S.N</th>
                                <th className="p-3 border">Donor Name</th>
                                <th className="p-3 border">Address</th>
                                <th className="p-3 border">Phone Number</th>
                                <th className="p-3 border">Blood Group</th>
                                <th className="p-3 border">Send a Request</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDonors.length > 0 ? (
                                filteredDonors.map((donor, index) => (
                                    <tr key={donor.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                        <td className="p-2 text-center border">{index + 1}.</td>
                                        <td className="p-2 border">{donor.name}</td>
                                        <td className="p-2 border">{donor.address}</td>
                                        <td className="p-2 border  font-medium">{donor.phone}</td>
                                        <td className="p-2 border font-semibold">{donor.bloodGroup}</td>
                                        <td className="p-2 border text-center">
                                            <button className="px-4 py-1 rounded-lg bg-blue-950 text-white hover:bg-blue-900 transition text-sm shadow">
                                                Request
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center p-4 text-gray-500">
                                        No donors found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
};

export default FindDonorWithRequest;
