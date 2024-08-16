const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: {
      dimension: { type: String }, // Can customize this schema based on the product e.g color, weight etc
      material: { type: String },
      detailedDescription: { type: String },
    }, // Description is an object
    productImg: { type: String }, // URL or file path for product image
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity must be non negative"],
    },
    avgRating: {
      type: Number,
      default: 0,
      min: [0, "Rating must be between 0 and 5"],
      max: [5, "Rating must be between 0 and 5"],
    },
    price: { type: Number, required: true },
    salePercentage: {
      type: Number,
      default: 0,
      min: [0, "Sale percentage must be between 0 and 100"],
      max: [100, "Sale percentage must be between 0 and 100"],
    }, // Sale percentage as a double
    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Product =mongoose.models.Product || mongoose.model("Product", productSchema, "products");


module.exports = Product;
