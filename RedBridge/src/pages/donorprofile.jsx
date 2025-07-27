import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Droplets, User, AlertCircle, Clock, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../shared/sidebar/mainlayout';

const DonorProfile = () => {
  const [donorData, setDonorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDonorProfile();
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const fetchDonorProfile = async () => {
    try {
      const cookie = getCookie("userInfo");
      if (!cookie) {
        setError("Please log in to view your profile");
        setLoading(false);
        return;
      }

      let parsedUserInfo;
      try {
        parsedUserInfo = JSON.parse(decodeURIComponent(cookie));
      } catch (parseError) {
        parsedUserInfo = JSON.parse(cookie);
      }
      
      console.log('User Info from cookie:', parsedUserInfo);
      setUserInfo(parsedUserInfo);

      const userId = parsedUserInfo.id || parsedUserInfo._id || parsedUserInfo.userId;
      
      if (!userId) {
        console.error('No user ID found in cookie. Available fields:', Object.keys(parsedUserInfo));
        setError("Invalid session. Please log in again.");
        setLoading(false);
        return;
      }

      console.log('Fetching donor profile for userId:', userId);

      const response = await fetch(`http://localhost:4000/donor/user/${userId}`);
      
      if (response.status === 404) {
        console.log('User is not registered as a donor');
        setDonorData(null); // User hasn't registered as donor
      } else if (response.ok) {
        const data = await response.json();
        console.log('Donor data received:', data);
        setDonorData(data);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching donor profile:', error);
      setError("Failed to load donor profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900"></div>
        </div>
      </MainLayout>
    );
  }

  //  Check for pending status
  if (donorData && donorData.status === 'pending') {
    return (
      <MainLayout>
        <div className="max-w-2xl flex justify-center items-center min-h-screen mx-auto mt-20 p-6">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Registration Under Review</h2>
            <p className="text-gray-600 mb-6">
              Your donor registration is currently being reviewed by our admin team. 
             
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 text-sm">
                <strong>What happens next?</strong><br/>
                • Admin will review your registration details<br/>
                {/* • You'll receive an email notification about the decision<br/> */}
                • This usually takes 1-2 business days
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/home")}
                className="w-full px-6 py-3 bg-blue-950 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Back to Home
              </button>
              <button
                onClick={() => navigate('/userRequests')}
                className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                View My Blood Requests
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Check for rejected status
  if (donorData && donorData.status === 'rejected') {
    return (
      <MainLayout>
        <div className="max-w-2xl flex justify-center items-center min-h-screen mx-auto mt-20 p-6">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Registration Rejected</h2>
            <p className="text-gray-600 mb-4">
              Unfortunately, your donor registration was not approved by our admin team.
            </p>
            {donorData.rejectionReason && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 text-sm">
                  <strong>Reason for rejection:</strong><br/>
                  {donorData.rejectionReason}
                </p>
              </div>
            )}
            <div className="space-y-3">
              <button
                onClick={() => navigate('/register')}
                className="w-full px-6 py-3 bg-red-900 text-white rounded-lg hover:bg-red-700 transition"
              >
                Register Again
              </button>
              <button
                onClick={() => navigate("/home")}
                className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // User hasn't registered as donor yet
  if (!donorData && userInfo) {
    return (
      <MainLayout>
        <div className="max-w-2xl flex justify-center items-center min-h-screen mx-auto mt-20 p-6">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Not a Registered Donor</h2>
            <p className="text-gray-600 mb-6">
              Welcome, {userInfo.userName}! You haven't registered as a blood donor yet. 
              Would you like to register and help save lives?
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/register')}
                className="w-full px-6 py-3 bg-red-900 text-white rounded-lg hover:bg-red-700 transition"
              >
                Register as Donor
              </button>
              <button
                onClick={() => navigate('/userRequests')}
                className="w-full px-6 py-3 bg-blue-950 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                View My Blood Requests
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  //  Error state
  if (error) {
    return (
      <MainLayout>
        <div className="max-w-2xl mt-20 mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-900 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Profile</h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  //  Approved donor - show full profile (status === 'approved')
  return (
    <MainLayout>
      <div className="max-w-4xl mt-25 min-h-screen mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-900 to-red-700 text-white p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-red-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{donorData?.name}</h1>
                <p className="text-red-100">Verified Blood Donor</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                  ✓ Approved
                </span>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Personal Information
                </h2>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{donorData?.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{donorData?.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{donorData?.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{donorData?.address}</span>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Medical Information
                </h2>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Droplets className="w-5 h-5 text-red-900" />
                    <span className="text-gray-700">
                      Blood Group: <span className="font-semibold text-red-900">{donorData?.bloodGroup}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">
                      Last Donation: {donorData?.lastDonation ? new Date(donorData.lastDonation).toLocaleDateString() : 'Never'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 text-center text-gray-500">#</span>
                    <span className="text-gray-700">
                      Total Donations: {donorData?.donationCount || 0}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 text-center text-gray-500">📅</span>
                    <span className="text-gray-700">
                      Registered: {new Date(donorData?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Message for Approved Donors
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">
                🎉 <strong>Congratulations!</strong> Your donor registration has been approved. 
                You can now receive blood donation requests and help save lives!
              </p>
            </div> */}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate(`/editprofile/${donorData?._id}`)}
                className="px-6 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
              
              <button
                onClick={() => navigate('/donorRequests')}
                className="px-6 py-2 bg-red-900 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                View Blood Requests
              </button>

              <button
                onClick={() => navigate('/home')}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DonorProfile;