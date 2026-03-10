import CartItem from "../models/cartItem.js";
import Product from "../models/product.js";

export const getCartItems = async (req, res) => {
  try {
    const { sessionId } = req.query;

    if (!sessionId) {
      return res.status(400).json({ message: "sessionId is required" });
    }

    const items = await CartItem.find({ sessionId }).populate("product");
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch cart items", error: error.message });
  }
};

export const addCartItem = async (req, res) => {
  try {
    const { sessionId, productId, quantity = 1 } = req.body;

    if (!sessionId || !productId) {
      return res.status(400).json({ message: "sessionId and productId are required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const requestedQty = Math.max(1, Number(quantity) || 1);

    const existing = await CartItem.findOne({ sessionId, product: productId });
    if (existing) {
      existing.quantity = existing.quantity + requestedQty;
      await existing.save();
      const populated = await existing.populate("product");
      return res.json({ message: "Cart updated", item: populated });
    }

    const item = await CartItem.create({
      sessionId,
      product: productId,
      quantity: requestedQty,
    });

    const populated = await item.populate("product");
    return res.status(201).json({ message: "Item added to cart", item: populated });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add item to cart", error: error.message });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const normalizedQty = Number(quantity);
    if (!Number.isFinite(normalizedQty) || normalizedQty < 1) {
      return res.status(400).json({ message: "quantity must be >= 1" });
    }

    const item = await CartItem.findById(id).populate("product");
    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    item.quantity = normalizedQty;
    await item.save();

    return res.json({ message: "Cart item updated", item });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update cart item", error: error.message });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await CartItem.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    return res.json({ message: "Cart item removed" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete cart item", error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { sessionId } = req.query;
    if (!sessionId) {
      return res.status(400).json({ message: "sessionId is required" });
    }

    await CartItem.deleteMany({ sessionId });
    return res.json({ message: "Cart cleared" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to clear cart", error: error.message });
  }
};
