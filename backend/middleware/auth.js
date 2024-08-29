import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isAdminLoggedIn = async (req, res, next) => {
    try {
        let token = req.cookies.token; //token from client browser
        console.log(`token hai:${token}`);
        if (!token) return res.status(404).json({ message: "Unauthorized User" });
        const decoded = jwt.verify(token, process.env.SECRET);

        // Finding the user by ID from the decoded token
        const decodedUser = await User.findById(decoded.uId).exec();

        if (!decodedUser) return res.status(404).json({ message: "Unauthorized User" });

        // Check if the user is authorized
        if (decodedUser.userType === "user" || decodedUser.userType === "adminInProcess") {
            return res.status(401).json({ message: "Unauthorizeasdad User" });
        }

        req.user = decodedUser; // Pass the user to the next middleware
        next();
    } catch (error) {
        return res.status(500).json({ message: "Unauthorized User from catch" });
    }
};
