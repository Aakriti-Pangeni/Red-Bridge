import React, { useState } from "react"
import Login from "./login"
import { NavLink } from "react-router-dom"

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName:'',
    email: '',
    phonenumber:'',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validate = () => {
    const newErrors = {}
    if(formData.fullName.length <= 2){
      newErrors.fullName ="Please enter your Full Name"
    }
    
    if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email'
    }
    
        if(formData.phonenumber.length != 10){
          newErrors.phonenumber ="Phone Number must be 10 digits"
        }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    event.preventDefault()

    if (!validate()) return

    localStorage.setItem('signupData', JSON.stringify(formData))
    // alert('Account created successfully!')

    setFormData({
      fullName:'',
      email: '',
      phonenumber:'',
      password: '',
      confirmPassword: ''
    })

    setErrors({})
  }

  return (
   
    <section className="flex justify-center items-center  min-h-screen bg-gray-200 px-4">
   
      <div className="bg-white shadow-md rounded-lg px-8 py-10 w-full max-w-md">
        

        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-2xl font-bold mb-6 text-center text-red-900">Create Account</h2>

          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

           <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="number"
              name="phonenumber"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none"
              value={formData.phonenumber}
              onChange={handleChange}
              required
            />
            {errors.phonenumber && <p className="text-red-600 text-sm mt-1">{errors.phonenumber}</p>}
          </div>


          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

         
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

         
          <button
            type="submit"
            className="w-full bg-red-900 hover:bg-red-800 text-white font-medium py-2 rounded"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account? <NavLink to={"/login"} className="hover:text-cyan-500 transition-colors hover:underline text-blue-600">Login</NavLink>
          
        </p>
      </div>
      </section>
 
  )
}

export default Signup
