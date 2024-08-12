import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    }, // Category name, unique and required
    description: {
      type: String,
      trim: true,
    }, // Optional description of the category
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    }, // Reference to a parent category for subcategories (if any)
    imageUrl: {
      type: String,
      default: null,
    }, // URL for category image, if any
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category ||
  mongoose.model("Category", categorySchema, "categories");
export default Category;
