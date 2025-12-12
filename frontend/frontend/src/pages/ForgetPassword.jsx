import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { serverURL } from '../App';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // STEP-1 : SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post(serverURL + "/api/auth/sendOTP", { email });

      toast.success(result.data.message);
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
    setLoading(false);
  };

  // STEP-2 : VERIFY OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post(serverURL + "/api/auth/verifyOTP", { email, otp });

      toast.success(result.data.message);
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
    setLoading(false);
  };

  // STEP-3 : RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

    try {
      const result = await axios.post(serverURL + "/api/auth/resetPassword", {
        email,
        otp,
        newPassword
      });

      toast.success(result.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-screen bg-[#ddbdbb] flex justify-center items-center">
      <div className="w-[400px] bg-white p-6 rounded-xl shadow-lg">

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Forgot Password?</h2>

            <input 
              className="border p-2" 
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="bg-black text-white p-2 rounded">
              {loading ? <ClipLoader size={20} color="white"/> : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Enter OTP</h2>

            <input 
              className="border p-2 text-center" 
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button className="bg-black text-white p-2 rounded">
              {loading ? <ClipLoader size={20} color="white"/> : "Verify OTP"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Reset Password</h2>

            <input 
              className="border p-2"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input 
              className="border p-2"
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button className="bg-black text-white p-2 rounded">
              {loading ? <ClipLoader size={20} color="white"/> : "Reset Password"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

export default ForgotPassword;
