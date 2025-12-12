import express from "express";
import {
    signUp,
    login,
    logOut,
    sendOTP,
    verifyOTP,
    resetPassword,
    googleAuth
} from "../controller/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logOut);

router.post("/sendOTP", sendOTP);
router.post("/verifyOTP", verifyOTP);
router.post("/resetPassword", resetPassword);
// route for google oauth signup/login
router.post("/googleSignup", googleAuth)

export default router;
