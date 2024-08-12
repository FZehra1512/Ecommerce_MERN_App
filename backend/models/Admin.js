import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "superadmin"],
    default: "admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema, "admins");
export default Admin;
