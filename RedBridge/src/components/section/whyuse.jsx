import React from 'react'

const WhyUse = () => {
  return (
    <>
   <section className="flex flex-col md:flex-row justify-center bg-gray-50 items-center px-4 py-12 mt-15 mb-7 gap-10">
      
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl transition duration-300  ">
        <h1 className="text-2xl mb-4 font-bold text-red-900">
          Why to use Red Bridge?
        </h1>
        <p className="text-blue-950 leading-relaxed">
          Red Bridge provides a fast and reliable way to find blood donors in real-time.
          It connects people in need with voluntary donors nearby, helping save lives during emergencies.
          The system is easy to use, secure, and ensures that no time is wasted when it matters most.
        </p>
      </div>

    
      <div className="w-[400px] md:w-[400px] transition duration-300 hover:shadow-red-500">
        <img
          src="./src/assets/img/whyuse.jpg"
          alt="Blood donation"
          className="shadow-lg rounded-xl w-auto h-auto"
        />
      </div>
    </section>

    </>
  )
}

export default WhyUse