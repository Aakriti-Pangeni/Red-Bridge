


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import MainLayout from "../shared/sidebar/mainlayout";

// Helper to get cookie value by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}



const DonorProfile = () => {
  const navigate = useNavigate();
  const [donor, setDonor] = useState(null);
  const [donorId, setDonorId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get donorId from cookies (set after login)
    const idFromCookie = getCookie("userInfo");
    let parsed = null;
    try {
      parsed = idFromCookie ? JSON.parse(idFromCookie) : null;
    } catch (e) {
      parsed = null;
    }
    // console.log("Donor ID from cookie:", parsed?.id);
    if (parsed && parsed._id) {
      setDonorId(parsed._id);
    }
  }, []);

  useEffect(() => {
    if (!donorId) return;
    setLoading(true);
    setError(null);
    setDonor(null);

    // Use an IIFE for async/await
    (async () => {
      try {
        const res = await fetch(`http://localhost:4000/donor/profile/${donorId}`);
        if (!res.ok) {
          let errMsg = `Failed to fetch donor`;
          try {
            const errData = await res.json();
            if (errData && errData.message) errMsg = errData.message;
          } catch {}
          throw new Error(errMsg);
        }
        const data = await res.json();
        setDonor(data);
      } catch (err) {
        setError(err.message || "Unknown error");
        setDonor(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [donorId]);


   const isAvailable = (lastDonation) => {
    if (!lastDonation) return true; // No donation means available
    const lastDate = new Date(lastDonation);
    const now = new Date();
    const fourMonthsAgo = new Date();
    fourMonthsAgo.setMonth(now.getMonth() - 4);
    return lastDate < fourMonthsAgo;
  };


  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-4">Loading donor profile...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <NavLink to="/register">
              <button className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900">
                Register as Donor
              </button>
            </NavLink>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!donor) {
    return null;
  }

  return (
    <MainLayout>
      <div className="flex justify-center mt-15 items-center px-4 min-h-screen bg-gray-200">
        <div className="flex flex-col bg-white shadow-md px-6 sm:px-10 py-10 rounded-xl w-full max-w-2xl">
          {/* Profile Image & Name */}
          

            <div className="flex flex-col mb-2 items-center">
  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-red-900 text-white flex items-center justify-center text-xl font-semibold shadow-md">
    {donor.name?.split(' ')[0]} {/* First name */}
  </div>

            <h2 className="text-xl md:text-2xl font-semibold text-blue-950">
              {donor.name}
            </h2>
            <p className="text-sm pb-3">Verified Blood Donor</p>
          </div>

          {/* Donor Details Section */}
          <div className="flex flex-col md:flex-row justify-between mt-4 mb-6 gap-6 text-black">
            <div className="flex-1 space-y-2 text-sm md:text-base">
              <h3 className="font-bold text-red-900 mb-2">Donor Information</h3>
              <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
              <p><strong>Last Donation:</strong> {donor.lastDonation || "N/A"}</p> 
             <p><strong>Availability:</strong> {isAvailable(donor.lastDonation) ? "Yes" : "No"}</p>

              
            </div>

            <div className="flex-1 space-y-2 text-sm md:text-base">
              <h3 className="font-bold text-red-900 mb-2">Contact & Location</h3>
              <p><strong>Email:</strong> {donor.email}</p>
              <p><strong>Phone:</strong> {donor.phone}</p>
              <p><strong>Address:</strong> {donor.address}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="px-6 py-2 bg-gray-100 text-black rounded hover:bg-gray-200 transition text-sm md:text-base"
              onClick={() => navigate(`/editprofile/${donor._id}`)}
            >
              Edit Profile
            </button>
            <button
              className="px-6 py-2 bg-blue-950 text-white rounded hover:bg-blue-900 transition text-sm md:text-base"
              onClick={() => navigate("/home")}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DonorProfile;
