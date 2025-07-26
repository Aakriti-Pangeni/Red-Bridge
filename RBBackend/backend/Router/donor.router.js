


import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import {
  createDonor,
  getAllDonors,
  searchDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
  getDonorProfile,
  requestDonor, getDonorByUserId
} from '../controllers/donor.controller.js';

const router = express.Router();

router.post('/register', createDonor);
router.get('/', getAllDonors);
router.get('/search', searchDonors);


router.get("/profile/:id", getDonorProfile);
router.get('/user/:userId', getDonorByUserId);
router.post('/request', authMiddleware,  requestDonor);

// router.get("/:id", getDonorProfile);
router.get('/:id', getDonorById);
router.put('/:id', updateDonor);
router.delete('/:id', deleteDonor);
export default router;
