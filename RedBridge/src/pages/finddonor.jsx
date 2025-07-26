



// import React, { useEffect, useState } from "react";
// import MainLayout from "../shared/sidebar/mainlayout";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";

// const getCookie = (name) => {
//   const value = `; ${document.cookie}`;  // ✅ Add "; " prefix
//   const parts = value.split(`; ${name}=`);  // ✅ Add "; " here too
//   if (parts.length === 2) return parts.pop().split(";").shift();
//   return null;
// };

// const calculateAvailability = (lastDonation) => {
//   if (!lastDonation) return true;

//   const [year, month, day] = lastDonation.split("-").map(Number);
//   const lastDate = new Date(year, month - 1, day); // month is 0-based
//   const now = new Date();

//   const diffTime = now - lastDate;
//   const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30);

//   return diffMonths >= 4;
// };

// const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
//   const deg2rad = (deg) => deg * (Math.PI / 180);
//   const R = 6371; // Earth radius in km
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) *
//     Math.cos(deg2rad(lat2)) *
//     Math.sin(dLon / 2) *
//     Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// const geocodeLocation = async (location) => {
//   const encoded = encodeURIComponent(location);
//   const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`;
//   try {
//     const res = await fetch(url);
//     const data = await res.json();
//     if (data && data.length > 0) {
//       return {
//         lat: parseFloat(data[0].lat),
//         lon: parseFloat(data[0].lon),
//       };
//     }
//     return null;
//   } catch (error) {
//     console.error("Geocode error:", error);
//     return null;
//   }
// };

// const FindDonor = () => {
//   const [searchLocation, setSearchLocation] = useState("");
//   const [selectedGroup, setSelectedGroup] = useState("");
//   const [user, setUser] = useState(null);
//   const [donorData, setDonorData] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);
//   const [knnCount, setKnnCount] = useState(5); // number of nearest donors to show

//   useEffect(() => {
//     const cookie = getCookie("userInfo");
//     if (cookie) {
//       try {
//         const parsed = JSON.parse(decodeURIComponent(cookie));
//         setUser(parsed);
//       } catch (err) {
//         console.error("Invalid userInfo cookie");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const fetchDonors = async () => {
//       try {
//         const res = await fetch("http://localhost:4000/donor");
//         const data = await res.json();

//         const donorsWithAvailability = data.map((donor, idx) => ({
//           ...donor,
//           id: donor._id || idx + 1,
//           available: calculateAvailability(donor.lastDonation),
//           lat: donor.location?.coordinates ? donor.location.coordinates[1] : null,
//           lon: donor.location?.coordinates ? donor.location.coordinates[0] : null,
//         }));

//         setDonorData(donorsWithAvailability);
//       } catch (error) {
//         console.error("Error fetching donors:", error);
//       }
//     };

//     fetchDonors();
//   }, []);

//   useEffect(() => {
//     if (!searchLocation.trim()) {
//       setUserLocation(null);
//       return;
//     }

//     const fetchCoords = async () => {
//       const coords = await geocodeLocation(searchLocation);
//       setUserLocation(coords);
//     };

//     fetchCoords();
//   }, [searchLocation]);


//   useEffect(() => {
//     const fetchDonors = async () => {
//       try {
//         const res = await axios.get("http://localhost:4000/donor");
//         const updated = res.data.map((donor) => ({
//           ...donor,
//           available: calculateAvailability(donor.lastDonation), // ✅ correct field
//         }));
//         setDonorData(updated);
//       } catch (error) {
//         console.error("Error fetching donors:", error);
//       }
//     };

//     fetchDonors();
//   }, []);

//   // KNN algorithm: sort donors by distance to userLocation, filter by blood group, return top K
//   const knnDonors = () => {
//     if (!userLocation) {
//       // No location, show all donors filtered by blood group
//       return donorData.filter((donor) =>
//         selectedGroup ? donor.bloodGroup === selectedGroup : true
//       );
//     }

//     // Calculate distances
//     const donorsWithDistance = donorData
//       .filter((donor) => donor.lat !== null && donor.lon !== null)
//       .filter((donor) => (selectedGroup ? donor.bloodGroup === selectedGroup : true))
//       .map((donor) => ({
//         ...donor,
//         distance: getDistanceFromLatLonInKm(
//           userLocation.lat,
//           userLocation.lon,
//           donor.lat,
//           donor.lon
//         ),
//       }));

