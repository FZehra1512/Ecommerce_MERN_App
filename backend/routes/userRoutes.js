import express from "express"
import { getUser, login, logout, signUp } from "../controllers/userController.js";
const router = express.Router();

router.post("/register", signUp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getUser", getUser)

export default router;