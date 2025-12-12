import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import sendMail from "../config/sendMail.js";

// SIGN UP
export const signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (await User.findOne({ email })) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }

        if (!password || password.length < 8) {
            return res.status(400).json({ message: "Password must be 8+ chars" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, email, password: hashedPassword, role
        });

        const token = genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({ user });
    } catch (error) {
        console.error('signUp error:', error);
        res.status(500).json({ message: "Signup failed", error: error.message });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        const token = genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ user });

    } catch (error) {
        console.error('login error:', error);
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

// LOGOUT
export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Logout failed" });
    }
};

// SEND OTP
export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const otp = (Math.floor(Math.random() * 9000) + 1000).toString();

        user.resetOtp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000;
        user.isOtpVerified = false;
        await user.save();

        await sendMail(email, otp);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to send OTP" });
    }
};

// VERIFY OTP
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        user.isOtpVerified = true;
        await user.save();

        res.status(200).json({ message: "OTP Verified" });
    } catch (error) {
        res.status(500).json({ message: "OTP verification failed" });
    }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.resetOtp !== otp || !user.isOtpVerified)
            return res.status(400).json({ message: "Not authorized" });

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetOtp = undefined;
        user.otpExpires = undefined;
        user.isOtpVerified = false;

        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: "Password reset failed" });
    }
};
export const googleAuth = async (req, res) => {
    try {
        const { name, email, role = 'student' } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ name, email, role });
        }

        const token = genToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ user });

    } catch (error) {
        console.error('googleAuth error:', error);
        return res.status(500).json({ message: `Google Auth failed: ${error.message}` });
    }
};