//     // Sort ascending by distance
//     donorsWithDistance.sort((a, b) => a.distance - b.distance);

//     // Return top K nearest
//     return donorsWithDistance.slice(0, knnCount);
//   };

//   const filteredDonors = knnDonors();
//   <ToastContainer />
 

//   const handleRequest = async (donor) => {
//     try {
//       // Get the userInfo cookie and extract the token from it
//       const cookie = getCookie("userInfo");
//       let token = null;

//       if (cookie) {
//         try {
//           const parsed = JSON.parse(cookie);
//           console.log("Parsed user info:", parsed); // Debug log

//           // ✅ Get token from authToken cookie instead
//           token = getCookie("authToken");
//           console.log("Token from authToken cookie:", token); // Debug log
//         } catch (err) {
//           console.error("Error parsing userInfo cookie:", err);
//         }
//       }

//       if (!token) {
//         toast.error("Please log in to send a request.");
//         return;
//       }

//       const response = await fetch("http://localhost:4000/donor/request", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Use the extracted token
//         },
//         body: JSON.stringify({ donorId: donor._id }),
//       });

//       let result;
//       try {
//         result = await response.json();
//       } catch (err) {
//         result = { error: "Invalid response from server." };
//       }

//       if (response.ok) {
//         toast.success("Request sent successfully!");
//       } else {
//         toast.error(result.error || "Failed to send request.");
//       }
//     } catch (err) {
//       console.error("Request Error:", err);
//       toast.error("Something went wrong while sending request.");
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="px-4 py-8 mx-auto min-h-screen mt-18 bg-gray-100">
//         <div className="text-center mb-6">
//           <img src="bloodIcon.ico" alt="avatar" className="w-16 mx-auto mb-2" />
//           <h1 className="text-2xl font-bold text-red-800">Donors List</h1>
//         </div>

//         <div className="flex flex-col md:flex-row items-center justify-center bg-white p-6 rounded-xl gap-4 mb-4 shadow">
//           <input
//             type="text"
//             placeholder="Search Location"
//             className="px-4 py-2 border rounded-lg w-64 focus:outline-none shadow-sm"
//             value={searchLocation}
//             onChange={(e) => setSearchLocation(e.target.value)}
//           />
//           <select
//             className="px-4 py-2 border rounded-lg w-44 focus:outline-none shadow-sm"
//             value={selectedGroup}
//             onChange={(e) => setSelectedGroup(e.target.value)}
//           >
//             <option value="">Blood Group</option>
//             <option value="A+">A+</option>
//             <option value="A-">A-</option>
//             <option value="B+">B+</option>
//             <option value="B-">B-</option>
//             <option value="O+">O+</option>
//             <option value="O-">O-</option>
//             <option value="AB+">AB+</option>
//             <option value="AB-">AB-</option>
//           </select>
//         </div>

