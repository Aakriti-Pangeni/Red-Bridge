import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem('resetEmail');
    if (!storedEmail) {
      navigate('/forgotpassword');
      return;
    }
    setEmail(storedEmail);
  }, [navigate]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:4000/user/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email,
          otp: otpString 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store reset token for password reset
        localStorage.setItem('resetToken', data.resetToken);
        localStorage.removeItem('resetEmail'); 
        navigate('/reset-password');
      } else {
        setError(data.message || 'Invalid OTP');
        // Clear OTP inputs on error
        setOtp(Array(6).fill(""));
        document.getElementById('otp-0')?.focus();
      }
    } catch (err) {
      console.error('Verify OTP error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setResendMessage('');
    setError('');

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
        setResendMessage('New OTP sent successfully!');
        setOtp(Array(6).fill(""));
        document.getElementById('otp-0')?.focus();
      } else {
        setError(data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      console.error('Resend OTP error:', err);
      setError('Network error. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const maskedEmail = email.replace(/(.{2}).*(@.*)/, '$1***$2');

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white shadow-md rounded-lg px-14 py-16 w-full max-w-md">
        <section className="flex justify-center">
          <FontAwesomeIcon icon={faEnvelope} className="text-2xl text-red-900" />
        </section>
        <h3 className="font-bold text-center mt-3 text-xl mb-3">Verify your email</h3>
        <section className="flex flex-col text-center text-black mb-4">
          <p>We've sent a 6-digit verification code to</p>
          <p className="font-semibold">{maskedEmail}</p>
          <p>Please enter it below</p>
        </section>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {resendMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
            {resendMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <section className="text-center mb-4">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={loading}
                className="m-0.5 mb-2 w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-900 focus:border-red-900"
              />
            ))}
          </section>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-3 py-2 rounded transition mb-3 font-semibold ${
              loading
                ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                : 'bg-red-900 hover:bg-red-800 text-white'
            }`}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <section className="text-center">
          <p className="text-black mb-2">Didn't receive the code?</p>
          <button
            onClick={handleResendOTP}
            disabled={resendLoading}
            className={`font-medium transition ${
              resendLoading
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:underline hover:text-blue-800'
            }`}
          >
            {resendLoading ? 'Sending...' : 'Resend Code'}
          </button>
        </section>

        <div className="text-center mt-4">
          <NavLink 
            to="/forgotpassword" 
            className="text-sm text-gray-600 hover:text-gray-800 hover:underline"
          >
            ← Back to Forgot Password
          </NavLink>
        </div>
      </div>
    </main>
  );
};

export default VerifyOTP;
