import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    const resetToken = localStorage.getItem('resetToken');
    if (!resetToken) {
      navigate('/forgotpassword');
      return;
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.newPassword || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    const passwordError = validatePassword(formData.newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const resetToken = localStorage.getItem('resetToken');
      
      const response = await fetch('http://localhost:4000/user/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resetToken,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        
        localStorage.removeItem('resetToken');
        
        // Show success message and redirect
        alert('Password reset successfully! You can now login with your new password.');
        navigate('/login');
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      console.error('Reset password error:', err);
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
            <h2 className="text-xl font-bold mb-4">Reset your password</h2>
            <div className="flex flex-col items-center mb-4">
              <p className="text-center text-gray-600">
                Enter your new password below
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* New Password Field */}
            <div className="relative mb-4">
              <label htmlFor="newPassword" className="block mb-2 font-medium">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 pr-10"
                placeholder="Enter new password"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-sm text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="relative mb-6">
              <label htmlFor="confirmPassword" className="block mb-2 font-medium">
                Confirm New Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 pr-10"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-sm text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(prev => !prev)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="mb-4 text-sm text-gray-600">
              <p className="font-medium mb-1">Password must contain:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>At least 8 characters</li>
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
              </ul>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-2 font-semibold rounded-md transition mb-4 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed text-gray-700' 
                  : 'bg-red-900 hover:bg-red-700 text-white'
              }`}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          <div className="text-center">
            <NavLink 
              className="text-blue-800 hover:underline text-sm" 
              to={"/login"}
            >
              ← Back to Sign In
            </NavLink>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
