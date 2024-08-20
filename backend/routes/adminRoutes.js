import express from "express"
import { addProduct } from "../controllers/adminController.js";
import { isAdminLoggedIn } from "../middleware/auth.js";

const router=express.Router()

router.post("/addProduct",isAdminLoggedIn,addProduct);

export default router;
