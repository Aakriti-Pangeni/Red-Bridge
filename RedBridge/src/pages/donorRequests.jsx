import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Clock, CheckCircle, XCircle, Phone, Mail, User, Heart, MessageSquare, Calendar } from 'lucide-react';
import MainLayout from '../shared/sidebar/mainlayout';

const DonorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [respondingTo, setRespondingTo] = useState(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetchDonorRequests();
  }, []);

  const fetchDonorRequests = async () => {
    try {
      const token = localStorage.getItem('authToken') || getCookie('authToken');
      
      if (!token) {
        toast.error('Please log in to view requests');
        return;
      }

      const response = await fetch('http://localhost:4000/api/requests/donor/received', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      } else {
        toast.error('Failed to load requests');
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

  const handleRespond = async (requestId, status) => {
    try {
      const token = localStorage.getItem('authToken') || getCookie('authToken');
      
      const res = await fetch(`http://localhost:4000/api/requests/${requestId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status,
          response: response.trim() || (status === 'accepted' ? 'Request accepted' : 'Request declined')
        })
      });

      if (res.ok) {
        toast.success(`Request ${status} successfully`);
        setRequests(requests.map(req => 
          req._id === requestId 
            ? { ...req, status, donorResponse: response.trim() || (status === 'accepted' ? 'Request accepted' : 'Request declined'), respondedAt: new Date() }
            : req
        ));
        setRespondingTo(null);
        setResponse('');
      } else {
        toast.error('Failed to respond to request');
      }
    } catch (error) {
      console.error('Error responding to request:', error);
      toast.error('Error responding to request');
    }
  };

  const getStatusBadge = (status) => {
    const configs = {
      pending: {
        bg: 'bg-gradient-to-r from-yellow-400 to-orange-400',
        text: 'text-white',
        icon: <Clock className="w-4 h-4" />,
        label: 'Pending'
      },
      accepted: {
        bg: 'bg-gradient-to-r from-green-400 to-emerald-500',
        text: 'text-white',
        icon: <CheckCircle className="w-4 h-4" />,
        label: 'Accepted'
      },
      declined: {
        bg: 'bg-gradient-to-r from-red-900 to-red-700',
        text: 'text-white',
        icon: <XCircle className="w-4 h-4" />,
        label: 'Declined'
      }
    };

    const config = configs[status] || configs.pending;

    return (
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.bg} ${config.text} shadow-lg`}>
        {config.icon}
        <span className="font-medium">{config.label}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-200 border-t-red-900 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading your requests...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br mt-15 from-red-50 via-pink-50 to-purple-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-900 to-red-700 rounded-full mb-6 shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">Blood Donation Requests</h1>
            <p className="text-gray-600 text-lg">Help save lives by responding to blood donation requests</p>
            <div className="mt-6 inline-flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-md">
              <span className="text-gray-600">Total Requests:</span>
              <span className="font-bold text-2xl text-red-900">{requests.length}</span>
            </div>
          </div>

          {requests.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">No Requests Yet</h3>
                <p className="text-gray-500 text-lg">You haven't received any blood donation requests yet.</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-8">
              {requests.map((request) => (
                <div key={request._id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-red-900 to-red-700 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <User className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">Request from {request.userId?.name}</h3>
                          <p className="text-red-100 text-lg">Needs your help to save a life</p>
                        </div>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-8">
                  

                    {/* Contact Information */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-950" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Name</p>
                          <p className="text-gray-800 font-semibold">{request.userId?.userName || request.userId?.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Mail className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Email</p>
                          <p className="text-gray-800 font-semibold">{request.userId?.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Phone className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Phone</p>
                          <p className="text-gray-800 font-semibold">{request.userId?.phonenumber || request.userId?.phone}</p>
                        </div>
                      </div>
                    </div>



                    {/* Message Section */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="w-6 h-6 text-blue-950 mt-1" />
                        <div>
                          <h4 className="font-semibold text-blue-950 mb-2">Request Message</h4>
                          <p className="text-blue-700 leading-relaxed">
                            {request.message || 'No specific message provided - Emergency blood donation needed.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Response Section for Pending Requests */}
                    {request.status === 'pending' && (
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-6">
                        {respondingTo === request._id ? (
                          <div className="space-y-6">
                            <h4 className="text-xl font-bold text-gray-800 mb-4">Respond to this request</h4>
                            <textarea
                              value={response}
                              onChange={(e) => setResponse(e.target.value)}
                              placeholder="Write your response message (optional)..."
                              className="w-full p-4 border-2 border-gray-300 rounded-xl text-gray-700 focus:border-red-900 focus:outline-none transition-colors resize-none"
                              rows="4"
                            />
                            <div className="flex gap-4">
                              <button
                                onClick={() => handleRespond(request._id, 'accepted')}
                                className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg shadow-lg"
                              >
                                <CheckCircle className="w-6 h-6" />
                                Accept Request
                              </button>
                              <button
                                onClick={() => handleRespond(request._id, 'declined')}
                                className="flex-1 px-6 py-4 bg-gradient-to-r from-red-900 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg shadow-lg"
                              >
                                <XCircle className="w-6 h-6" />
                                Decline Request
                              </button>
                              <button
                                onClick={() => {
                                  setRespondingTo(null);
                                  setResponse('');
                                }}
                                className="px-6 py-4 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-all duration-300 font-semibold"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <h4 className="text-xl font-bold text-gray-800 mb-4">This request needs your response</h4>
                            <button
                              onClick={() => setRespondingTo(request._id)}
                              className="px-8 py-4 bg-gradient-to-r from-blue-950 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-semibold text-lg shadow-lg"
                            >
                              Respond to Request
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Response Display */}
                    {request.donorResponse && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                          <div>
                            <h4 className="font-semibold text-green-800 mb-2">Your Response</h4>
                            <p className="text-green-700 leading-relaxed">{request.donorResponse}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Timestamps */}
                    <div className="flex justify-between items-center pt-6 border-t border-gray-200 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Received: {new Date(request.createdAt).toLocaleDateString('en-US', {
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
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DonorRequests;