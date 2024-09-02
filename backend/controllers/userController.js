import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    try {
        const { email, password, name, contact, address, gender } = req.body;
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
            address,
            gender
        });

        // Respond with success
        res
          .status(201)
          .json({ message: "User Created Successfully", user: newUser });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, isRememberMe } = req.body;

        const user = await User.findOne({ email }).exec();

        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }

        bcrypt.compare(password, user.password, function (error, result) {
            if (error) return res.status(500).json({ message: error.message });
            if (result == true) {
                const token = jwt.sign({ uId: user._id }, process.env.SECRET);
                // console.log(token);
                // Set the token as a cookie
                // res.cookie("token", token, {
                //     httpOnly: true,
                //     maxAge: isRememberMe ? 604800 * 1000 : 3600 * 1000, // Cookie expires in 7 days (604800 seconds) if remember me is true, otherwise 1 hour (3600 seconds)
                //     // secure: process.env.NODE_ENV === 'production',
                //     secure: false,
                //     sameSite: 'strict',
                //     path: '/',
                // });

                // Respond with success
                const { name, userType, email, contact, address, gender } = user;
                const responseUser = {
                    name, userType, email, contact, address, gender
                }
                res.status(200).json({ message: "User LoggedIn Successfully", user: responseUser, token:token });
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
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0), // Set expiry date to remove cookie
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });

    res.status(200).json({ message: "Logout successful" });
};
