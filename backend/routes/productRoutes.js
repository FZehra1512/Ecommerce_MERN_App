import express from "express";
import { getAllProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProducts);
// router.post("/createproducts", makeProduct);

export default router;
