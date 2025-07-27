

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";


const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const Welcome = () => {
  const [isDonor, setIsDonor] = useState(false);
  const [userId, setUserId] = useState(null);


  // useEffect(() => {
  //   const idFromCookie = getCookie("userInfo");
  //   let parsed = null;
  //   try {
  //     parsed = idFromCookie ? JSON.parse(idFromCookie) : null;
  //   } catch (e) {
  //     parsed = null;
  //   }
  //   if (parsed && parsed._id) {
  //     setUserId(parsed._id);
  //   }
  // }, []);

useEffect(() => {
  const idFromCookie = getCookie("userInfo");
  let parsed = null;
  try {
    parsed = idFromCookie ? JSON.parse(decodeURIComponent(idFromCookie)) : null;
  } catch (e) {
    console.error("Error parsing userInfo cookie:", e);
    parsed = null;
  }
  
  console.log("Parsed userInfo in Welcome:", parsed); 
  
  
  if (parsed && (parsed._id || parsed.id)) {
    const userId = parsed._id || parsed.id;
    setUserId(userId);
    console.log("User ID found:", userId); 
  } else {
    console.log("No user ID found in cookie");
  }
}, []);


 
  useEffect(() => {
    const checkDonorStatus = async () => {
      try {
        if (userId) {
          const res = await axios.get(`http://localhost:4000/donor/user/${userId}`);
          if (res.data && res.data._id) {
            setIsDonor(true); // User is a donor
          }
        }
      } catch (err) {
        setIsDonor(false); // Not a donor
      }
    };

    checkDonorStatus();
  }, [userId]);

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
        {/* ✅ Conditional Button based on donor status */}
        {!isDonor ? (
          <NavLink to="/checklist">
            <button className="w-55 transition-colors bg-blue-950 text-white rounded-[9px] px-6 py-3 hover:text-blue-950 hover:bg-white border border-blue-950">
              Register as Donor
            </button>
          </NavLink>
        ) : (
          <NavLink to="/donorprofile">
            <button className="w-55 transition-colors bg-blue-950 text-white rounded-[9px] px-6 py-3 hover:text-blue-950 hover:bg-white border border-blue-950">
              Your Profile
            </button>
          </NavLink>
        )}

        {/* ✅ Always show Find Donor */}
        <NavLink to="/finddonor">
          <button className="w-55 transition-colors bg-blue-950 text-white rounded-[9px] px-6 py-3 hover:text-blue-950 hover:bg-white border border-blue-950">
            Find Donor
          </button>
        </NavLink>
      </section>
    </>
  );
};

export default Welcome;


