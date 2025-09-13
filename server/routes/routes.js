import express from "express";
import { createUser, registerUser } from "../controllers/userController.js";
import { createVolunteer, registerVolunteer } from "../controllers/volunteerController.js";
import { createDonation, listDonations } from "../controllers/donationController.js";

const router = express.Router();

// User routes
router.get("/users", registerUser);
router.post("/users", createUser);

// Volunteer routes
router.get("/volunteers", registerVolunteer);
router.post("/volunteers", createVolunteer);

// Donation routes
router.get("/donations", listDonations);
router.post("/donations", createDonation);

export default router;
