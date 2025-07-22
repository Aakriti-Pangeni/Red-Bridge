import React from 'react'
import { NavLink } from 'react-router-dom'

const Welcome = () => {
  return (
    <>
      <section className="relative pt-10">
  <img
    src="./src/assets/img/welcome.jpg"
    className="w-full h-120 opacity-65"
    alt="Welcome Banner"
  />
  <div className="absolute top-23 left-1/2 transform -translate-x-1/2 text-center">
    <h1 className="text-4xl font-semibold text-red-900">Welcome to RedBridge</h1>
    <h2 className="text-2xl text-blue-950">Donate Blood, Save Lives</h2>
  </div>
</section>


      <section className="flex flex-col sm:flex-row justify-center items-center mt-10 mb-12 gap-18 px-4">
  <NavLink to="/checklist">
    <button className="w-55 transition-colors bg-blue-950 text-white rounded-[9px] px-6 py-3 hover:text-blue-950 hover:bg-white border border-blue-950">
      Register as Donor
    </button>
  </NavLink>

  <NavLink to="/finddonor">
    <button className="w-55 transition-colors bg-blue-950 text-white rounded-[9px] px-6 py-3 hover:text-blue-950 hover:bg-white border border-blue-950">
      Find Donor
    </button>
  </NavLink>
</section>

      

    </>
  )
}

export default Welcome