import Category from "../models/Category.js"
import Product from "../models/Product.js"
import Order from "../models/Order.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.set("Cache-Control", "public, max-age=3600");
        res.set("Cache-Tag", "categories"); // Cache for 1 hour
        res.status(200).json(categories);
    } catch (error){
        res.status(500).json({ message : "Internal Server Error"})
    }
}

export const addCategory = async (req, res) => {
    try {
      // Parse category data safely
      let categoryData;
      try {
        categoryData = JSON.parse(req.body.categoryData);
      } catch (error) {
        return res
          .status(403)
          .json({ message: "Invalid category data format" });
      }
      const { name, description, parentCategory } = categoryData;

      // Check if the category name already exists
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res
          .status(400)
          .json({ message: "Category with this name already exists" });
      }

      // Handle file upload if file is present
      let imageUploaded = null;
      if (req.file) {
        imageUploaded = await uploadOnCloudinary(req.file.path);
        console.log("imageUploaded: ", imageUploaded);
      }

      // Create the new category
      const newCategory = await Category.create({
        name,
        description,
        parentCategory,
        imageUrl: imageUploaded,
      });

      res.set("Cache-Control", "no-cache"); // Invalidate cache on add category
      res.set("Cache-Tag", "categories=invalid");

      res
        .status(201)
        .json({ message: "Category added successfully", newCategory });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while adding the category", error: error.message });
    }
};

export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    // Parse category data safely
    let categoryData;
    try {
      categoryData = JSON.parse(req.body.categoryData);
    } catch (error) {
      return res.status(403).json({ message: "Invalid category data format" });
    }
    const { name, description, parentCategory } = categoryData;

    // Find the category to update
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update the fields
    category.name = name;
    category.description = description;
    category.parentCategory = parentCategory;

    // Handle image upload and deletion
    if (req.file) {
      const imageUploaded = await uploadOnCloudinary(req.file.path);

      // Delete old image if it exists
      if (category.imageUrl) {
        // TODO: confirm the public id is correctly extracted
        const publicId = category.imageUrl.split("/").pop().split(".")[0]; // Extract public ID
        await deleteFromCloudinary(publicId); // Delete old image from Cloudinary
      }

      // Update imageUrl field
      category.imageUrl = imageUploaded.secure_url;
    }

    // Save the updated category
    await category.save();

    return res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export const deleteCategory = async (req, res) => {
  try {
    const { categoryId, nullSubCategory } = req.params;

    // If requested, Update subcategories' parentCategory to null
    if (nullSubCategory) {
      await Category.updateMany(
        { parentCategory: categoryId },
        { parentCategory: null }
      );
    }
  
    // Delete all products in the category
    await Product.deleteMany({ category: categoryId });
    
    const category = await Category.findById(categoryId);

    // Delete image from cloudinary 
    if (category.imageUrl) {
      // TODO: confirm the public id is correctly extracted
      const publicId = category.imageUrl.split("/").pop().split(".")[0]; // Extract public ID
      await deleteFromCloudinary(publicId); // Delete image from Cloudinary
    }

    // Delete the category itself
    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
     res.status(500).json({ message: "Internal Server Error" });
  }
}


export const checkCategoryForDeletion = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Check if the category has any sub categories
    const subcategories = await Category.find({ parentCategory: categoryId });
    if (subcategories.length > 0) {
      return res.status(409).json({
        message: "Category has subcategories",
        action: "DELETE_WITH_SUBCATEGORY_UPDATE",
        subcategories,
      });
    }

    // Check if products in this category are part of any orders
    const productsInCategory = await Product.find({ category: categoryId });
    const orderedProducts = await Order.find({
      "products.productId": { $in: productsInCategory.map((p) => p._id) },
    });

    if (orderedProducts.length > 0) {
      return res.status(403).json({
        message: "Category cannot be deleted as its products are part of orders.",
        action: "CANNOT_DELETE",
      });
    }

    // If no orders, prompt for product deletion
    if (productsInCategory.length > 0) {
      return res.status(200).json({
        message: `Category has ${productsInCategory.length} products`,
        action: "DELETE_WITH_PRODUCTS",
        productCount: productsInCategory.length,
      });
    }

    // If no products, return response to proceed with category deletion
    res.status(200).json({
      message: "Category can be deleted safely.",
      action: "PROCEED_TO_DELETE",
    });
  } catch (error) {
     res.status(500).json({ message: "Internal Server Error" });
  }
}