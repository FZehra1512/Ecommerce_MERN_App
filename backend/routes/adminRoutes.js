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
router.post("/updateCategory", isAdminLoggedIn, upload.single("categoryImg"), updateCategory);
router.post("/checkCategoryForDeletion", isAdminLoggedIn, checkCategoryForDeletion);
router.post("/deleteCategory", isAdminLoggedIn, deleteCategory);

export default router;


// TODO: Check whether update can cause error because when no image is uploaded in update.
