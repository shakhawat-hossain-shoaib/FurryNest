import express from "express";

import { createUser, registerUser } from "../controllers/userController.js";
import { createVolunteer, registerVolunteer } from "../controllers/volunteerController.js";
import { createDonation, listDonations } from "../controllers/donationController.js";
import { createContact } from "../controllers/contactController.js";
import { createPet, getPets, getPetCount } from "../controllers/petController.js";
import { getProducts, getProductById, createProduct, updateStock, addReview } from "../controllers/productController.js";
import upload from "../controllers/upload.js";

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
router.post("/pets", upload.single("image"), createPet);
router.get("/pets", getPets);
router.get("/pets/count", getPetCount);

// Product routes
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", createProduct);
router.put("/products/:id/stock", updateStock);
router.post("/products/:id/reviews", addReview);

export default router;
