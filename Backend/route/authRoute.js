import express from "express";
import { signUp } from "../controller/authController";
const authRouter=express.Router();
authRouter.post("/signup",signUp)