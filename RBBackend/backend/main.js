import express from 'express'
import userRouter from './Router/user.router.js'
import admminRouter from './Router/admin.router.js'
import donorrouter from './Router/donor.router.js'
// import searchRouter from './Router/search.router.js'

const app = express();

app.use(express.json())
// app.use('/search', searchRouter)
app.use('/admin', admminRouter)
app.use('/donor', donorrouter)
app.use('/user', userRouter)

app.get('/', (req, res)=>{
    res.send('Welcome RedBridge Backend')
})

export default app