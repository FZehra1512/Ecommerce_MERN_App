import express from "express"
import { addProduct, deleteProduct, updateProduct } from "../controllers/adminController.js";
import { isAdminLoggedIn } from "../middleware/auth.js";

const router=express.Router()

router.post("/addProduct",isAdminLoggedIn,addProduct);
router.delete("/deleteProduct",isAdminLoggedIn,deleteProduct);
router.put("/updateProduct",isAdminLoggedIn,updateProduct);

export default router;
