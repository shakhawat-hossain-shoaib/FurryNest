import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect.js";
import router from "./routes/routes.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });

// Connect to DB
connectDB();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(join(__dirname, 'uploads')));

// Routes
app.use("/api", router);

// Error handling
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
