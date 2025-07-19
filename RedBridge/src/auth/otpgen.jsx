import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from"@fortawesome/free-solid-svg-icons";


const OtpConfirmationPage=()=>{
    const[otp, setOtp]=useState(Array(6).fill(""));

  
  function handleChange(e, index){
    const{value}=e.target;
   
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  } 

   function handleSubmit(e){
        e.preventDefault();
    }




  return(
    <main className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
       <div className="bg-white shadow-md rounded-lg px-14 py-16 w-full max-w-md">
        <section className="flex justify-center">
            <FontAwesomeIcon icon={faEnvelope} className="text-2xl text-red-900" />
        </section>
        <h3 className="font-bold text-center mt-3 text-bl text-xl mb-3">Verify your email</h3>
        <section className="flex flex-col text-center text-black mb-4">
            <p>We've sent a 6-digit verification code to</p>
            <p>your email address.Please enter it below</p>
        </section>

         <section className="text-center">
            {otp.map((value,index)=>{
                return(
                    <input 
                    key={index}
                    type="text"
                    maxLength="1"
                    value={otp.value}
                    onChange={handleChange}
                    className="m-0.5 mb-2 w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-900 focus:border-red-900"/>
                );
            })}
         </section>
         <button className='w-full mt-3 bg-red-900 text-white py-2 rounded hover:bg-red-800 transition mb-3' type="submit" onClick={handleSubmit}>Verify OTP</button>
         <section className="text-center">
            <p className="text-black mb-2">Didn't recieve the code?</p>
           <button className="text-black hover:underline hover:text-blue-800 font-medium">Resend Code</button>    
        </section>  
        

    </div>
    </main>
  )


}
export default OtpConfirmationPage