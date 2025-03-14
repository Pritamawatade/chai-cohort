import express from "express";
import { changePass, login, registerUser, verify } from "../controller/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verify);
router.get("/login", login);
router.get("/changepassword", changePass);

export default router;
