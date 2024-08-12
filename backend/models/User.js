import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    contact: { type: String }, // Can add a regex expression for validation e.g. match: /^[0-9]{10}$/
    profileImg: { type: String }, // Profile image is stored as a URL or file path
    address: [
      {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
        country: { type: String }, // Can set a default country f
      },
    ], // Array of strings for multiple addresses
    gender: { type: String, enum: ["Male", "Female"] }, // Enum for predefined gender options
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema, "users");
export default User;
