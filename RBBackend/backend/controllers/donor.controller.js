// import Donor from '../models/donor.model.js';
// // import asyncHandler from 'express-async-handler';
// import { validationResult } from 'express-validator';

// // @desc    Create a new donor
// // @route   POST /api/donors
// // @access  Public

// const donor = {}


// donor.createDonor = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const {
//     name,
//     bloodType,
//     location,
//     contactNumber,
//     email,
//     lastDonationDate,
//     age,
//     medicalHistory
//   } = req.body;

//   // Validate required fields
//   if (!name || !bloodType || !location || !contactNumber || !email || !age) {
//     return res.status(400).json({ error: 'Missing required donor fields.' });
//   }

//   try {
//     const newDonor = new Donor({
//       name,
//       bloodType,
//       location,
//       contactNumber,
//       email,
//       lastDonationDate,
//       age,
//       medicalHistory
//     });

//     const createdDonor = await newDonor.save();
//     res.status(201).json(createdDonor);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create donor.' });
//   }
// };

// // @desc    Get all donors
// // @route   GET /api/donors
// // @access  Public
// donor.getAllDonors = async (req, res) => {
//   const donors = await Donor.find({});
//   res.json(donors);
// };

// // @desc    Get donor by ID
// // @route   GET /api/donors/:id
// // @access  Public
// donor.getDonorById = async (req, res) => {
//   const donor = await Donor.findById(req.params.id);

//   if (donor) {
//     res.json(donor);
//   } else {
//     res.status(404);
//     throw new Error('Donor not found');
//   }
// };

// // @desc    Update donor
// // @route   PUT /api/donors/:id
// // @access  Private
// donor.updateDonor = async (req, res) => {
//   const donor = await Donor.findById(req.params.id);

//   if (donor) {
//     donor.name = req.body.name || donor.name;
//     donor.bloodType = req.body.bloodType || donor.bloodType;
//     donor.location = req.body.location || donor.location;
//     donor.contactNumber = req.body.contactNumber || donor.contactNumber;
//     donor.email = req.body.email || donor.email;
//     donor.lastDonationDate = req.body.lastDonationDate || donor.lastDonationDate;
//     donor.age = req.body.age || donor.age;
//     donor.medicalHistory = req.body.medicalHistory || donor.medicalHistory;

//     const updatedDonor = await donor.save();
//     res.json(updatedDonor);
//   } else {
//     res.status(404);
//     throw new Error('Donor not found');
//   }
// };

// // @desc    Delete donor
// // @route   DELETE /api/donors/:id
// // @access  Private
// donor.deleteDonor = async (req, res) => {
//   const donor = await Donor.findById(req.params.id);

//   if (donor) {
//     await donor.remove();
//     res.json({ message: 'Donor removed' });
//   } else {
//     res.status(404);
//     throw new Error('Donor not found');
//   }
// };

// // @desc    Search donors by blood type and location
// // @route   GET /api/donors/search
// // @access  Public
// donor.searchDonors = async (req, res) => {
//   const { bloodType, location } = req.query;

//   const query = {};
//   if (bloodType) query.bloodType = bloodType;
//   if (location) query.location = { $regex: location, $options: 'i' };

//   // Check if donor can donate (at least 56 days since last donation)
//   const eligibleDate = new Date();
//   eligibleDate.setDate(eligibleDate.getDate() - 56);

//   query.lastDonationDate = { $lte: eligibleDate };

//   const donors = await Donor.find(query);
//   res.json(donors);
// };

// export default donor;


// import Donor from "../models/donor.model.js";
// import { validationResult } from "express-validator";
// import getCoordinates from "../utils/geocode.js"; // ✅ Your custom geocode utility

// const donor = {};

// // CREATE DONOR
// donor.createDonor = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//   const { name, email, bloodGroup, address, phone } = req.body;

//   if (!name || !email || !bloodGroup || !address || !phone) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     const coordinates = await getCoordinates(address);
//     if (!coordinates) {
//       return res.status(400).json({ error: "Invalid address for geolocation" });
//     }

//     const newDonor = new Donor({
//       name,
//       email,
//       bloodGroup,
//       address,
//       phone,
//       location: {
//         type: "Point",
//         coordinates: coordinates
//       }
//     });

//     const createdDonor = await newDonor.save();
//     res.status(201).json(createdDonor);
//   } catch (err) {
//     console.error("Create Donor Error:", err.message);
//     res.status(500).json({ error: "Failed to create donor." });
//   }
// };

// // GET ALL DONORS
// donor.getAllDonors = async (req, res) => {
//   try {
//     const donors = await Donor.find();
//     res.json(donors);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch donors." });
//   }
// };

// // GET DONOR BY ID
// donor.getDonorById = async (req, res) => {
//   try {
//     const found = await Donor.findById(req.params.id);
//     if (!found) return res.status(404).json({ error: "Donor not found" });
//     res.json(found);
//   } catch (err) {
//     res.status(500).json({ error: "Error fetching donor" });
//   }
// };

// // UPDATE DONOR
// donor.updateDonor = async (req, res) => {
//   try {
//     const donorToUpdate = await Donor.findById(req.params.id);
//     if (!donorToUpdate) return res.status(404).json({ error: "Donor not found" });

//     const { name, email, bloodGroup, address, phone } = req.body;

//     if (address && address !== donorToUpdate.address) {
//       const coordinates = await getCoordinates(address);
//       if (!coordinates) {
//         return res.status(400).json({ error: "Invalid address for geolocation" });
//       }
//       donorToUpdate.location = {
//         type: "Point",
//         coordinates
//       };
//       donorToUpdate.address = address;
//     }

//     donorToUpdate.name = name || donorToUpdate.name;
//     donorToUpdate.email = email || donorToUpdate.email;
//     donorToUpdate.bloodGroup = bloodGroup || donorToUpdate.bloodGroup;
//     donorToUpdate.phone = phone || donorToUpdate.phone;

//     const updated = await donorToUpdate.save();
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update donor." });
//   }
// };

// // DELETE DONOR
// donor.deleteDonor = async (req, res) => {
//   try {
//     const donor = await Donor.findById(req.params.id);
//     if (!donor) return res.status(404).json({ error: "Donor not found" });

//     await donor.remove();
//     res.json({ message: "Donor removed" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to delete donor." });
//   }
// };

// // BASIC LINEAR SEARCH
// donor.searchDonors = async (req, res) => {
//   const { bloodGroup, address } = req.query;

//   const query = {};
//   if (bloodGroup) query.bloodGroup = bloodGroup;
//   if (address) query.address = { $regex: address, $options: "i" };

//   try {
//     const donors = await Donor.find(query);
//     res.json(donors);
//   } catch (err) {
//     res.status(500).json({ error: "Search failed." });
//   }
// };

// export default donor;


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
export const getDonorProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const donor = await Donor.findOne({ user: id }).populate("user");
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.json(donor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching donor" });
  }
};
