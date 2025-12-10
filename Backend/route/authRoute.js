import express from "express";

import { login, signUp ,logOut} from "../controller/authController.js";

const authRouter=express.Router();

authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.get("/logout",logOut)

export default authRouter