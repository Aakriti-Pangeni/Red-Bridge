import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    userName :{type:String, required: true},
    email: {type:String, required:true},
    password:{type:String, required:true},
    dateOfBirth:{type:Date, required: true},
    // deletedAt: { type: Date, default: null}
},{timestamps:true})

const userModel = mongoose.model('User', userSchema)

export default userModel

