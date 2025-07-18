import express from 'express';
import { linearSearch, knnSearch } from '../controllers/search.controller.js';
const router = express.Router();
router.get('/linear', linearSearch);
router.get('/knn', knnSearch);
export default router;
