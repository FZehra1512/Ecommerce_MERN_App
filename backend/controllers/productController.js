import Product from "../models/Product.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products)
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const makeProduct=async(req,res)=>{
  try {
    const {name,description,productImg,quantity,price,salePercentage,productCategoryId}=req.body;

    const newProduct = new Product({
      name,
      description,
      productImg,
      quantity,
      price,
      salePercentage,
      productCategory:productCategoryId,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();
    // Send the saved product as a response
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
