// import express from 'express'
// import userRouter from './Router/user.router.js'
// import adminRouter from './Router/admin.router.js'
// import donorRouter from './Router/donor.router.js'

// import cors from 'cors';

// import searchRouter from './Router/search.router.js'

// const app = express();

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }))

// app.use(cors({
//     origin: 'http://localhost:5174',
//     credentials: true
// }))


// app.use(express.json())
// app.use('/search', searchRouter)
// app.use('/admin', adminRouter)
// app.use('/donor', donorRouter)
// app.use('/user', userRouter)


// app.get('/', (req, res)=>{
//     res.send('Welcome RedBridge Backend')
// })

// export default app



import express from 'express';
import cors from 'cors';

import userRouter from './Router/user.router.js';
import adminRouter from './Router/admin.router.js';
import donorRouter from './Router/donor.router.js';
import searchRouter from './Router/search.router.js';
import dashboardRouter from './Router/dashboard.router.js';

const app = express();

// ✅ CORS config for BOTH frontends (admin + user)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Routes
app.use('/search', searchRouter);
app.use('/admin', adminRouter);
app.use('/donor', donorRouter);
app.use('/user', userRouter);
app.use('/dashboard', dashboardRouter);
// ✅ Default route
app.get('/', (req, res) => {
  res.send('Welcome to RedBridge Backend');
});

export default app;
