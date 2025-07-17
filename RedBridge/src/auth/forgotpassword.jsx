import React, { useState } from "react";

import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <main className="bg-gray-200">
      <section className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md bg-[#fefcfb] px-6 py-10 rounded-xl shadow-lg">
          <div className="flex flex-col items-center">
            <img src="/bloodIcon.ico" alt="logo" className="h-16 w-16" /><span className="mb-3">RedBridge</span>
            <h2 className="text-xl font-bold mb-4">Forgot your password?</h2>
            <div className="flex flex-col items-center mb-4">
              <p className="">
              Don't worry! Resetting your password is easy. Just type
            </p>
            <p className="">
            in the email you registered to RedBridge.
            </p>
            </div>
          </div>
          <form action="" className="">
            <label htmlFor="" className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 mb-4"
            />
            <button type="submit" className='w-full py-2 mt-2 bg-red-900 text-white font-semibold rounded-md hover:bg-red-700 transition mb-4'>Send</button>
          </form>
          <p className="flex justify-center">
            Remembered your password? {" "}
            <NavLink className="text-blue-800 hover:underline pl-2" to={"/login"}>
               Sign In
            </NavLink>
          </p>
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;