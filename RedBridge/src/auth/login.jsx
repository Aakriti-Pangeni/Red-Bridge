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





//   const handleSubmit = async (event) => {
//   event.preventDefault()
//   setLoading(true)
//   setError('')

//   try {
//     const response = await fetch('http://localhost:4000/user/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: formData.email,
//         password: formData.password
//       }),
//     })


//     ///
// // localStorage.setItem("token", data.token);
// ////


//     const data = await response.json()

//     if (response.ok) {
//       // Store token in cookie
//       setCookie('authToken', data.token, 7)

//       // Store user info if provided
//       if (data.user) {
//         setCookie('userInfo', JSON.stringify(data.user), 7)
//       }

//       // Reset form
//       setFormData({ email: '', password: '' })

//       // ✅ Redirect based on role
//       if (data.user && data.user.role === 'admin') {
//         window.location.href = 'http://localhost:5174/'
//       } else {
//         window.location.href = 'http://localhost:5173/'
//       }

//       // Optional success message
//       console.log('Login successful:', data.message)
//     } else {
//       setError(data.message || 'Login failed. Please try again.')
//     }
//   } catch (err) {
//     console.error('Login error:', err)
//     setError('Network error. Please check your connection and try again.')
//   } finally {
//     setLoading(false)
//   }


// REPLACE your current handleSubmit function with this:

// const handleSubmit = async (event) => {
//   event.preventDefault()
//   setLoading(true)
//   setError('')

//   try {
//     console.log('Attempting login for:', formData.email);
    
//     // ✅ STEP 1: Try admin login FIRST
//     let response = await fetch('http://localhost:4000/admin/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: formData.email,
//         password: formData.password
//       }),
//     });

//     let data = await response.json();
    
//     // ✅ If admin login successful
//     if (response.ok) {
//       console.log('✅ Admin login successful');
      
//       // Store token and admin info
//       setCookie('authToken', data.token, 7);
//       localStorage.setItem('authToken', data.token);
      
//       const adminInfo = {
//         name: data.admin.name,
//         email: data.admin.email,
//         role: 'admin',
//         token: data.token
//       };
      
//       setCookie('userInfo', JSON.stringify(adminInfo), 7);
//       localStorage.setItem('userInfo', JSON.stringify(adminInfo));
      
//       // Reset form
//       setFormData({ email: '', password: '' });
      
//       console.log('Redirecting to admin dashboard...');
//       // ✅ Redirect to admin dashboard
//       window.location.href = 'http://localhost:5174/dashboard';
//       return;
//     }
    
//     // ✅ STEP 2: If admin login failed, try regular user login
//     console.log('Admin login failed, trying user login...');
    
//     response = await fetch('http://localhost:4000/user/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: formData.email,
//         password: formData.password
//       }),
//     });

//     data = await response.json();

//     if (response.ok) {
//       console.log('✅ User login successful');
      
//       // Store token and user info
//       setCookie('authToken', data.token, 7);
//       localStorage.setItem('authToken', data.token);
      
//       const userInfo = {
//         name: data.user.userName || data.user.name,
//         email: data.user.email,
//         role: 'user',
//         token: data.token
//       };
      
//       setCookie('userInfo', JSON.stringify(userInfo), 7);
//       localStorage.setItem('userInfo', JSON.stringify(userInfo));
      
//       // Reset form
//       setFormData({ email: '', password: '' });
      
//       console.log('Redirecting to main app...');
//       // ✅ Redirect to main app
//       window.location.href = 'http://localhost:5173/';
//     } else {
//       // ✅ Both admin and user login failed
//       console.error('Both login attempts failed');
//       setError('Invalid email or password. Please try again.');
//     }

//   } catch (err) {
//     console.error('Login error:', err);
//     setError('Network error. Please check your connection and try again.');
//   } finally {
//     setLoading(false);
//   }
// }


// UPDATE your handleSubmit function where you store user data:

const handleSubmit = async (event) => {
  event.preventDefault()
  setLoading(true)
  setError('')

  try {
    console.log('Attempting login for:', formData.email);
    
    // ✅ Try admin login first
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
      console.log('✅ Admin login successful');
      
      // Store admin data
      const adminInfo = {
        _id: data.admin.id,       // ✅ Include _id
        id: data.admin.id,        // ✅ Include id
        name: data.admin.name,
        userName: data.admin.name, // ✅ Add userName for compatibility
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
    
    // ✅ Try user login
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
      console.log('✅ User login successful', data);
      
      // ✅ Store user data with proper structure
      const userInfo = {
        _id: data.user._id,           // ✅ Include _id at top level
        id: data.user._id,            // ✅ Also include id
        userName: data.user.userName,  // ✅ Include userName
        name: data.user.userName,      // ✅ Also include name
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