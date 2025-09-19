import express from "express";
import { createUser, registerUser } from "../controllers/userController.js";
import { createVolunteer, registerVolunteer } from "../controllers/volunteerController.js";
import { createDonation, listDonations } from "../controllers/donationController.js";
import { createContact } from "../controllers/contactController.js";
import { uploadPet, getPets } from "../controllers/petController.js";

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

// Contact routes
router.post("/contact", createContact);

// Pet routes
router.post("/upload", uploadPet);
router.get("/pets", getPets);

export default router;
