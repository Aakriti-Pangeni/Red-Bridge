import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Clock, CheckCircle, XCircle, Phone, MapPin, Heart, Droplets, Calendar, MessageSquare } from 'lucide-react';
import MainLayout from '../shared/sidebar/mainlayout';

const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserRequests();
  }, []);

  const fetchUserRequests = async () => {
    try {
      const token = localStorage.getItem('authToken') || getCookie('authToken');
      
      if (!token) {
        toast.error('Please log in to view your requests');
        return;
      }

      const response = await fetch('http://localhost:4000/api/requests/user/sent', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      } else {
        toast.error('Failed to load your requests');
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Error loading requests');
    } finally {
      setLoading(false);
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        bg: 'bg-gradient-to-r from-yellow-400 to-orange-400',
        bgLight: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-800',
        icon: <Clock className="w-5 h-5" />,
        label: 'Pending Response',
        description: 'Waiting for donor to respond'
      },
      accepted: {
        bg: 'bg-gradient-to-r from-green-400 to-emerald-500',
        bgLight: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-800',
        icon: <CheckCircle className="w-5 h-5" />,
        label: 'Request Accepted',
        description: 'Donor has agreed to help!'
      },
      declined: {
        bg: 'bg-gradient-to-r from-red-900 to-red-700',
        bgLight: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-800',
        icon: <XCircle className="w-5 h-5" />,
        label: 'Request Declined',
        description: 'Donor is unable to help at this time'
      }
    };
    return configs[status] || configs.pending;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br mt-15 from-blue-50 to-indigo-50 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-950 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading your requests...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br mt-15 from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-950 to-blue-700 rounded-full mb-6 shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">My Blood Requests</h1>
            <p className="text-gray-600 text-lg">Track all your blood donation requests and their status</p>
            <div className="mt-6 inline-flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-md">
              <span className="text-gray-600">Total Requests:</span>
              <span className="font-bold text-2xl text-blue-950">{requests.length}</span>
            </div>
          </div>

          {requests.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">No Requests Yet</h3>
                <p className="text-gray-500 text-lg mb-6">You haven't made any blood donation requests yet.</p>
                <button
                  onClick={() => window.location.href = '/finddonor'}
                  className="px-6 py-3 bg-gradient-to-r from-blue-950 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-semibold"
                >
                  Find Donors Now
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-8">
              {requests.map((request) => {
                const statusConfig = getStatusConfig(request.status);
                
                return (
                  <div key={request._id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-blue-950 to-blue-700 p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Droplets className="w-8 h-8" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">Request to {request.donorId?.name}</h3>
                            <p className="text-blue-100 text-lg">Blood Group: {request.donorId?.bloodGroup}</p>
                          </div>
                        </div>
                        
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.bg} text-white shadow-lg`}>
                          {statusConfig.icon}
                          <span className="font-medium">{statusConfig.label}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-8">
                      {/* Donor Information */}
                      <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="flex items-center gap-3 bg-red-50 p-4 rounded-xl">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <Droplets className="w-5 h-5 text-red-900" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium">Blood Group</p>
                            <p className="text-red-900 font-bold text-lg">{request.donorId?.bloodGroup}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 bg-green-50 p-4 rounded-xl">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Phone className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium">Phone</p>
                            <p className="text-gray-800 font-semibold">{request.donorId?.phone}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-xl">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium">Location</p>
                            <p className="text-gray-800 font-semibold">{request.donorId?.address}</p>
                          </div>
                        </div>
                      </div>

                      {/* Status Alert */}
                      <div className={`${statusConfig.bgLight} ${statusConfig.border} border rounded-xl p-6 mb-8`}>
                        <div className="flex items-start gap-3">
                          <div className={statusConfig.text}>
                            {statusConfig.icon}
                          </div>
                          <div>
                            <h4 className={`font-semibold ${statusConfig.text} mb-1`}>{statusConfig.label}</h4>
                            <p className={statusConfig.text}>{statusConfig.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Your Message */}
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                        <div className="flex items-start gap-3">
                          <MessageSquare className="w-6 h-6 text-blue-950 mt-1" />
                          <div>
                            <h4 className="font-semibold text-blue-950 mb-2">Your Message</h4>
                            <p className="text-blue-700 leading-relaxed">
                              {request.message || 'No specific message provided - Emergency blood donation needed.'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Donor Response */}
                      {request.donorResponse && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                            <div>
                              <h4 className="font-semibold text-green-800 mb-2">Donor Response</h4>
                              <p className="text-green-700 leading-relaxed">{request.donorResponse}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Timestamps */}
                      <div className="flex justify-between items-center pt-6 border-t border-gray-200 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Requested: {new Date(request.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}</span>
                        </div>
                        {request.respondedAt && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>Responded: {new Date(request.respondedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default UserRequests;