import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:4000/user/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        // Store email in localStorage for OTP verification
        localStorage.setItem('resetEmail', email);
        // Navigate to OTP verification page after 2 seconds
        setTimeout(() => {
          navigate('/verify-otp');
        }, 2000);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-200">
      <section className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md bg-[#fefcfb] px-6 py-10 rounded-xl shadow-lg">
          <div className="flex flex-col items-center">
            <img src="/bloodIcon.ico" alt="logo" className="h-16 w-16" />
            <span className="mb-3">RedBridge</span>
            <h2 className="text-xl font-bold mb-4">Forgot your password?</h2>
            <div className="flex flex-col items-center mb-4">
              <p className="">
                Don't worry! Resetting your password is easy. Just type
              </p>
              <p className="">
                in the email you registered to RedBridge.
              </p>
            </div>
          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 mb-4"
              placeholder="Enter your email address"
            />
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-2 mt-2 font-semibold rounded-md transition mb-4 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed text-gray-700' 
                  : 'bg-red-900 hover:bg-red-700 text-white'
              }`}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
          <p className="flex justify-center">
            Remembered your password? {" "}
            <NavLink className="text-blue-800 hover:underline pl-2" to={"/login"}>
              Sign In
            </NavLink>
          </p>
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;