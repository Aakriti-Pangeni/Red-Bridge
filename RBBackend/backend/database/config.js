import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL)
    console.log('MongoDb connected Successfully')
  } catch (err) {
    console.log(err)
    console.error(`${err}, Something went Wrong`)
  }
}

export default connectDB;
