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
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Replace with your actual backend URL
      const response = await fetch('http://localhost:4000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store token in cookie
        setCookie('authToken', data.token, 7) // Token expires in 7 days
        
        // Store user info if provided
        if (data.user) {
          setCookie('userInfo', JSON.stringify(data.user), 7)
        }

        // Reset form
        setFormData({ email: '', password: '' })
        
        // Redirect to dashboard or home page
        window.location.href = 'http://localhost:5173/' // Change this to your desired route
        
        // Show success message (optional)
        console.log('Login successful:', data.message)
        
      } else {
        // Handle error response
        setError(data.message || 'Login failed. Please try again.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-8"
      >
        <h1 className="text-2xl font-bold text-red-900 mb-6 text-center">
          Sign In
        </h1>

        {/* Error Message */}
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