import express from "express"
import { login, logout, signUp } from "../controllers/userController.js";
const router = express.Router();

router.post("/register",signUp);
router.post("/login",login);
router.get("/logout",logout);

export default router;