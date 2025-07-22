


import express from 'express';
import {
  createDonor,
  getAllDonors,
  searchDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
  getDonorProfile
} from '../controllers/donor.controller.js';

const router = express.Router();

router.post('/register', createDonor);
router.get('/', getAllDonors);
router.get('/search', searchDonors);
router.get('/:id', getDonorById);
router.put('/:id', updateDonor);
router.delete('/:id', deleteDonor);
router.get("/profile/:id", getDonorProfile);
// router.get("/:id", getDonorProfile);

export default router;
