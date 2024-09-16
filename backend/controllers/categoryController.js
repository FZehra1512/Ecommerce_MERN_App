import Category from "../models/Category.js"

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

// {
//     "name" : "LED",
//     "description" : "Explore the most attractive range of indoor LED lights",
//     "parentCategory" : "66bdf07802724954940e03e1"
// }