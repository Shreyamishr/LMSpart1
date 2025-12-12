import React, { useState } from 'react';
import logo from '../assets/logo.png';
import google from '../assets/google.png';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { serverURL } from '../App';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { auth, provider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';

// Enable cookies for all axios requests
axios.defaults.withCredentials = true;

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Correct Login Function
    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await axios.post(
                `${serverURL}/api/auth/login`,
                { email, password }
            );

            // Save ONLY user data
            dispatch(setUserData(res.data.user));

            toast.success("Login Successful!");
            setLoading(false);
            navigate("/");

        } catch (error) {
            setLoading(false);
            const msg = error.response?.data?.message || "Login failed";
            toast.error(msg);
        }
    };

    // Google login using Firebase popup then backend authentication
    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, provider);
            const userInfo = result.user;
            const nameFromGoogle = userInfo.displayName || '';
            const emailFromGoogle = userInfo.email;

            const res = await axios.post(`${serverURL}/api/auth/googleSignup`, {
                name: nameFromGoogle,
                email: emailFromGoogle,
                role: 'student'
            }, { withCredentials: true });

            const user = res.data?.user ?? res.data;
            dispatch(setUserData(user));
            toast.success('Logged in with Google');
            navigate('/');
        } catch (err) {
            console.error('google login error:', err);
            const msg = err?.response?.data?.message || 'Google login failed';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-[#ddbdbb] w-[100vw] h-[100vh] flex items-center justify-center'>
            <form
                className='w-[90%] md:w-[60%] h-[80%] bg-[white] shadow-xl rounded-2xl flex overflow-hidden'
                onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
            >

                {/* LEFT FORM */}
                <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3 px-6 py-10'>
                    
                    <div className='w-[80%] text-center mb-4'>
                        <h1 className='font-semibold text-black text-2xl'>Welcome Back</h1>
                        <h2 className='text-[#999797] text-[18px]'>Sign in to your account</h2>
                    </div>

                    {/* Email */}
                    <div className='flex flex-col gap-1 w-[80%] px-3'>
                        <label className='font-semibold'>Email</label>
                        <input
                            type='email'
                            className='border w-full h-[35px] border-[#e7e6e6] text-[15px] px-[20px] focus:outline-none focus:border-black'
                            placeholder='Your Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className='flex flex-col gap-1 w-[80%] px-3'>
                        <label className='font-semibold'>Password</label>
                        <div className="relative w-full">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className='border w-full h-[35px] border-[#e7e6e6] text-[15px] px-[20px] pr-10 focus:outline-none focus:border-black'
                                placeholder='Your Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-black"
                            >
                                {showPassword ? <FaRegEyeSlash size={16} /> : <FaRegEye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Forgot password */}
                    <div className='w-[80%] flex justify-end px-3'>
                        <Link to="/forget" className='text-sm text-gray-500 hover:underline'>Forgot Password?</Link>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className='w-[80%] h-[40px] bg-black text-white rounded mt-4 flex items-center justify-center disabled:opacity-50'
                        disabled={loading}
                    >
                        {loading ? <ClipLoader size={20} color='white' /> : "Log In"}
                    </button>

                    {/* OR Section */}
                    <div className='w-[80%] flex items-center gap-2 mt-4'>
                        <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                        <div className='w-[50%] text-[15px] text-[#6f6f6f] text-center'>
                            Or continue
                        </div>
                        <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                    </div>

                    {/* Google Login */}
                    <div onClick={handleGoogleLogin} className='w-[80%] border border-[#e7e6e6] rounded px-[10px] py-[10px] cursor-pointer flex items-center justify-center gap-2 hover:border-black'>
                        <img src={google} alt="google" className='w-5 h-5' />
                        <span className='text-md text-gray-500'>Log In with Google</span>
                    </div>

                    {/* Sign Up Link */}
                    <div className='mt-4 text-center text-sm w-[80%]'>
                        <p>
                            Don't have an account?
                            <Link to="/signup" className='text-black font-semibold hover:underline ml-1'>Sign Up</Link>
                        </p>
                    </div>

                </div>

                {/* RIGHT SIDE IMAGE */}
                <div className='w-[50%] h-full bg-black md:flex items-center justify-center flex-col hidden rounded-r-2xl'>
                    <img src={logo} alt="logo" className='w-48 shadow-xl' />
                    <span className='text-2xl text-white mt-4'>VIRTUAL COURSES</span>
                </div>

            </form>
        </div>
    );
}

export default Login;
