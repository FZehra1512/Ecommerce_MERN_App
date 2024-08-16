import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Third party middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

// Function to create categories
// async function createCategories() {
//   try {
//     const categories = [
//       {
//         name: "Sectional Sofas",
//         description: "Versatile sectional sofas.",
//         imageUrl: null,
//         parentCategory: "66bdf07802724954940e03df",
//       },
//       {
//         name: "Recliners",
//         description: "Comfortable recliner chairs.",
//         imageUrl: null,
//         parentCategory: "66bdf07802724954940e03df",
//       },
//       {
//         name: "Abstract Paintings",
//         description: "Modern abstract artworks.",
//         imageUrl: null,
//         parentCategory: "66bdf07802724954940e03e0",
//       },
//       {
//         name: "Landscape Paintings",
//         description: "Beautiful landscapes in art.",
//         imageUrl: null,
//         parentCategory: "66bdf07802724954940e03e0",
//       },
//       {
//         name: "Table Lamps",
//         description: "Stylish table lamps for any room.",
//         imageUrl: null,
//         parentCategory: "66bdf07802724954940e03e1",
//       },
//       {
//         name: "Chandeliers",
//         description: "Elegant chandeliers for home decor.",
//         imageUrl: null,
//         parentCategory: "66bdf07802724954940e03e1",
//       },
//     ];

//     // Insert categories into the database
//     await Category.insertMany(categories);
//     console.log("Categories created successfully");
//   } catch (err) {
//     console.error("Error creating categories:", err);
//   }
// }

// Call the function to create categories


// TODO: Remove unnecessary code
