import React, { useState } from 'react';
import MainLayout from '../shared/sidebar/mainlayout';

const donorData = [
    { id: 1, name: 'Sudha Acharya', address: 'Nuwakot , Arghakhanchi', bloodGroup: 'B+' },
    { id: 2, name: 'Aakriti Pangeni', address: 'Rampur , Palpa', bloodGroup: 'O+' },
    { id: 3, name: 'Arzu Devkota', address: 'Butwal , Rupandehi', bloodGroup: 'A-' },
    { id: 4, name: 'Rakshya Bhushal', address: '4 no. , Kapilbastu', bloodGroup: 'A+' },
    { id: 5, name: 'Sarad Bashyal', address: 'Butwal , Rupandehi', bloodGroup: 'B+' },
    { id: 6, name: 'Alisha Poudel', address: 'Tulsipur, Dang', bloodGroup: 'AB+' },
];

const FindDonor = () => {
    const [searchLocation, setSearchLocation] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');

    const filteredDonors = donorData.filter((donor) =>
        donor.address.toLowerCase().includes(searchLocation.trim().toLowerCase()) &&
        (selectedGroup === '' || donor.bloodGroup === selectedGroup)
    );

    return (
        <>
        <MainLayout>
        <div className="px-4 py-8 mx-auto min-h-screen bg-gray-200">
            <div className="text-center mt-15 mb-6">
                <img src="bloodIcon.ico" alt="avatar" className="w-16 mx-auto mb-2" />
                <h1 className="text-2xl font-semibold text-red-900">Donors Lists</h1>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center bg-white p-6 rounded-xl gap-4 mb-2">
                <input
                    type="text"
                    placeholder="Search Location"
                    className="px-4 py-2 bg-white border rounded-lg shadow-sm w-64 focus:outline-none"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                />

                <select
                    className="px-4 py-2 bg-white border rounded-lg shadow-sm w-44 focus:outline-none"
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
                <table className="w-full table-auto border-collapse bg-white rounded-lg shadow">
                    <thead>
                        <tr className="bg-red-900 text-white text-sm">
                            <th className="p-2 border">S.N</th>
                            <th className="p-2 border">Donor Name</th>
                            <th className="p-2 border">Address</th>
                            <th className="p-2 border">Blood Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDonors.length > 0 ? (
                            filteredDonors.map((donor, index) => (
                                <tr key={donor.id} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}>
                                    <td className="p-2 text-center border">{index + 1}.</td>
                                    <td className="p-2 border cursor-pointer">{donor.name}</td>
                                    <td className="p-2 border">{donor.address}</td>
                                    <td className="p-2 border font-semibold">{donor.bloodGroup}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center p-4 text-gray-500">No donors found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
                        </MainLayout>
        </>
    );
};

export default FindDonor;
