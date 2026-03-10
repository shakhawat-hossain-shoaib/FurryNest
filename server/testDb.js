import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

async function testConnection() {
  try {
    console.log('MongoDB URI:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Successfully connected to MongoDB!');

    // Create a test document
    const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
    const testDoc = new TestModel({ name: 'test' });
    await testDoc.save();
    console.log('Successfully saved test document!');

    // Delete the test document
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('Successfully deleted test document!');

    await mongoose.connection.close();
    console.log('Connection closed successfully!');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

testConnection();