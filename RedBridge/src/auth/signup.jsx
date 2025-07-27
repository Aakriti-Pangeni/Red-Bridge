import React, { useState } from "react"
import Login from "./login"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phonenumber: '',
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const validate = () => {
    const newErrors = {}

    if (formData.userName.length <= 2) {
      newErrors.userName = "Please enter your Full Name"
    }

    if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email'
    }

    if (formData.phonenumber.length != 10) {
      newErrors.phonenumber = "Phone Number must be 10 digits"
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    try {
      const { userName, email, phonenumber, password } = formData;

      const res = await fetch("http://localhost:4000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, phonenumber, password })
      });

      if (!res.ok) throw new Error("Signup failed");

      const data = await res.json(); // Should return { user, token }

      // Set cookies like in login
      const setCookie = (name, value, days = 7) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
      };

      if (data.token) setCookie("authToken", data.token);
      if (data.user) setCookie("userInfo", JSON.stringify(data.user));

      // Reset form
      setFormData({
        userName: '',
        email: '',
        phonenumber: '',
        password: '',
        confirmPassword: ''
      });
<ToastContainer/>
      setErrors({});
      toast.success("User registered successfully!");

      // Redirect to homepage
      // window.location.href = "http://localhost:5173/";

      window.location.href = "http://localhost:5173/login";
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("There was a problem registering.");
    }
  };



  return (

    <section className="flex justify-center items-center  min-h-screen  bg-gray-200 px-4">

      <div className="bg-white shadow-md rounded-lg px-8 py-10 mt-5 mb-5 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img src="/bloodIcon.ico" alt="logo" className=" flex justify-center items-center h-10 w-10" /><span className="mb-3">RedBridge</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-2xl font-bold mb-6 text-center text-red-900">Create Account</h2>

          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="userName"
              placeholder="Enter Full Name"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none"
              value={formData.userName}
              onChange={handleChange}
              required
            />
            {errors.userName && <p className="text-red-600 text-sm mt-1">{errors.userName}</p>}
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
              type="tel"
              name="phonenumber"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none"
              value={formData.phonenumber}
              onChange={handleChange}
              required
            />
            {errors.phonenumber && <p className="text-red-600 text-sm mt-1">{errors.phonenumber}</p>}
          </div>



          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none pr-10"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-8 text-sm text-gray-500"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="relative mt-4">
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter your password"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none pr-10"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-8 text-sm text-gray-500"
              onClick={() => setShowConfirmPassword(prev => !prev)}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
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
