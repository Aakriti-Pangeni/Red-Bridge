import express from "express";
import {Checklist} from "../controllers/checklist.controllers.js";

const router = express.Router();

router.post("/submit", Checklist);

export default router;
