
 

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phonenumber: {
    type: String,
    required: true
  },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpiry: { type: Date },
  isVerified: { type: Boolean, default: false },
  dateOfBirth: { type: Date },
  
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
