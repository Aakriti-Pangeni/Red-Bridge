



import React, { useEffect, useState } from "react";
import MainLayout from "../shared/sidebar/mainlayout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; 

const getCookie = (name) => {
  const value =  `${document.cookie}`;
  const parts = value.split(`${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const calculateAvailability = (lastDonation) => {
  if (!lastDonation) return true;

  const [year, month, day] = lastDonation.split("-").map(Number);
  const lastDate = new Date(year, month - 1, day); // month is 0-based
  const now = new Date();

  const diffTime = now - lastDate;
  const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30);

  return diffMonths >= 4;
};

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const deg2rad = (deg) => deg * (Math.PI / 180);
  const R = 6371; // Earth radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const geocodeLocation = async (location) => {
  const encoded = encodeURIComponent(location);
  const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    }
    return null;
  } catch (error) {
    console.error("Geocode error:", error);
    return null;
  }
};

const FindDonor = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [user, setUser] = useState(null);
  const [donorData, setDonorData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [knnCount, setKnnCount] = useState(5); // number of nearest donors to show

  useEffect(() => {
    const cookie = getCookie("userInfo");
    if (cookie) {
      try {
        const parsed = JSON.parse(decodeURIComponent(cookie));
        setUser(parsed);
      } catch (err) {
        console.error("Invalid userInfo cookie");
      }
    }
  }, []);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await fetch("http://localhost:4000/donor");
        const data = await res.json();

        const donorsWithAvailability = data.map((donor, idx) => ({
          ...donor,
          id: donor._id || idx + 1,
          available: calculateAvailability(donor.lastDonation),
          lat: donor.location?.coordinates ? donor.location.coordinates[1] : null,
          lon: donor.location?.coordinates ? donor.location.coordinates[0] : null,
        }));

        setDonorData(donorsWithAvailability);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };

    fetchDonors();
  }, []);

  useEffect(() => {
    if (!searchLocation.trim()) {
      setUserLocation(null);
      return;
    }

    const fetchCoords = async () => {
      const coords = await geocodeLocation(searchLocation);
      setUserLocation(coords);
    };

    fetchCoords();
  }, [searchLocation]);


   useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.get("http://localhost:4000/donor");
        const updated = res.data.map((donor) => ({
          ...donor,
          available: calculateAvailability(donor.lastDonation), // ✅ correct field
        }));
        setDonorData(updated);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };

    fetchDonors();
  }, []);

  // KNN algorithm: sort donors by distance to userLocation, filter by blood group, return top K
  const knnDonors = () => {
    if (!userLocation) {
      // No location, show all donors filtered by blood group
      return donorData.filter((donor) =>
        selectedGroup ? donor.bloodGroup === selectedGroup : true
      );
    }

    // Calculate distances
    const donorsWithDistance = donorData
      .filter((donor) => donor.lat !== null && donor.lon !== null)
      .filter((donor) => (selectedGroup ? donor.bloodGroup === selectedGroup : true))
      .map((donor) => ({
        ...donor,
        distance: getDistanceFromLatLonInKm(
          userLocation.lat,
          userLocation.lon,
          donor.lat,
          donor.lon
        ),
      }));

    // Sort ascending by distance
    donorsWithDistance.sort((a, b) => a.distance - b.distance);

    // Return top K nearest
    return donorsWithDistance.slice(0, knnCount);
  };

  const filteredDonors = knnDonors();
<ToastContainer/>
//  const handleRequest = async (donor) => {
//   try {
//     const token = getCookie("token"); // or whatever your cookie name is for JWT
//     const response = await fetch("http://localhost:4000/donor/request", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         ...(token && { Authorization: `Bearer ${token}` }),
//       },
//       body: JSON.stringify({ donorId: donor._id }),
//     });

//     // const result = await response.json();

//     let result;
// try {
//   result = await response.json();
// } catch (err) {
//   result = { error: "Invalid response from server." };
// }


//     if (response.ok) {
//       toast.success("Request sent successfully!");
//     } else {
//       toast.error(result.error || "Failed to send request.");
//     }
//   } catch (err) {
//     console.error("Request Error:", err);
//     toast.error("Something went wrong while sending request.");
//   }
// };



const handleRequest = async (donor) => {
  try {
    // const cookie = getCookie("userInfo");
    // const token = cookie ? JSON.parse(decodeURIComponent(cookie)).token : null;


    const token = getCookie("authToken");

    // const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:4000/donor/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ donorId: donor._id }),
    });

    let result;
    try {
      result = await response.json();
    } catch (err) {
      result = { error: "Invalid response from server." };
    }

    if (response.ok) {
      toast.success("Request sent successfully!");
    } else {
      toast.error(result.error || "Failed to send request.");
    }
  } catch (err) {
    console.error("Request Error:", err);
    toast.error("Something went wrong while sending request.");
  }
};


  return (
    <MainLayout>
      <div className="px-4 py-8 mx-auto min-h-screen mt-18 bg-gray-100">
        <div className="text-center mb-6">
          <img src="bloodIcon.ico" alt="avatar" className="w-16 mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-red-800">Donors List</h1>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center bg-white p-6 rounded-xl gap-4 mb-4 shadow">
          <input
            type="text"
            placeholder="Search Location"
            className="px-4 py-2 border rounded-lg w-64 focus:outline-none shadow-sm"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded-lg w-44 focus:outline-none shadow-sm"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="">Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div className="mb-4 text-center">
          <label className="mr-2 font-semibold">Number of donors to show:</label>
          <input
            type="number"
            min={1}
            max={20}
            value={knnCount}
            onChange={(e) => setKnnCount(parseInt(e.target.value) || 5)}
            className="border rounded px-2 py-1 w-20 text-center"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow border-collapse table-auto">
            <thead>
              <tr className="bg-red-900 text-white text-sm">
                <th className="p-3 border">S.N</th>
                <th className="p-3 border">Donor Name</th>
                <th className="p-3 border">Address</th>
                {user && <th className="p-3 border">Phone</th>}
                <th className="p-3 border">Blood Group</th>
                {user && <th className="p-3 border">Request</th>}
                <th className="p-3 border">Distance (km)</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.length > 0 ? (
                filteredDonors.map((donor, index) => (
                  <tr
                    key={donor._id || index}
                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                  >
                    <td className="p-2 text-center border">{index + 1}.</td>
                    <td className="p-2 border">{donor.name}</td>
                    <td className="p-2 border">{donor.address}</td>
                    {user && <td className="p-2 border font-medium">{donor.phone}</td>}
                    <td className="p-2 border font-semibold">
                      {donor.bloodGroup}
                    <span
                className={`ml-2 text-sm font-normal ${
                  donor.available ? "text-green-600" : "text-red-600"
                }`}
              >
                ({donor.available ? "Available" : "Unavailable"})
              </span>
            </td>
            {user && (
              <td className="p-2 border text-center">
                <button
                  onClick={() => handleRequest(donor)}
                  disabled={!donor.available}
                  className={`px-4 py-1 rounded-lg text-sm shadow ${
                    donor.available
                      ? "bg-blue-950 text-white hover:bg-blue-900"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                >
                          Request
                        </button>
                      </td>
                    )}
                    <td className="p-2 border text-center">
                      {donor.distance ? donor.distance.toFixed(2) : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={user ? 7 : 5} className="text-center p-4 text-gray-500">
                    No donors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default FindDonor;

