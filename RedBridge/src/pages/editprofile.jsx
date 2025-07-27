


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../shared/sidebar/mainlayout";
import { toast, ToastContainer } from "react-toastify";

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    phone: "",
    address: "",
    lastDonation: "",
      donationCount: 0, 
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/donor/${id}`);
        const data = await res.json();
        setForm({
          phone: data.phone || "",
          address: data.address || "",
          lastDonation: data.lastDonation || "",
          donationCount: data.donationCount || 0,
        });
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
  <ToastContainer/>

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    //
     const { name, value } = e.target;
    
    const processedValue = name === 'donationCount' ? parseInt(value) || 0 : value;
    setForm({ ...form, [name]: processedValue });
  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:4000/donor/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      toast.success("Profile updated!");
      navigate("/donorprofile");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-center px-4 py-12 bg-gray-100 min-h-screen">
        <div className="w-full max-w-2xl bg-white p-6 sm:p-10 rounded-2xl shadow-md">
          <h2 className="text-2xl sm:text-3xl font-semibold text-blue-950 mb-6 text-center">Edit Donor Profile</h2>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Donation Date</label>
              <input
                type="date"
                name="lastDonation"
                value={form.lastDonation}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>


             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Donations Made
              </label>
              <input
                type="number"
                name="donationCount"
                value={form.donationCount}
                onChange={handleChange}
                min="0"
                placeholder="Enter number of donations"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
              <p className="text-sm text-gray-500 mt-1">
                {form.donationCount >= 2 ? "✅ Verified Donor (2+ donations)" : "Need 2+ donations for verified status"}
              </p>
            </div>


            <button
              type="submit"
              className="w-full bg-red-900 text-white text-base py-3 rounded-lg hover:bg-red-900 transition duration-200"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditProfile;
