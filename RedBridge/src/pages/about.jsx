import React from 'react';
import NavBar from '../shared/navbar/navbar';
import MainLayout from '../shared/sidebar/mainlayout';



const About = () => {
  return (
    <>
     <MainLayout>


      <section className="bg-gray-200 px-4 md:px-20 py-12 mt-18 grid md:grid-cols-2 items-center gap-10 ">

        <div className="bg-white shadow-lg rounded-2xl p-8 md:p-10 space-y-6">
          <p className="text-red-900 font-semibold text">What We Do</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Bridging Blood Donors <br /> with Those in Need
          </h1>
          <p className=" text-base leading-relaxed">
            Red Bridge is a web-based platform that helps connect voluntary blood donors with patients and hospitals in urgent need. By providing a fast and reliable way to search for and request blood, we aim to save lives through timely support and community-driven donations.
          </p>
        </div>


        <div className="w-full h-full flex items-center justify-center">
          <img
            src="./src/assets/img/about.jpg"
            alt="Illustration of blood donation"
            className="w-full h-auto max-h-96 object-cover rounded-2xl shadow-md"
          />
        </div>
      </section>



      <section className="bg-gray-100 py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 p-2">Our Story</h2>
        <div className="grid gap-8 md:grid-cols-3 text-left">


          <div className='shadow-lg rounded-2xl bg-white'> 
            <h3 className="text-xl font-semibold text-gray-800 mb-3 pl-2">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed p-2">
              To connect those in need of blood with life-saving donors through a fast, secure, and reliable digital platform that strengthens community health.
            </p>
          </div>


          <div className='shadow-lg rounded-2xl bg-white'>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 pl-2">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed p-2">
              To become the most trusted and widely used blood donor network in the region, ensuring no life is lost due to blood unavailability.
            </p>
          </div>


          <div className='shadow-lg rounded-2xl bg-white'>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 pl-2">Our Values</h3>
            <p className="text-gray-600 leading-relaxed p-2">
              We believe in empathy, transparency, accountability, and the power of community. Every connection we make is driven by a commitment to save lives and serve with integrity.
            </p>
          </div>

        </div>
      </section>
      </MainLayout>
    </>
  );
};

export default About;
