import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log("MongoDB connected successfully");
    
    // Add connection error handler
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    // Add disconnection handler
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  }
};

export default connectDB;
