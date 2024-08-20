import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }, // Price at the time of order
      },
    ],
    status: {
      type: String,
      required: true,
      enum: [
        "Placed",
        "Processing",
        "Dispatched",
        "Delivered",
        "Cancelled",
      ], // Can be customized
    },
    totalBill: { type: Number, required: true },
    shippingAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String },
    },
    billingAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String },
    },
    paymentAt: { type: Date },
  },
  { timestamps: true }
);

const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema, "orders");
export default Order;
