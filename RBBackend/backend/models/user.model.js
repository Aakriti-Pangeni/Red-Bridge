// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   userName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   dateOfBirth: { type: Date, required: true },
//    role: {
//     type: String,
//     enum: ['user', 'donor', 'admin'],
//     default: 'user'
//   }
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);

// export default User;
 

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  address: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'donor', 'admin'],
    default: 'user'
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
  }
});

userSchema.index({ location: "2dsphere" });

const User = mongoose.model('User', userSchema);
export default User;
