import React from "react";

const DonorProfile = ({  }) => {
   const donor = {
    name: "Sudha Acharya",
    image: "", 
    email: "sudha@gmail.com",
    phone: "9802839409",
    address: "Kathmandu",
    bloodGroup: "A+",
    lastDonation: "12 May 2025",
    available: true,
    healthStatus: "Passed Checklist",
  }
  return (
    <div className="flex justify-center items-center px-4 min-h-screen bg-gray-200">
      <div className="flex flex-col bg-white shadow-md px-6 sm:px-10 py-10 rounded-xl w-full max-w-2xl">
        
        <div className="flex flex-col mb-2 ">
          <img
            src="./src/assets/img/A-.jpg" 
            alt="Donor Profile"
            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover shadow-md border-3 border-red-900"
          />
          <h2 className="text-xl md:text-2xl flex justify-center font-semibold text-blue-950">{donor.name}</h2>
          <p className="flex justify-center text-sm pb-3">Verified Blood Donor</p>

        </div>

      
          
          <div className="flex flex-col md:flex-row justify-between mt-4 mb-6 gap-6 text-black">

              <div className="flex-1 space-y-2 text-sm md:text-base">
                <h3 className="font-bold text-red-900 mb-2">Donor Information</h3>
              <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
              <p><strong>Last Donation:</strong> {donor.lastDonation}</p>
              <p><strong>Availability:</strong> {donor.available ? "Yes" : "No"}</p>
              <p><strong>Health Status:</strong> {donor.healthStatus}</p>
            </div>   

            <div className="flex-1 space-y-2 text-sm md:text-base">
               <h3 className="font-bold text-red-900 mb-2">Contact & Location</h3>
              <p><strong>Email:</strong> {donor.email}</p>
              <p><strong>Phone:</strong> {donor.phone}</p>
              <p><strong>Address:</strong> {donor.address}</p>
              
            </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 ">
            <button className="px-6 py-2 bg-gray-100 text-black rounded hover:bg-gray-200 transition text-sm md:text-base">Edit Profile </button>
            <button className="px-6 py-2 bg-blue-950 text-white rounded hover:bg-blue-900 transition text-sm md:text-base">Back to Dashboard </button>
            </div>

           
        
        
      </div>
    </div>
  );
};

export default DonorProfile;