


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
  requestDonor
} from '../controllers/donor.controller.js';

const router = express.Router();

router.post('/register', createDonor);
router.get('/', getAllDonors);
router.get('/search', searchDonors);
router.get('/:id', getDonorById);
router.put('/:id', updateDonor);
router.delete('/:id', deleteDonor);
router.get("/profile/:id", getDonorProfile);
router.post('/request/', requestDonor);
// router.get("/:id", getDonorProfile);

export default router;