//         <div className="mb-4 text-center">
//           <label className="mr-2 font-semibold">Number of donors to show:</label>
//           <input
//             type="number"
//             min={1}
//             max={20}
//             value={knnCount}
//             onChange={(e) => setKnnCount(parseInt(e.target.value) || 5)}
//             className="border rounded px-2 py-1 w-20 text-center"
//           />
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full bg-white rounded-lg shadow border-collapse table-auto">
//             <thead>
//               <tr className="bg-red-900 text-white text-sm">
//                 <th className="p-3 border">S.N</th>
//                 <th className="p-3 border">Donor Name</th>
//                 <th className="p-3 border">Address</th>
//                 {user && <th className="p-3 border">Phone</th>}
//                 <th className="p-3 border">Blood Group</th>
//                 {user && <th className="p-3 border">Request</th>}
//                 <th className="p-3 border">Distance (km)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredDonors.length > 0 ? (
//                 filteredDonors.map((donor, index) => (
//                   <tr
//                     key={donor._id || index}
//                     className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
//                   >
//                     <td className="p-2 text-center border">{index + 1}.</td>
//                     <td className="p-2 border">
//                       <div className="flex items-center">
//                         {/* ✅ Add verified badge */}
//                         {donor.donationCount >= 2 && (
//                           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
//                             ✓ Verified
//                           </span>
//                         )}
//                         {donor.name}
//                       </div>
//                     </td>
//                     <td className="p-2 border">{donor.address}</td>
//                     {user && <td className="p-2 border font-medium">{donor.phone}</td>}
//                     <td className="p-2 border font-semibold">
//                       {donor.bloodGroup}
//                       <span
//                         className={`ml-2 text-sm font-normal ${donor.available ? "text-green-600" : "text-red-600"
//                           }`}
//                       >
//                         ({donor.available ? "Available" : "Unavailable"})
//                       </span>
//                     </td>
//                     {user && (
//                       <td className="p-2 border text-center">
//                         <button
//                           onClick={() => handleRequest(donor)}
//                           disabled={!donor.available}
//                           className={`px-4 py-1 rounded-lg text-sm shadow ${donor.available
//                               ? "bg-blue-950 text-white hover:bg-blue-900"
//                               : "bg-gray-400 text-gray-200 cursor-not-allowed"
//                             }`}
//                         >
//                           Request
//                         </button>
//                       </td>
//                     )}
//                     <td className="p-2 border text-center">
//                       {donor.distance ? donor.distance.toFixed(2) : "-"}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={user ? 7 : 5} className="text-center p-4 text-gray-500">
//                     No donors found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default FindDonor;

import React, { useEffect, useState } from "react";
import MainLayout from "../shared/sidebar/mainlayout";
import { ToastContainer, toast } from "react-toastify";

