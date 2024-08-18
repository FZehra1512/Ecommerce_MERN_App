import express from "express";
import { getAllProducts, makeProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.post("/products", makeProduct);

export default router;
