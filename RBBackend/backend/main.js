import express from 'express';
import cors from 'cors';

import userRouter from './Router/user.router.js';
import adminRouter from './Router/admin.router.js';
import donorRouter from './Router/donor.router.js';
import searchRouter from './Router/search.router.js';
import dashboardRouter from './Router/dashboard.router.js';
import requestRouter from './Router/request.router.js';
import contactRouter from './Router/contact.router.js';

const app = express();


app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

//  Routes
app.use('/api/requests', requestRouter); 
app.use('/api', searchRouter); 
app.use('/search', searchRouter);
app.use('/admin', adminRouter);
app.use('/donor', donorRouter);
app.use('/user', userRouter);
app.use('/dashboard', dashboardRouter);
app.use('/api', contactRouter);

// Default route

app.get('/', (req, res) => {
  res.send('Welcome to RedBridge Backend');
});

export default app;
