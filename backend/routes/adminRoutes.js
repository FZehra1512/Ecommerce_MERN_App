import express from "express"
import { addProduct, deleteProduct, updateProduct, checkAdmin } from "../controllers/adminController.js";
import { getCategories, addCategory, checkCategoryForDeletion, deleteCategory, updateCategory } from "../controllers/categoryController.js";
import { isAdminLoggedIn } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router = express.Router()

router.get("/checkAdmin",checkAdmin);

router.post(
  "/addProduct",
  isAdminLoggedIn,
  upload.array("productImg", 5),
  addProduct
);
router.delete("/deleteProduct/:id", isAdminLoggedIn, deleteProduct);
router.put("/updateProduct", isAdminLoggedIn, updateProduct);

router.get("/getCategories", getCategories);
router.post("/addCategory", isAdminLoggedIn, upload.single("categoryImg"), addCategory);
router.patch("/updateCategory/:id", isAdminLoggedIn, upload.single("categoryImg"), updateCategory);
router.get("/checkCategoryForDeletion/:id", isAdminLoggedIn, checkCategoryForDeletion);
router.delete("/deleteCategory/:id", isAdminLoggedIn, deleteCategory);

export default router;
