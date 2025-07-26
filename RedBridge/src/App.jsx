import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './shared/navbar/navbar'
import Welcome from './components/section/welcome'
import Home from './pages/home'
// import Card from './components/section/card'
import About from './pages/about'
import WhyUse from './components/section/whyuse'
import Footer from './shared/footer/footer'
import FAQ from './pages/faqs'
import Login from './auth/login'
import RegisterDonor from './auth/register'
import BloodBasics from './pages/info/bloodbasics'
import FindDonor from './pages/finddonor'

import DonorProfile from './pages/donorprofile'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from './auth/signup'
import ContactUs from './pages/contactus'
import BloodBank from './pages/Info/bloodbank'
import DonorCheckList from './auth/checklist'
import ForgotPassword from './auth/forgotpassword'
import FindDonorWithRequest from './pages/findrequest';
import OtpConfirmationPage from './auth/otpgen'
import VerifyOTP from './auth/verifyotp'
import ResetPassword from './auth/resetpassword'
import ScrollToTop from './components/service/scrolltop';
import { ToastContainer } from 'react-toastify';
import EditProfile from './pages/editprofile'
import UserRequests from './pages/userRequest';
import DonorRequests from './pages/donorRequests';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
     <ToastContainer  autoClose={3000} />
     <ScrollToTop />
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/navbar' element={<NavBar/>} />
          <Route path='/welcome' element={<Welcome/>} />
          
          {/* <Route path='/card' element={<Card/>} /> */}
          <Route path='/whyuse' element={<WhyUse/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/faqs' element={<FAQ/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/register' element={<RegisterDonor/>} />
          <Route path='/contactus' element={<ContactUs/>} />
          <Route path='/info/bloodbank' element={<BloodBank/>} />
          <Route path='/info/bloodbasics' element={<BloodBasics/>} />
          <Route path='/checklist' element={<DonorCheckList/>} />
          <Route path='/finddonor' element={<FindDonor/>} />
          <Route path='/forgotpassword' element={<ForgotPassword/>} />
          <Route path='/verify-otp' element={<VerifyOTP/>} />
          <Route path='/reset-password' element={<ResetPassword/>} />
          <Route path='/donorprofile' element={<DonorProfile/>} />
          <Route path='/findrequest' element={<FindDonorWithRequest/>} />
          <Route path='/otpgen' element={<OtpConfirmationPage/>} />
          <Route path='/editprofile/:id' element={<EditProfile/>} />
          <Route path='/donorRequests' element={<DonorRequests />} />
           <Route path='/userRequests' element={<UserRequests />} />

         
        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App
