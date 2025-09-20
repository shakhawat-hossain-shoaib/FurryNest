import Product from '../models/product.js';

// Get all products with optional category filter
export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
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
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product added successfully!", product });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
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
    
    if (product.stockQuantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }
    
    product.stockQuantity -= quantity;
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