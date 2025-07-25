import express from 'express';
import { getDashboardStats, getBloodDistribution } from '../controllers/dashboard.controller.js';

const router = express.Router();

router.get('/stats', getDashboardStats);
router.get('/blood-distribution', getBloodDistribution);

export default router;