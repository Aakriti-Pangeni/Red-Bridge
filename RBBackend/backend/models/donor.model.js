// import mongoose from 'mongoose';

// const donorSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     trim: true,
//     maxlength: [100, 'Name cannot be more than 100 characters']
//   },
//   bloodType: {
//     type: String,
//     required: [true, 'Blood type is required'],
//     enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
//   },
//   location: {
//     type: String,
//     required: [true, 'Location is required'],
//     trim: true,
//     maxlength: [100, 'Location cannot be more than 100 characters']
//   },
//   contactNumber: {
//     type: String,
//     required: [true, 'Contact number is required'],
//     match: [/^\+?[\d\s-]{10,}$/, 'Please enter a valid phone number']
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
//   },
//   lastDonationDate: {
//     type: Date,
//     default: null
//   },
//   age: {
//     type: Number,
//     required: [true, 'Age is required'],
//     min: [17, 'Donor must be at least 17 years old'],
//     max: [65, 'Donor cannot be older than 65 years']
//   },
//   medicalHistory: {
//     type: String,
//     trim: true,
//     maxlength: [500, 'Medical history cannot be more than 500 characters']
//   }
//   // createdAt: {
//   //   type: Date,
//   //   default: Date.now
//   // }
// }, {
//   timestamps: true
// });

// export default mongoose.model('Donor', donorSchema);


// import mongoose from "mongoose";

// const donorSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   bloodGroup: { type: String, required: true },
//   address: { type: String, required: true },
//   phone: { type: String, required: true },
//   role: {
//     type: String,
//     enum: ['donor'],
//     default: 'donor'
//   },
//   location: {
//     type: {
//       type: String,
//       enum: ['Point'],
//       default: 'Point'
//     },
//     coordinates: {
//       type: [Number], // [lng, lat]
//       required: true
//     }
//   }
// });

// donorSchema.index({ location: "2dsphere" });

// const Donor = mongoose.model("Donor", donorSchema);
// export default Donor;





// import mongoose from "mongoose";

// const donorSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   bloodGroup: { type: String, required: true },
//   address: { type: String, required: true },
//   phone: { type: String, required: true },
//   role: {
//     type: String,
//     enum: ['donor'],
//     default: 'donor'
//   },
//   location: {
//     type: {
//       type: String,
//       enum: ['Point'],
//       default: 'Point'
//     },
//     coordinates: {
//       type: [Number], // [lng, lat]
//       required: true
//     }
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
// });

// donorSchema.index({ location: "2dsphere" });

// const Donor = mongoose.model("Donor", donorSchema);
// export default Donor;


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
