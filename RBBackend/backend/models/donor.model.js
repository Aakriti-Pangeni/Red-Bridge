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
  donationCount: { type: Number, default: 0 },
  
  // Approval fields
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  approvedAt: {
    type: Date,
    default: null
  },
  rejectionReason: {
    type: String,
    default: null
  },
  
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true
});

// Virtual field for verified status (only for approved donors)
donorSchema.virtual('isVerified').get(function() {
  return this.status === 'approved' && this.donationCount >= 2;
});


donorSchema.set('toJSON', { virtuals: true });

// Geospatial index for location
donorSchema.index({ location: "2dsphere" });
donorSchema.index({ status: 1 });

const Donor = mongoose.model("Donor", donorSchema);
export default Donor;
