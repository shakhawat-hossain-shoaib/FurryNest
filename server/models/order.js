import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserInfo", required: true, index: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    items: { type: [orderItemSchema], required: true },
    totalPrice: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["placed", "processing", "completed", "cancelled"],
      default: "placed",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "authorized", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: { type: String, default: "manual" },
    transactionId: { type: String, default: "" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
