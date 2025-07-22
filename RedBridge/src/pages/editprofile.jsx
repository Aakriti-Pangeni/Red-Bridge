import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../shared/sidebar/mainlayout";

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    phone: "",
    address: "",
    lastDonation: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:4000/donor/${id}`);
        const data = await res.json();
        setForm({
          phone: data.phone || "",
          address: data.address || "",
          lastDonation: data.lastDonation || "",
        });
      } catch (err) {
        setError("Failed to load profile");
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:4000/donor/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      alert("Profile updated!");
      navigate("/donorprofile");
    } catch {
      alert("Failed to update profile");
    }
  };

  return (
    <MainLayout>
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded min-h-screen ">
      <h2 className="text-2xl mb-4">Edit Donor Profile</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="border w-full p-2 rounded" />
        </div>
        <div>
          <label>Address</label>
          <input name="address" value={form.address} onChange={handleChange} className="border w-full p-2 rounded" />
        </div>
        <div>
          <label>Last Donation Date</label>
          <input
            type="date"
            name="lastDonation"
            value={form.lastDonation}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        <button type="submit" className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900">
          Save Changes
        </button>
      </form>
    </div>
    </MainLayout>
  );
};

export default EditProfile;
