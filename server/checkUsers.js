import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import UserInfo from './models/user_info.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to MongoDB!');
    
    const users = await UserInfo.find({});
    console.log('Users in DB:', users.length);
    if(users.length > 0) {
      console.log(users.map(u => ({ email: u.email, role: u.role })));
    }
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkUsers();
