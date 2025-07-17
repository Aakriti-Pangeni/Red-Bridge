
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Signup from './signup'

const Login = () => {
  const [formData, setFormData] = useState({
    role: '',
    email: '',
    password: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // localStorage.setItem('formData', JSON.stringify(formData))
    setFormData({ role: '', email: '', password: '' })
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

       
        {/* <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
          Select Role <span className="text-red-600">*</span>
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Role</option>
          <option value="Donor">Donor</option>
          <option value="Receiver">Receiver</option>
        </select> */}

       
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
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />

       
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
          className="w-full mb-2 p-2 border border-gray-300 rounded"
          required
        />

        
        <div className="text-sm text-blue-600 mb-6 cursor-pointer hover:underline"><NavLink to={"/forgotpassword"} className="hover:text-blue-600 text-blue-600 transition-colors hover:underline">
                      Forgot Password
                    </NavLink>
          
        </div>

       
        <button
          type="submit"
          className="w-full bg-red-900 text-white py-2 rounded hover:bg-red-800 transition"
        >
          Log In
        </button>

       
        <p className="text-sm text-center mt-4">
          Don't have an account? <NavLink to={"/signup"} className="hover:text-blue-600 text-blue-600 transition-colors hover:underline">
                      Sign Up
                    </NavLink>
          
        </p>
      </form>
    </section> 
  )
}

export default Login
