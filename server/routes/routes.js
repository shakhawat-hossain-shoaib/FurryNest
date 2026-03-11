import express from "express";
import { adminMiddleware, authMiddleware } from "../middleware/auth.js";
import { createUser, loginUser, verifyToken } from "../controllers/userController.js";
import { loginAdmin, verifyAdminToken } from "../controllers/adminController.js";
import { createVolunteer, registerVolunteer } from "../controllers/volunteerController.js";
import { createDonation, listDonations, getDonationStats } from "../controllers/donationController.js";
import { createContact, listContacts, updateContactStatus, deleteContact } from "../controllers/contactController.js";
import {
	createPet,
	getPets,
	getManagePets,
	getPetCount,
	getPetById,
	requestPet,
	getPendingPets,
	approvePet,
	rejectPet,
	updatePet,
	deletePet,
	updatePetStatus,
} from "../controllers/petController.js";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, updateStock, addReview } from "../controllers/productController.js";
import { getCartItems, addCartItem, updateCartItemQuantity, deleteCartItem, clearCart } from "../controllers/cartController.js";
import { createOrder, getOrders, getOrderStats, updateOrderStatus, deleteOrder } from "../controllers/orderController.js";
import { listBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from "../controllers/blogController.js";
import {
  listSuccessStories,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory,
} from "../controllers/successStoryController.js";
import upload from "../controllers/upload.js";

const router = express.Router();

// User routes
router.post("/users", createUser);
router.post("/users/login", loginUser);
router.get("/users/verify", authMiddleware, verifyToken);

// Admin routes
router.post("/admin/login", loginAdmin);
router.get("/admin/verify", authMiddleware, verifyAdminToken);

// Volunteer routes
router.get("/volunteers", registerVolunteer);
router.post("/volunteers", createVolunteer);

// Donation routes
router.get("/donations", listDonations);
router.post("/donations", createDonation);
router.get("/donations/stats", authMiddleware, adminMiddleware, getDonationStats);

// Contact routes
router.post("/contact", createContact);
router.get("/contacts", authMiddleware, adminMiddleware, listContacts);
router.patch("/contacts/:id/status", authMiddleware, adminMiddleware, updateContactStatus);
router.delete("/contacts/:id", authMiddleware, adminMiddleware, deleteContact);

// Pet routes
router.post("/pets", authMiddleware, adminMiddleware, upload.single("image"), createPet);
router.get("/pets", getPets);
router.get("/pets/manage", authMiddleware, adminMiddleware, getManagePets);
router.get("/pets/count", getPetCount);
router.get("/pets/:id", getPetById);
router.post("/pets/request", upload.single("image"), requestPet);
router.get("/pets/pending", authMiddleware, adminMiddleware, getPendingPets);
router.put("/pets/:id/approve", authMiddleware, adminMiddleware, approvePet);
router.delete("/pets/:id/reject", authMiddleware, adminMiddleware, rejectPet);
router.put("/pets/:id", authMiddleware, adminMiddleware, upload.single("image"), updatePet);
router.patch("/pets/:id/status", authMiddleware, adminMiddleware, updatePetStatus);
router.delete("/pets/:id", authMiddleware, adminMiddleware, deletePet);

// Product routes
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", authMiddleware, adminMiddleware, upload.single("image"), createProduct);
router.put("/products/:id", authMiddleware, adminMiddleware, upload.single("image"), updateProduct);
router.delete("/products/:id", authMiddleware, adminMiddleware, deleteProduct);
router.put("/products/:id/stock", authMiddleware, adminMiddleware, updateStock);
router.post("/products/:id/reviews", addReview);

// Cart routes
router.get("/cart", getCartItems);
router.post("/cart", addCartItem);
router.patch("/cart/:id", updateCartItemQuantity);
router.delete("/cart/:id", deleteCartItem);
router.delete("/cart", clearCart);

// Order routes
router.get("/orders", authMiddleware, getOrders);
router.get("/orders/stats", authMiddleware, adminMiddleware, getOrderStats);
router.post("/orders", authMiddleware, createOrder);
router.patch("/orders/:id/status", authMiddleware, adminMiddleware, updateOrderStatus);
router.delete("/orders/:id", authMiddleware, adminMiddleware, deleteOrder);

// Blog routes
router.get("/blogs", listBlogs);
router.get("/blogs/:id", getBlogById);
router.post("/blogs", authMiddleware, adminMiddleware, createBlog);
router.put("/blogs/:id", authMiddleware, adminMiddleware, updateBlog);
router.delete("/blogs/:id", authMiddleware, adminMiddleware, deleteBlog);

// Success stories routes
router.get("/success-stories", listSuccessStories);
router.post("/success-stories", authMiddleware, adminMiddleware, createSuccessStory);
router.put("/success-stories/:id", authMiddleware, adminMiddleware, updateSuccessStory);
router.delete("/success-stories/:id", authMiddleware, adminMiddleware, deleteSuccessStory);

export default router;
