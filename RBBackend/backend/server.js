import app from "./main.js"
import dotenv from 'dotenv'
import connectDB from './database/config.js'

// Connect to MongoDB
connectDB();

dotenv.config()

const PORT = process.env.PORT || 4001

app.listen(PORT, ()=>{
    console.log(`Backend is Running on PORT http://localhost:${PORT}`)
})