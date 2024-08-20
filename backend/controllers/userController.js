import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    try {
        const { email, password, name, contact, address, gender,userType } = req.body;
        // Check if email already exists
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return res.status(400).json({ message: "Email Already Exists" });
        }
        // Password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await User.create({
            email,
            password: hashedPassword,
            name,
            contact,
            // profileImg,
            userType,
            address,
            gender
        });

        // Create a token for the user
        const token = jwt.sign({ uId: newUser._id }, process.env.SECRET);

        // Set the token as a cookie
        res.cookie("token", token);

        // Respond with success
        res.status(201).json({ message: "User Created Successfully"});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).exec();

        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }

        bcrypt.compare(password, user.password, function (error, result) {
            if (error) return res.status(500).json({ message: error.message });
            if (result == true) {
                const token = jwt.sign({ uId: user._id }, process.env.SECRET);

                // Set the token as a cookie
                res.cookie("token", token);

                // Respond with success
                res.status(200).json({ message: "User LoggedIn Successfully", user: user});
            }
            else if (result == false) {
                return res.status(404).json({ message: "User not Found" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true }); 
    res.status(200).json({ message: "Logout successful" });
};
