import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const OtpConfirmationPage = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e, index) {
    const { value } = e.target;
    
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  }

  function handleKeyDown(e, index) {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    // Add your OTP verification logic here
    console.log('OTP submitted:', otpString);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('OTP verified successfully!');
    }, 2000);
  }

  function handleResend() {
    setOtp(Array(6).fill(""));
    setError('');
    // Add resend OTP logic here
    console.log('Resending OTP...');
    alert('New OTP sent!');
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white shadow-md rounded-lg px-14 py-16 w-full max-w-md">
        <section className="flex justify-center">
          <FontAwesomeIcon icon={faEnvelope} className="text-2xl text-red-900" />
        </section>
        <h3 className="font-bold text-center mt-3 text-xl mb-3">Verify your email</h3>
        <section className="flex flex-col text-center text-black mb-4">
          <p>We've sent a 6-digit verification code to</p>
          <p>your email address. Please enter it below</p>
        </section>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <section className="text-center mb-4">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
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
            onClick={handleResend}
            disabled={loading}
            className={`font-medium transition ${
              loading
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:underline hover:text-blue-800'
            }`}
          >
            Resend Code
          </button>
        </section>
      </div>
    </main>
  );
};

export default OtpConfirmationPage;