

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const RegisterDonor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  

  const validate = () => {
    const newErrors = {};
    if (formData.name.trim().length < 4) newErrors.name = 'Name must be at least 4 characters';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Contact must be exactly 10 digits';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Please select gender';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Please select blood group';
    if (!formData.address.trim()) newErrors.address = 'Location is required';
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)
    )
      newErrors.password =
        'Password must be at least 8 characters and include letters and numbers';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    return newErrors;
  };




const handleSubmit = async (event) => {
  <ToastContainer/>
  event.preventDefault();

  const validationErrors = validate();
  setErrors(validationErrors);
  if (Object.keys(validationErrors).length > 0) return;

  try {
    const res = await fetch("http://localhost:4000/donor/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Registration failed");

    const data = await res.json(); 

    // Set cookies
    const setCookie = (name, value, days = 7) => {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
    };

    if (data.token) setCookie("authToken", data.token);
    if (data.donor) setCookie("userInfo", JSON.stringify(data.user));

    // Optional: also save to localStorage if your app reads from it
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    toast.success("Registration successful!");

    //  Redirect to home (logged in)
    window.location.href = "http://localhost:5173/login";
  } catch (err) {
    console.error("Donor registration error:", err);
    toast.error("There was a problem registering. Please try again.");
  }
};


  return (
    <section className='w-full flex flex-col p-7 justify-center items-center bg-gray-200 '>
      <div className="bg-white shadow-md rounded-lg px-8 py-5 w-full max-w-md ">
        <form onSubmit={handleSubmit} className="space-y-5">


      <div className="flex flex-col items-center">
            <img src="/bloodIcon.ico" alt="logo" className=" flex justify-center items-center h-10 w-10" /><span className="mb-3">RedBridge</span> 
</div>

          <h1 className='flex justify-center text-red-900 text-xl font-bold'>
            Donor Registration Form
          </h1>

          <div className='flex flex-col'>
            <label className='block text-sm font-medium mb-0.5'>Full Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your Full Name"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="text-red-600 text-xs">{errors.name}</span>}
          </div>

          

       
          
          <div className='flex flex-col'>
            <label className='block text-sm font-medium mb-0.5'>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="text-red-600 text-xs">{errors.email}</span>}
          </div>


             <div className='flex flex-col'>
            <label className='block text-sm font-medium mb-0.5'>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <span className="text-red-600 text-xs">{errors.phone}</span>}
          </div>

          <div className='flex flex-col'> 
            <label className='block text-sm font-medium mb-0.5'>Date Of Birth:</label>
            <input
              type="date"
              name="dob"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            {errors.dob && <span className="text-red-600 text-xs">{errors.dob}</span>}
          </div>

          <div className='flex gap-16'>
            <div className='flex flex-col'>
              <label htmlFor="gender" className="block text-sm font-medium mb-0.5">Gender:</label>
              <select
                id="gender"
                name="gender"
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Others'>Others</option>
              </select>
              {errors.gender && <span className="text-red-600 text-xs">{errors.gender}</span>}
            </div>

            <div className='flex flex-col'>
              <label htmlFor="bloodGroup" className="block text-sm font-medium mb-0.5">Blood Group:</label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
              >
                <option value="">Select Blood Group</option>
                <option value='A+'>A+</option>
                <option value='A-'>A-</option>
                <option value='B+'>B+</option>
                <option value='B-'>B-</option>
                <option value='AB+'>AB+</option>
                <option value='AB-'>AB-</option>
                <option value='O+'>O+</option>
                <option value='O-'>O-</option>
              </select>
              {errors.bloodGroup && <span className="text-red-600 text-xs">{errors.bloodGroup}</span>}
            </div>
          </div>

          <div className='flex flex-col'>
            <label className='block text-sm font-medium mb-0.5'>Address: (District/City):</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your District/City"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <span className="text-red-600 text-xs">{errors.address}</span>}
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

         
          <div className='flex justify-center'>
            <button
              type="submit"
              className="h-9 w-56 mt-3 bg-[#660000] hover:bg-[#800000] text-white font-medium py-2 rounded-2xl"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterDonor;



