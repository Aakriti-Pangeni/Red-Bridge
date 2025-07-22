// import express from 'express';
// import donorController from '../controllers/donor.controller.js';
// import { getDonorProfile } from "../controllers/donor.controller.js";

// const router = express.Router();

// // Create donor
// router.post('/register', donorController.createDonor);

// // Get all donors
// router.get('/', donorController.getAllDonors);

// // Search donors by blood type and location
// router.get('/search', donorController.searchDonors);

// // Get a specific donor by ID
// router.get('/:id', donorController.getDonorById);

// // Update donor by ID
// router.put('/:id', donorController.updateDonor);

// // Delete donor by ID
// router.delete('/:id', donorController.deleteDonor);


// router.get("/profile/:id", getDonorProfile);

// export default router;


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
