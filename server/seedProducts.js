import Product from './models/product.js';
import connectDB from './db/connect.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleProducts = [
  {
    name: "Premium Dog Food",
    category: "Dog Food",
    price: 29.99,
    description: "High-quality nutrition for healthy dogs, made with real meat and vegetables",
    stockQuantity: 100,
    rating: 4.8
  },
  {
    name: "Gourmet Cat Food",
    category: "Cat Food",
    price: 24.99,
    description: "Delicious meals cats absolutely love, with premium ingredients",
    stockQuantity: 100,
    rating: 4.9
  },
  {
    name: "Interactive Ball Toy",
    category: "Pet Toys",
    price: 12.99,
    description: "Durable and interactive ball that keeps pets active and entertained",
    stockQuantity: 50,
    rating: 4.6
  },
  {
    name: "Organic Puppy Treats",
    category: "Dog Food",
    price: 18.99,
    description: "Natural, organic treats perfect for training growing puppies",
    stockQuantity: 75,
    rating: 4.7
  },
  {
    name: "Catnip Mouse Toy",
    category: "Pet Toys",
    price: 8.99,
    description: "Irresistible fun for curious cats, filled with premium catnip",
    stockQuantity: 80,
    rating: 4.5
  },
  {
    name: "Senior Cat Formula",
    category: "Cat Food",
    price: 32.99,
    description: "Specially formulated food for older cats with added supplements",
    stockQuantity: 60,
    rating: 4.8
  },
  {
    name: "Durable Rope Chew Toy",
    category: "Pet Toys",
    price: 15.99,
    description: "Strong rope toy perfect for aggressive chewers",
    stockQuantity: 40,
    rating: 4.4
  },
  {
    name: "Grain-Free Dog Food",
    category: "Dog Food",
    price: 34.99,
    description: "Premium grain-free formula for dogs with sensitive stomachs",
    stockQuantity: 90,
    rating: 4.9
  }
];

const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});

    // Insert sample products
    await Product.insertMany(sampleProducts);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedProducts();