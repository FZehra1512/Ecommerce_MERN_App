import Category from "../models/Category.js";
import Product from "../models/Product.js";
// import Category from "../models/Category.js";
// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate({
        path: "productCategory",
        select: "name description parentCategory", // Select only the fields you need
      })
      .exec();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getSpecificProduct = async (req, res) => {
  try {
    const productId = req.params.id; // Correctly capture the ID from params
    // Example: Fetch product from database
    const product = await Product.findById(productId); // Replace with actual database call
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Send product details
    console.log(product.productCategory);
    const category = await Category.findById(product.productCategory); // Replace with actual database call
    res.status(200).json({product,category});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const makeProduct = async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       productImg,
//       quantity,
//       price,
//       salePercentage,
//       productCategory,
//     } = req.body;

//     const newProduct = new Product({
//       name,
//       description,
//       productImg,
//       quantity,
//       price,
//       salePercentage,
//       productCategory,
//     });

//     // Check if product already exists
//     let existingProduct = await Product.findOne({ name: newProduct.name }); // Await the findOne operation
//     if (existingProduct) {
//       return res.status(400).json({ message: "Product Already exists" });
//     }

//     // Save the product to the database
//     const savedProduct = await newProduct.save();

//     // Send the saved product as a response
//     return res
//       .status(201)
//       .json({ message: "Product created successfully", product: savedProduct });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