// Simple Search Icon Component
const SearchIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const calculateAvailability = (lastDonation) => {
  if (!lastDonation) return true;

  const [year, month, day] = lastDonation.split("-").map(Number);
  const lastDate = new Date(year, month - 1, day);
  const now = new Date();

  const diffTime = now - lastDate;
  const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30);

  return diffMonths >= 4;
};

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const deg2rad = (deg) => deg * (Math.PI / 180);
  const R = 6371;
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
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Get user info from cookie
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

  // Fetch all donors on component mount
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
        // ✅ Show all donors initially
        setFilteredDonors(donorsWithAvailability);
      } catch (error) {
        console.error("Error fetching donors:", error);
        toast.error("Failed to load donors data");
      }
    };

    fetchDonors();
  }, []);

  // Handle search functionality
  const handleSearch = async () => {
    if (!searchLocation.trim() && !selectedGroup) {
      // ✅ If no search criteria, show all donors
      setFilteredDonors(donorData);
      setHasSearched(false);
      setUserLocation(null);
      toast.info("Showing all donors");
      return;
    }

    setIsSearching(true);
    
    try {
      let results = [...donorData];

      // Filter by blood group if selected
      if (selectedGroup) {
        results = results.filter((donor) => donor.bloodGroup === selectedGroup);
      }

      // If location is provided, calculate distances and sort
      if (searchLocation.trim()) {
        const coords = await geocodeLocation(searchLocation);
        if (coords) {
          setUserLocation(coords);
          
          // Calculate distances for donors with coordinates
          const donorsWithDistance = results
            .filter((donor) => donor.lat !== null && donor.lon !== null)
            .map((donor) => ({
              ...donor,
              distance: getDistanceFromLatLonInKm(
                coords.lat,
                coords.lon,
                donor.lat,
                donor.lon
              ),
            }));

          // Sort by distance (show all matching donors, not limited to knnCount)
          donorsWithDistance.sort((a, b) => a.distance - b.distance);
          results = donorsWithDistance;
        } else {
          toast.error("Location not found. Showing all donors for selected blood group.");
        }
      }

      setFilteredDonors(results);
      setHasSearched(true);
      
      if (results.length === 0) {
        toast.info("No donors found matching your criteria.");
      } else {
        toast.success(`Found ${results.length} donor(s) matching your criteria.`);
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Search failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Clear search results and show all donors
  const handleClearSearch = () => {
    setSearchLocation("");
    setSelectedGroup("");
    setFilteredDonors(donorData); // ✅ Show all donors again
    setUserLocation(null);
    setHasSearched(false);
    toast.info("Showing all donors");
  };

  const handleRequest = async (donor) => {
    try {
      const cookie = getCookie("userInfo");
      let token = null;

      if (cookie) {
        try {
          const parsed = JSON.parse(cookie);
          console.log("Parsed user info:", parsed);

          token = getCookie("authToken");
          console.log("Token from authToken cookie:", token);
        } catch (err) {
          console.error("Error parsing userInfo cookie:", err);
        }
      }

      if (!token) {
        toast.error("Please log in to send a request.");
        return;
      }

      const response = await fetch("http://localhost:4000/donor/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
          <h1 className="text-2xl font-bold text-red-800">Find Blood Donors</h1>
          <p className="text-gray-600 mt-2">Search for donors by location and blood group</p>
        </div>

        {/* Search Section */}
        <div className="flex flex-col md:flex-row items-center justify-center bg-white p-6 rounded-xl gap-4 mb-6 shadow">
          <input
            type="text"
            placeholder="Enter Location (e.g., Kathmandu, Pokhara)"
            className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          
          <select
            className="px-4 py-2 border rounded-lg w-44 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="flex items-center gap-2 px-6 py-2 bg-red-900 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Searching...
              </>
            ) : (
              <>
                <SearchIcon />
                Search
              </>
            )}
          </button>

          {/* Clear Button */}
          {(hasSearched || searchLocation || selectedGroup) && (
            <button
              onClick={handleClearSearch}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors shadow-sm"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results Section */}
        <div className="overflow-x-auto">
          <div className="mb-4 text-center">
            <p className="text-gray-600">
              {!hasSearched && !searchLocation && !selectedGroup 
                ? `Showing all ${filteredDonors.length} donors`
                : filteredDonors.length > 0 
                  ? `Showing ${filteredDonors.length} donor(s) ${searchLocation ? `near "${searchLocation}"` : ''} ${selectedGroup ? `with blood group ${selectedGroup}` : ''}`
                  : 'No donors found matching your criteria'
              }
            </p>
          </div>

          <table className="w-full bg-white rounded-lg shadow border-collapse table-auto">
            <thead>
              <tr className="bg-red-900 text-white text-sm">
                <th className="p-3 border">S.N</th>
                <th className="p-3 border">Donor Name</th>
                <th className="p-3 border">Address</th>
                {user && <th className="p-3 border">Phone</th>}
                <th className="p-3 border">Blood Group</th>
                {user && <th className="p-3 border">Request</th>}
                {hasSearched && searchLocation && <th className="p-3 border">Distance (km)</th>}
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
                    <td className="p-2 border">
                      <div className="flex items-center">
                        {donor.donationCount >= 2 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                            ✓ Verified
                          </span>
                        )}
                        {donor.name}
                      </div>
                    </td>
                    <td className="p-2 border">{donor.address}</td>
                    {user && <td className="p-2 border font-medium">{donor.phone}</td>}
                    <td className="p-2 border font-semibold">
                      {donor.bloodGroup}
                      <span
                        className={`ml-2 text-sm font-normal ${donor.available ? "text-green-600" : "text-red-600"}`}
                      >
                        ({donor.available ? "Available" : "Unavailable"})
                      </span>
                    </td>
                    {user && (
                      <td className="p-2 border text-center">
                        <button
                          onClick={() => handleRequest(donor)}
                          disabled={!donor.available}
                          className={`px-4 py-1 rounded-lg text-sm shadow ${donor.available
                              ? "bg-blue-950 text-white hover:bg-blue-900"
                              : "bg-gray-400 text-gray-200 cursor-not-allowed"
                            }`}
                        >
                          Request
                        </button>
                      </td>
                    )}
                    {hasSearched && searchLocation && (
                      <td className="p-2 border text-center">
                        {donor.distance ? donor.distance.toFixed(2) : "-"}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={hasSearched && searchLocation ? (user ? 7 : 5) : (user ? 6 : 4)} className="text-center p-8 text-gray-500">
                    <div className="flex flex-col items-center">
                      <SearchIcon className="w-12 h-12 text-gray-300 mb-2" />
                      <p>No donors found matching your search criteria.</p>
                      <p className="text-sm">Try adjusting your location or blood group selection.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ToastContainer position="bottom-right" />
      </div>
    </MainLayout>
  );
};

export default FindDonor;