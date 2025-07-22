

import Donor from "../models/donor.model.js";
import User from "../models/user.model.js";
import getCoordinates from "../utils/geocode.js";
import bcrypt from "bcryptjs";

// CREATE DONOR
export const createDonor = async (req, res) => {
  const {
    name,
    phone,
    email,
    dob,
    gender,
    bloodGroup,
    address,
    password,
    confirmPassword
  } = req.body;

  if (
    !name ||
    !phone ||
    !email ||
    !dob ||
    !gender ||
    !bloodGroup ||
    !address ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already registered" });

    const coordinates = await getCoordinates(address);
    if (!coordinates) {
      return res.status(400).json({ error: "Invalid address for geolocation" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName: name,
      email,
      password: hashedPassword,
      phonenumber: phone,
    });

    const savedUser = await newUser.save();

    const newDonor = new Donor({
      name,
      email,
      phone,
      dob,
      gender,
      bloodGroup,
      address,
      user: savedUser._id,
      location: {
        type: "Point",
        coordinates,
      },
        lastDonation: req.body.lastDonation || null,
    });

    const createdDonor = await newDonor.save();
    res.status(201).json({ user: savedUser, donor: createdDonor });
  } catch (err) {
    console.error("Create Donor Error:", err.message);
    res.status(500).json({ error: "Failed to create donor." });
  }
};

// GET ALL DONORS
export const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find().populate("user");
    res.json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch donors" });
  }
};

// SEARCH DONORS
export const searchDonors = async (req, res) => {
  const { bloodGroup, lat, lng } = req.query;

  if (!bloodGroup || !lat || !lng) {
    return res.status(400).json({ error: "Missing required query parameters" });
  }

  try {
    const donors = await Donor.find({
      bloodGroup,
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: 10000, // within 10 km
        },
      },
    }).populate("user");

    res.json(donors);
  } catch (err) {
    console.error("Search Error:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
};

// GET SINGLE DONOR
export const getDonorById = async (req, res) => {
  const { id } = req.params;
  try {
    const donor = await Donor.findById(id).populate("user");
    if (!donor) return res.status(404).json({ error: "Donor not found" });
    res.json(donor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching donor" });
  }
};

// UPDATE DONOR
export const updateDonor = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const donor = await Donor.findByIdAndUpdate(id, updateData, { new: true });
    if (!donor) return res.status(404).json({ error: "Donor not found" });
    res.json(donor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating donor" });
  }
};

// DELETE DONOR
export const deleteDonor = async (req, res) => {
  const { id } = req.params;
  try {
    const donor = await Donor.findByIdAndDelete(id);
    if (!donor) return res.status(404).json({ error: "Donor not found" });
    res.json({ message: "Donor deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting donor" });
  }
};

// GET DONOR PROFILE BY USER ID
// export const getDonorProfile = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const donor = await Donor.findOne({ user: id }).populate("user");
//     if (!donor) return res.status(404).json({ message: "Donor not found" });
//     res.json(donor);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error fetching donor" });
//   }
// };


export const getDonorProfile = async (req, res) => {
  const { id } = req.params;
  console.log("Fetching donor profile for user ID:", id);

  try {
    const donor = await Donor.findOne({ user: id }).populate("user");

    if (!donor) {
      console.log("No donor found for user ID:", id);
      return res.status(404).json({ message: "Donor not found" });
    }

    res.status(200).json(donor);
  } catch (err) {
    console.error("Error in getDonorProfile:", err.message);
    res.status(500).json({ message: "Error fetching donor" });
  }
};