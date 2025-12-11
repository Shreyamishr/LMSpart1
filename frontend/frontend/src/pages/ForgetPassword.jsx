import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { serverURL } from '../App';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'; 

function ForgotPassword() {
    const navigate = useNavigate();

    // State for managing the 3 steps (1: Email, 2: OTP, 3: Reset Password)
    const [step, setStep] = useState(1);
    
    // Form States
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    // Password Visibility States
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Function to handle Step 1: Sending OTP to Email
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await axios.post(serverURL + "/api/auth/forgot-password", { email });
            
            toast.success(result.data?.message || "OTP sent successfully to your email.");
            setStep(2); // Move to OTP verification step
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to send OTP.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle Step 2: OTP Verification
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Note: Your backend should handle OTP verification and link it to the email/token
            const result = await axios.post(serverURL + "/api/auth/verify-otp", { email, otp });
            
            toast.success(result.data?.message || "OTP verified. You can now reset your password.");
            setStep(3); // Move to password reset step
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Invalid OTP.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle Step 3: Resetting Password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            return toast.error("Passwords do not match.");
        }
        
        setLoading(true);
        try {
            // The API call to reset the password requires email/token + new password
            const result = await axios.post(serverURL + "/api/auth/reset-password", { email, otp, newPassword });
            
            toast.success(result.data?.message || "Password reset successfully. Please log in.");
            navigate("/login"); // Redirect to login page
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to reset password.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Render Loader function
    const renderLoader = () => (
        <ClipLoader size={20} color='white' />
    );

    // --- Step 1: Forgot Password? (Enter Email) ---
    const Step1 = () => (
        <form onSubmit={handleSendOtp} className='w-full flex flex-col items-center gap-6'>
            <h2 className='text-2xl font-semibold text-black'>Forgot Your Password?</h2>
            <p className='text-sm text-gray-600 w-full text-center'>Enter your email address to receive a verification code.</p>
            
            {/* Email Input */}
            <input
                type="email"
                placeholder="you@example.com"
                className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            
            {/* Send OTP Button */}
            <button
                type="submit"
                className="w-full h-12 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition duration-200 flex items-center justify-center disabled:opacity-50"
                disabled={loading}
            >
                {loading ? renderLoader() : "Send OTP"}
            </button>
            
            <span 
                className='text-sm text-blue-600 cursor-pointer hover:underline mt-2'
                onClick={() => navigate("/login")}
            >
                Back to Login
            </span>
        </form>
    );

    // --- Step 2: Enter OTP ---
    const Step2 = () => (
        <form onSubmit={handleVerifyOtp} className='w-full flex flex-col items-center gap-6'>
            <h2 className='text-2xl font-semibold text-black'>Enter OTP</h2>
            <p className='text-sm text-gray-600 w-full text-center'>Please enter the 4-digit code sent to your email: **{email}**</p>
            
            {/* OTP Input */}
            <input
                type="text"
                placeholder="Enter Here"
                maxLength="6"
                className="w-full h-12 px-4 border border-gray-300 rounded-md text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-black"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
            />
            
            {/* Verify OTP Button */}
            <button
                type="submit"
                className="w-full h-12 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition duration-200 flex items-center justify-center disabled:opacity-50"
                disabled={loading}
            >
                {loading ? renderLoader() : "Verify OTP"}
            </button>

            <span 
                className='text-sm text-blue-600 cursor-pointer hover:underline mt-2'
                onClick={() => navigate("/login")}
            >
                Back to Login
            </span>
        </form>
    );

    // --- Step 3: Reset Your Password ---
    const Step3 = () => (
        <form onSubmit={handleResetPassword} className='w-full flex flex-col items-center gap-6'>
            <h2 className='text-2xl font-semibold text-black'>Reset Your Password</h2>
            <p className='text-sm text-gray-600 w-full text-center'>Enter a new password below to regain access to your account.</p>
            
            {/* New Password Input */}
            <div className="relative w-full">
                <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter New Password"
                    className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black pr-10"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-black"
                >
                    {showNewPassword ? <FaRegEyeSlash size={16} /> : <FaRegEye size={16} />}
                </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative w-full">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter New Password"
                    className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black pr-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-black"
                >
                    {showConfirmPassword ? <FaRegEyeSlash size={16} /> : <FaRegEye size={16} />}
                </button>
            </div>
            
            {/* Reset Password Button */}
            <button
                type="submit"
                className="w-full h-12 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition duration-200 flex items-center justify-center disabled:opacity-50"
                disabled={loading}
            >
                {loading ? renderLoader() : "Reset Password"}
            </button>

            <span 
                className='text-sm text-blue-600 cursor-pointer hover:underline mt-2'
                onClick={() => navigate("/login")}
            >
                Back to Login
            </span>
        </form>
    );

    return (
        <div className='w-full h-screen flex items-center justify-center bg-[#ddbdbb]'>
            <div className='w-[90%] sm:w-[500px] p-8 bg-white shadow-xl rounded-xl flex flex-col items-center'>
                
                {/* Conditional Rendering based on Step State */}
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}

            </div>
        </div>
    );
}

export default ForgotPassword;