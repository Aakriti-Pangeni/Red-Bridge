


import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MainLayout from "../shared/sidebar/mainlayout";

const DonorProfile = () => {
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Helper function to get cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  useEffect(() => {
    const checkDonorProfile = async () => {
      try {
        setLoading(true);
        
        // Get user info from cookie
        const userCookie = getCookie("userInfo");
        console.log("Raw userInfo cookie:", userCookie);
        
        if (!userCookie) {
          setError("Please log in to view profile");
          setLoading(false);
          return;
        }

        let userData;
        try {
          userData = JSON.parse(userCookie);
          console.log("Parsed user data:", userData);
          setUser(userData); // Store user data
        } catch (parseError) {
          console.error("Error parsing user cookie:", parseError);
          setError("Invalid session data. Please log in again.");
          setLoading(false);
          return;
        }

       // UPDATE the user ID extraction part (around line 48):

if (!userData._id && !userData.id) {
  console.error("No user ID found in cookie data. Available fields:", Object.keys(userData));
  setError("Invalid user session. Please log in again.");
  setLoading(false);
  return;
}

// ✅ Use whichever ID field is available
const userId = userData._id || userData.id;
console.log(`Looking for donor profile for user ID: ${userId}`);

// ✅ Then use userId in the fetch URL:
const response = await fetch(`http://localhost:4000/donor/user/${userId}`);
        if (response.status === 404) {
          // ✅ User exists but hasn't registered as donor yet
          console.log("No donor profile found for this user");
          setDonor(null);
          setError(null); // No error, just no donor profile yet
        } else if (!response.ok) {
          // ✅ Other errors (500, etc.)
          console.error("Server error:", response.status);
          setError("Failed to load donor profile. Please try again.");
        } else {
          // ✅ Success - donor profile found
          const donorData = await response.json();
          console.log("Donor data received:", donorData);
          setDonor(donorData);
          setError(null);
        }
        
      } catch (err) {
        console.error("Error checking donor profile:", err);
        setError("Failed to load profile information");
      } finally {
        setLoading(false);
      }
    };

    checkDonorProfile();
  }, []);

  const isAvailable = (lastDonation) => {
    if (!lastDonation) return true;
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
            <p className="text-gray-500 text-lg mb-4">Loading profile...</p>
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
            <NavLink to="/login">
              <button className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900">
                Go to Login
              </button>
            </NavLink>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Check for pending status
  if (donor && donor.status === 'pending') {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-yellow-600 text-2xl font-bold">⏳</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Registration Pending
            </h2>
            <p className="text-gray-600 mb-6">
              Your donor registration is currently under review by our admin team. 
            </p>
            <button
              onClick={() => navigate("/home")}
              className="px-6 py-3 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Check for rejected status
  if (donor && donor.status === 'rejected') {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl font-bold">❌</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Registration Rejected
            </h2>
            <p className="text-gray-600 mb-4">
              Unfortunately, your donor registration was not approved.
            </p>
            {donor.rejectionReason && (
              <p className="text-sm text-gray-500 mb-6">
                Reason: {donor.rejectionReason}
              </p>
            )}
            <button
              onClick={() => navigate("/home")}
              className="px-6 py-3 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  // ✅ User is logged in but hasn't registered as donor
  if (!donor && user) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl font-bold">!</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Welcome, {user.userName}!
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't registered as a blood donor yet. Would you like to become a donor and help save lives?
            </p>
            <div className="space-y-3">
              <NavLink to="/register">
                <button className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200">
                  Register as Blood Donor
                </button>
              </NavLink>
              <button
                onClick={() => navigate("/home")}
                className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // ✅ User has donor profile - show full donor profile
  return (
    <MainLayout>
      <div className="flex justify-center mt-15 items-center px-4 min-h-screen bg-gray-200">
        <div className="flex flex-col bg-white shadow-md px-6 sm:px-10 py-10 rounded-xl w-full max-w-2xl">
          
          <div className="flex flex-col mb-2 items-center">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-red-900 text-white flex items-center justify-center text-xl font-semibold shadow-md">
              {donor.name?.split(' ')[0]?.[0]}{donor.name?.split(' ')[1]?.[0]}
            </div>

            <h2 className="text-xl md:text-2xl font-semibold text-blue-950">
              {donor.name}
            </h2>
            
            {/* ✅ Show verified badge prominently */}
            {(donor.donationCount || 0) >= 2 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mt-2">
                ✓ Verified Donor
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-4 mb-6 gap-6 text-black">
            <div className="flex-1 space-y-2 text-sm md:text-base">
              <h3 className="font-bold text-red-900 mb-2">Donor Information</h3>
              <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
              <p><strong>Last Donation:</strong> {donor.lastDonation || "N/A"}</p>
              <p><strong>Availability:</strong> {isAvailable(donor.lastDonation) ? "Yes" : "No"}</p>
              <p><strong>Donations Made:</strong> {donor.donationCount || 0}</p>
              <p><strong>Status:</strong> 
                {(donor.donationCount || 0) >= 2 ? (
                  <span className="text-green-600 font-semibold">✓ Verified Donor</span>
                ) : (
                  <span className="text-gray-600">Regular Donor</span>
                )}
              </p>
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