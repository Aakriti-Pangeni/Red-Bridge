import express from 'express'
import userRouter from './Router/user.router.js'
import admminRouter from './Router/admin.router.js'
import donorRouter from './Router/donor.router.js'
import cors from 'cors';

// import searchRouter from './Router/search.router.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
// app.use('/search', searchRouter)
app.use('/admin', admminRouter)
app.use('/donor', donorRouter)
app.use('/user', userRouter)

app.get('/', (req, res)=>{
    res.send('Welcome RedBridge Backend')
})

export default app