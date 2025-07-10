import React from 'react';
import MainLayout from '../../shared/sidebar/mainlayout';


const bloodBanks = [
  {
    name: "NRCS District Blood Bank – Butwal",
    address: "Butwal, Rupandehi",
    contact: "071 541004",
    map: "https://www.google.com/maps/search/Butwal+NRCS+Blood+Bank"
  },
  {
    name: "Lumbini Provincial Hospital – Blood Transfusion Center",
    address: "Hospital Road, Butwal",
    contact: "071 540200",
    map: "https://www.google.com/maps/search/Lumbini+Provincial+Hospital"
  },
  {
    name: "NRCS District Blood Bank – Nepalgunj",
    address: "Nepalgunj, Banke",
    contact: "071 520174",
    map: "https://www.google.com/maps/search/Bheri+Hospital+Nepalgunj"
  },
  {
    name: "Bheri Hospital – Blood Bank Unit",
    address: "Bheri Hospital, Nepalgunj",
    contact: "081 534120",
    map: "https://www.google.com/maps/search/Bheri+Hospital+Nepalgunj"
  },
  {
    name: "Rapti Provincial Hospital – Blood Service, Tulsipur",
    address: "Tulsipur, Dang",
    contact: "082 520011",
    map: "https://www.google.com/maps/search/Rapti+Provincial+Hospital"
  },
  {
    name: "NRCS Blood Bank – Bardaghat, Nawalpur",
    address: "Bardaghat, Nawalpur",
    contact: "078 540418",
    map: "https://www.google.com/maps/search/Bardaghat,+Nawalpur"
  },
  {
    name: "Bardiya District Hospital – Gulariya, Bardiya",
    address: "Gulariya Municipality, Bardiya",
    contact: "084 421177",
    map: "https://www.google.com/maps/search/Bardiya+District+Hospital"
  },
  {
    name: "Universal College Hospital – Bhairahawa, Parasi",
    address: "Siddharthanagar (Bhairahawa), Parasi",
    contact: "071 522896",
    map: "https://www.google.com/maps/search/Universal+College+Hospital+Bhairahawa"
  },
  {
    name: "United Mission Hospital – Tansen, Palpa",
    address: "Tansen, Palpa",
    contact: "075 520111",
    map: "https://www.google.com/maps/search/United+Mission+Hospital+Tansen"
  },
  {
    name: "NRCS Blood Bank – Gulariya, Bardiya",
    address: "Gulariya Municipality-6, Bardiya",
    contact: "084 420835",
    map: "https://www.google.com/maps/search/Gulariya,+Bardiya"
  }
];

const BloodBank = () => {
  return (
    <>
    <MainLayout>
    <h1 className='text-2xl font-bold flex justify-center mt-20 '> Blood Bank Information</h1>
    <section className="flex flex-wrap justify-center gap-4 px-4 py-6">
        

      {bloodBanks.map((bank, index) => (
        <div key={index} className="shadow-lg bg-gray-100 rounded-xl w-80 p-4 hover:shadow-xl transition duration-300">
          <h2 className="text-red-900 font-semibold text-lg text-center mb-2">{bank.name}</h2>
          <p className="text-center text-sm">{bank.address}</p>
          <p className="text-center text-sm mt-1">Contact: {bank.contact}</p>
          <div className="flex justify-center mt-4">
            <a href={bank.map} target="_blank" rel="noopener noreferrer">
              <button className="bg-red-900 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-xl">
                Location
              </button>
            </a>
          </div>
        </div>
      ))}
      
    </section>
    </MainLayout>
    </>
  );
};

export default BloodBank;
