import express from "express";
import {  getMe, login, logoutUser, registerUser, verify } from "../controller/user.controller.js";
import { isLoggedIn } from "../midleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verify);
router.post("/login", login);
router.get("/getme", isLoggedIn ,getMe);
router.get("/logout", isLoggedIn ,logoutUser);

export default router;
