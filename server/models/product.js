import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['Dog Food', 'Cat Food', 'Pet Toys'] },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  rating: { type: Number, default: 0 },
  stockQuantity: { type: Number, required: true, default: 100 },
  reviews: [{
    user: { type: String },
    rating: { type: Number },
    comment: { type: String },
    date: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

export default Product;