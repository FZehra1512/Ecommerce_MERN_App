import express from "express";
import { getAllProducts, getSpecificProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/product/:id", getSpecificProduct);
// router.post("/createproducts", makeProduct);

export default router;
