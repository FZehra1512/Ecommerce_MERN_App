import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { email, password, name, contact, profileImg, userType, address, gender } = req.body;

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
      profileImg,
      userType,
      address,
      gender
    });

    // Create a token for the user
    const token = jwt.sign({ uId: newUser._id }, process.env.SECRET);

    // Set the token as a cookie
    res.cookie("token", token);

    // Respond with success
    res.status(201).json({ message: "User Created Successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
