import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect.js";
import router from "./routes/routes.js";

dotenv.config();

// Connect to DB
connectDB();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
