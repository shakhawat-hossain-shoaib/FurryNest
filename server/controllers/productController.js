import Product from '../models/product.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../uploads');

const toUploadsPath = (imageUrl) => {
  if (!imageUrl) return null;
  const clean = imageUrl.startsWith('/uploads/') ? imageUrl.replace('/uploads/', '') : imageUrl;
  return path.join(uploadsDir, clean);
};

const removeImageIfExists = (imageUrl) => {
  const imagePath = toUploadsPath(imageUrl);
  if (imagePath && fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
};

const buildProductPayload = (body, imageUrl) => ({
  name: body.name,
  category: body.category,
  price: body.price,
  description: body.description,
  stockQuantity: body.stockQuantity,
  ...(imageUrl ? { imageUrl } : {}),
});

// Get all products with optional category filter
export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = category ? { category } : {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

// Add a new product
export const createProduct = async (req, res) => {
  try {
    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const product = new Product(buildProductPayload(req.body, imageUrl));
    await product.save();
    res.status(201).json({ message: "Product added successfully!", product });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    let imageUrl = existingProduct.imageUrl;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
      removeImageIfExists(existingProduct.imageUrl);
    }

    const product = await Product.findByIdAndUpdate(req.params.id, buildProductPayload(req.body, imageUrl), {
      new: true,
      runValidators: true,
    });

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    removeImageIfExists(product.imageUrl);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};

// Update a product's stock
export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    const normalizedQuantity = Number(quantity);
    if (!Number.isFinite(normalizedQuantity)) {
      return res.status(400).json({ message: "Quantity must be a valid number" });
    }

    product.stockQuantity = normalizedQuantity;
    await product.save();
    
    res.json({ message: "Stock updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating stock", error: error.message });
  }
};

// Add a review to a product
export const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, rating, comment } = req.body;
    
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    product.reviews.push({ user, rating, comment });
    
    // Update average rating
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    product.rating = totalRating / product.reviews.length;
    
    await product.save();
    res.json({ message: "Review added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error: error.message });
  }
};