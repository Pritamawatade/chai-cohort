import  express from "express";
import { register, verify } from "../controllers/auth.controller.js";

const userRouter = express.Router()

userRouter.post("/register",register)
userRouter.get("/verify/:token", verify)
export default userRouter;