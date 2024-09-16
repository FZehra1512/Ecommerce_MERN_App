import express from "express"
import { addProduct, deleteProduct, updateProduct, checkAdmin } from "../controllers/adminController.js";
import { getCategories, addCategory } from "../controllers/categoryController.js";
import { isAdminLoggedIn } from "../middleware/auth.js";
import { categoryUpload, upload } from "../middleware/multer.js";

const router = express.Router()

router.get("/checkAdmin",checkAdmin);

router.post("/addProduct", isAdminLoggedIn,upload ,addProduct);
router.delete("/deleteProduct", isAdminLoggedIn, deleteProduct);
router.put("/updateProduct", isAdminLoggedIn, updateProduct);

router.get("/getCategories", getCategories);
router.post("/addCategory", isAdminLoggedIn, categoryUpload, addCategory);

export default router;
