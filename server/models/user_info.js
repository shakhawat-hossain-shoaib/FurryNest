import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userinfoSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Please enter your name'] 
    },
    email: { 
      type: String, 
      required: [true, 'Please enter your email'], 
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please enter a valid email'
      }
    },
    phone: { 
      type: String, 
      required: [true, 'Please enter your phone number'] 
    },
    password: { 
      type: String, 
      required: [true, 'Please enter a password'],
      minlength: [8, 'Password must be at least 8 characters long']
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    }
  },
  { timestamps: true }
);

// Static signup method
userinfoSchema.statics.signup = async function(name, email, phone, password) {
  // Validation
  if (!email || !password || !name || !phone) {
    throw Error('All fields are required');
  }
  if (!validator.isEmail(email)) {
    throw Error('Invalid email');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }

  // Check if email exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error('Email already in use');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create user
  const user = await this.create({ name, email, phone, password: hash });

  return user;
};

// Static login method
userinfoSchema.statics.login = async function(email, password) {
  // Validation
  if (!email || !password) {
    throw Error('All fields are required');
  }

  // Find user
  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Invalid login credentials');
  }

  // Compare passwords
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Invalid login credentials');
  }

  return user;
};

const UserInfo = mongoose.model("UserInfo", userinfoSchema, "user_info");

export default UserInfo;
