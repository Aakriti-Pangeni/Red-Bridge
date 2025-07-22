

import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  address: { type: String, required: true },
  lastDonation: { type: String, default: null },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

// Create geospatial index for location
donorSchema.index({ location: "2dsphere" });

const Donor = mongoose.model("Donor", donorSchema);
export default Donor;
