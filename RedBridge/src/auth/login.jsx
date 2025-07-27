import React, { useState } from 'react'


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  // Function to set cookie
  const setCookie = (name, value, days = 7) => {
    const expires = new Date()
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;samesite=strict`
  }




const handleSubmit = async (event) => {
  event.preventDefault()
  setLoading(true)
  setError('')

  try {
    console.log('Attempting login for:', formData.email);
    
    
    let response = await fetch('http://localhost:4000/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      }),
    });

    let data = await response.json();
    
    if (response.ok) {
      console.log(' Admin login successful');
      
      // Store admin data
      const adminInfo = {
        _id: data.admin.id,
        id: data.admin.id,
        name: data.admin.name,
        userName: data.admin.name, 
        email: data.admin.email,
        role: 'admin',
        token: data.token
      };
      
      localStorage.setItem('authToken', data.token);
      setCookie('authToken', data.token, 7);
      localStorage.setItem('userInfo', JSON.stringify(adminInfo));
      setCookie('userInfo', JSON.stringify(adminInfo), 7);
      
      window.location.href = 'http://localhost:5174/dashboard';
      return;
    }
    
   
    console.log('Admin login failed, trying user login...');
    
    response = await fetch('http://localhost:4000/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      }),
    });

    data = await response.json();

    if (response.ok) {
      console.log(' User login successful', data);
      
     
      const userInfo = {
        _id: data.user._id,
        id: data.user._id,
        userName: data.user.userName,
        name: data.user.userName,
        email: data.user.email,
        phonenumber: data.user.phonenumber,
        role: data.user.role || 'user',
        token: data.token
      };
      
      localStorage.setItem('authToken', data.token);
      setCookie('authToken', data.token, 7);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      setCookie('userInfo', JSON.stringify(userInfo), 7);
      
      setFormData({ email: '', password: '' });
      window.location.href = '/';
    } else {
      setError('Invalid email or password');
    }

  } catch (err) {
    console.error('Login error:', err);
    setError('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
}


  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-200 px-4">
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-8"
      >
      
      <div className="flex flex-col items-center">
            <img src="/bloodIcon.ico" alt="logo" className=" flex justify-center items-center h-10 w-10" /><span className="mb-3">RedBridge</span> 
</div>
        <h1 className="text-2xl font-bold text-red-900 mb-6 text-center">
          Sign In
        </h1>

        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Email Field */}
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          required
          disabled={loading}
        />

        {/* Password Field */}
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password <span className="text-red-600">*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          required
          disabled={loading}
        />

        {/* Forgot Password Link */}
        <div className="text-sm text-blue-600 mb-6">
          <a 
            href="/forgotpassword" 
            className="hover:text-blue-800 transition-colors hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded transition ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-red-900 hover:bg-red-800'
          } text-white`}
        >
          {loading ? 'Signing In...' : 'Log In'}
        </button>

        {/* Sign Up Link */}
        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <a 
            href="/signup" 
            className="text-blue-600 hover:text-blue-800 transition-colors hover:underline"
          >
            Sign Up
          </a>
        </p>
      </form>
    </section> 
  )
}

export default Login