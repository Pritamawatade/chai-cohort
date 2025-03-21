import express from "express";
import { changePass, getMe, login, registerUser, verify } from "../controller/user.controller.js";
import { isLoggedIn } from "../midleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verify);
router.post("/login", login);
router.post("/getme", isLoggedIn ,getMe);

export default router;
