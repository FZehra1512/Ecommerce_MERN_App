import Order from "../models/Order.js";
import Product from "../models/Product.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const addProduct = async (req, res) => {

    try {
        const { name, description, productImg, quantity, avgRating, price, salePercentage, productCategory } = req.body;
        const newProd = await Product.create({
            name, description, productImg, quantity, avgRating, price, salePercentage, productCategory
        })
        await newProd.save();
        res.send({
            message: "Admin add product API",
            user: req.user, // Sending user details in the response
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { uId } = req.body;
        // const product = await Product.findById(uId).exec();
        const orders = await Order.find({
            products: { $elemMatch: { productId: uId } },
        });
        if (orders.length !== 0) return res.status(400).json({ message: "Cannot delete Product", order: orders })
        await Product.deleteOne({ _id: uId });
        return res.status(200).json({ message: "Product deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { uId, name, description, quantity, productImg, price, salePercentage, productCategory } = req.body;
        const updateData = {
            name, description, quantity, productImg, price, salePercentage, productCategory
        }
        const placedOrders = await Order.find({
            products: { $elemMatch: { productId: uId, status: "Placed" } },
        });
        if (placedOrders.length >= quantity) {
            return res.status(400).json({ message: `Orders are being placed, cannot decrease orders less than ${placedOrders.length}` });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            uId,
            updateData,
            { new: true, runValidators: true }
        );

        return res.status(200).json({ message: "Product Updated Successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const checkAdmin=async(req,res)=>{
    try {
        // console.log(req.cookies);
        let token = req.cookies.token; //token from client browser
        console.log(token);
        if (!token) return res.status(404).json({ message: "token ni mila User" });
        const decoded = jwt.verify(token, process.env.SECRET);

        // Finding the user by ID from the decoded token
        const decodedUser = await User.findById(decoded.uId).exec();

        if (!decodedUser) return res.status(404).json({ message: " user ni mila Unauthorized User" });

        // Check if the user is authorized
        if (decodedUser.userType === "user" || decodedUser.userType === "adminInProcess") {
            return res.status(401).json({ message: "user not admin Unauthorizeasdad User" });
        }

        return res.status(200).json({ message: "Admin logged in successfully",userType:decodedUser.userType });
    } catch (error) {
        res.status(500).json({ message: `${error.message}` });
    }
}