import CartItem from "../models/cartItem.js";
import Order from "../models/order.js";
import Product from "../models/product.js";

const ORDER_STATUSES = ["placed", "processing", "completed", "cancelled"];

export const createOrder = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "sessionId is required" });
    }

    if (!req.user || req.user.role === 'admin') {
      return res.status(403).json({ message: "Only signed-in customers can place orders" });
    }

    const cartItems = await CartItem.find({ sessionId }).populate("product");

    if (!cartItems.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const items = cartItems.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found for ${item.name}` });
      }
      if (product.stockQuantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${item.name}` });
      }
    }

    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stockQuantity: -item.quantity },
      });
    }

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      sessionId,
      user: req.user._id,
      customerName: req.user.name || 'FurryNest Customer',
      customerEmail: req.user.email,
      items,
      totalPrice,
      paymentStatus: 'pending',
      paymentMethod: 'manual',
    });

    await CartItem.deleteMany({ sessionId });

    return res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    return res.status(500).json({ message: "Failed to place order", error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = req.user?.role === 'admin' ? {} : { user: req.user?._id };

    if (status) {
      if (!ORDER_STATUSES.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
        { 'items.name': { $regex: search, $options: 'i' } },
      ];
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

export const getOrderStats = async (req, res) => {
  try {
    const [allOrders, lowStockItems] = await Promise.all([
      Order.find({ status: { $ne: 'cancelled' } }).select('totalPrice status createdAt'),
      Product.countDocuments({ stockQuantity: { $lt: 10 } }),
    ]);

    const totalOrders = allOrders.length;
    const totalRevenue = allOrders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);
    const processingOrders = allOrders.filter((order) => order.status === 'processing').length;
    const completedOrders = allOrders.filter((order) => order.status === 'completed').length;

    return res.json({
      totalOrders,
      totalRevenue,
      processingOrders,
      completedOrders,
      lowStockItems,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch order stats', error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!ORDER_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json({ message: "Order status updated", order });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update order", error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json({ message: "Order deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete order", error: error.message });
  }
};
