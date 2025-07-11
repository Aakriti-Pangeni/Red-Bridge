import express from 'express'
import userRouter from './Router/user.router.js'

const app = express();

app.use(express.json())

app.use('/user', userRouter)
app.get('/', (req, res)=>{
    res.send('Welcome RedBridge Backend')
})

export default app