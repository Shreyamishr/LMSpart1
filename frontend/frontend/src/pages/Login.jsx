// import React, { useState } from 'react';
// // Note: You need to ensure these asset files (logo.png, google.png) are in the correct path
// import logo from '../assets/logo.png';
// import google from '../assets/google.png'; 
// import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'; // For Eye Icons

// // Function name 'Login' kept as requested
// function Login() {
//   const [showPassword, setShowPassword] = useState(false); // Added Password State

//   const togglePasswordVisibility = () => { // Toggle Function
//     setShowPassword(!showPassword);
//   };

//   return (
//     // Outer container for the whole page/component
//     <div className='bg-[#ddbdbb] w-[100vw] h-[100vh] flex items-center justify-center'>
//       
//       {/* Form Container (the main white box with shadow) */}
//       <form className='w-[90%] md:w-[60%] h-[80%] bg-[white] shadow-xl rounded-2xl flex overflow-hidden'> 
//         
//         {/* Left Div (Login Form) */}
//         <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3 px-6 py-10'>
//           
//           {/* Header Section */}
//           <div className='w-[80%] text-center mb-4'>
//             <h1 className='font-semibold text-black text-2xl'>Welcome Back</h1>
//             <h2 className='text-[#999797] text-[18px]'>Sign in to your account</h2>
//           </div>
//           
//           {/* Email Input Group */}
//           <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 mt-4'> 
//             <label htmlFor="email" className='font-semibold'>Email</label>
//             <input 
//               id='email' 
//               type='text' 
//               className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] focus:outline-none focus:border-black' 
//               placeholder='Your Email' 
//             />
//           </div>
//           
//           {/* Password Input Group (Eye Icon Logic) */}
//           <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
//             <label htmlFor="password" className='font-semibold'>Password</label>
//             <div className="relative w-full">
//               <input 
//                 id='password' 
//                 type={showPassword ? 'text' : 'password'} // Type controlled by State
//                 className='border-1 w-full h-[35px] border-[#e7e6e6] text-[15px] px-[20px] pr-10 focus:outline-none focus:border-black' 
//                 placeholder='Your password' 
//               />
//               <button 
//                 type="button" 
//                 onClick={togglePasswordVisibility} // Toggle Function
//                 className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-black"
//               >
//                 {showPassword ? <FaRegEyeSlash size={16} /> : <FaRegEye size={16} />} 
//               </button>
//             </div>
//           </div>

//           {/* Forgot Password Link */}
//           <div className='w-[80%] flex justify-end px-3'>
//             <span className='text-sm text-gray-500 cursor-pointer hover:underline'>Forgot Password?</span>
//           </div>

//           {/* Log In Button */}
//           <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px] mt-4'>
//             Log In
//           </button>
//           
//           {/* Separator / 'Or continue' Section */}
//           <div className='w-[80%] flex items-center gap-2 mt-4'>
//             <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
//             <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>
//               Or continue
//             </div>
//             <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
//           </div>
//           
//           {/* Google Log In Button */}
//           <div className='w-[80%] border-[1px] border-[#e7e6e6] rounded-[5px] px-[10px] py-[10px] cursor-pointer flex items-center justify-center gap-2 hover:border-black'>
//             <img src={google} alt="Google logo" className='w-5 h-5'/>
//             <span className='text-md text-gray-500'>Log In with Google</span> 
//           </div>

//             {/* NEVIGATION LINK TO SIGN UP PAGE */}
//             <div className='mt-4 text-center text-sm w-[80%]'>
//                 <p>Don't have an account? 
//                     {/* Use <Link to="/signup" ...> for React Router */}
//                     <a href="/signup" className='text-black font-semibold hover:underline ml-1'>Sign Up</a>
//                 </p>
//             </div>

//         </div> 
//         {/* End of Left Div */}
//         

//         {/* Right Div (Branding/Image) */}
//         <div className='w-[50%] h-[100%] rounded-r-2xl bg-black md:flex items-center justify-center flex-col hidden'>
//           <img src={logo} alt="logo" className='w-30 shadow-2xl'/>
//           <span className='text-2xl text-white mt-4'>VIRTUAL COURSES</span>
//         </div>
//         {/* End of Right Div */}

//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import logo from '../assets/logo.png';
import google from '../assets/google.png'; 
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'; // For Eye Icons
// API and State Management Imports
import { serverURL } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners'; 
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

// Function name 'Login' kept as requested
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); 

    const [showPassword, setShowPassword] = useState(false); 
    const dispatch=useDispatch()

    const togglePasswordVisibility = () => { 
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            const result = await axios.post(serverURL + "/api/auth/login", {
                email: email,
                password: password
            }, { withCredentials: true });
            
            dispatch(setUserData(result.data))
            setLoading(false);
            navigate("/"); // Navigate to home/dashboard on successful login

            toast.success("Login Successful!");

        } catch (error) {
            console.log(error);
            setLoading(false);
            const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
            toast.error(errorMessage);
        }
    }

  return (
    // Outer container for the whole page/component
    <div className='bg-[#ddbdbb] w-[100vw] h-[100vh] flex items-center justify-center'>
      
      {/* Form Container (the main white box with shadow) */}
      <form className='w-[90%] md:w-[60%] h-[80%] bg-[white] shadow-xl rounded-2xl flex overflow-hidden' onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>  
        
        {/* Left Div (Login Form) */}
        <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3 px-6 py-10'>
          
          {/* Header Section */}
          <div className='w-[80%] text-center mb-4'>
            <h1 className='font-semibold text-black text-2xl'>Welcome Back</h1>
            <h2 className='text-[#999797] text-[18px]'>Sign in to your account</h2>
          </div>
          
          {/* Email Input Group */}
          <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 mt-4'> 
            <label htmlFor="email" className='font-semibold'>Email</label>
            <input 
              id='email' 
              type='text' 
              className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] focus:outline-none focus:border-black' 
              placeholder='Your Email'
             onChange={(e) => setEmail(e.target.value)} 
             value={email}
            />
          </div>
          
          {/* Password Input Group (Eye Icon Logic) */}
          <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
            <label htmlFor="password" className='font-semibold'>Password</label>
            <div className="relative w-full">
              <input 
                id='password' 
                type={showPassword ? 'text' : 'password'} // Type controlled by State
                className='border-1 w-full h-[35px] border-[#e7e6e6] text-[15px] px-[20px] pr-10 focus:outline-none focus:border-black' 
                placeholder='Your password'
             onChange={(e) => setPassword(e.target.value)} 
             value={password}
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility} // Toggle Function
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-black"
              >
                {showPassword ? <FaRegEyeSlash size={16} /> : <FaRegEye size={16} />} 
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className='w-[80%] flex justify-end px-3'>
            <span className='text-sm text-gray-500 cursor-pointer hover:underline'>Forgot Password?</span>
          </div>

          {/* Log In Button */}
          <button 
             type="submit" // Changed to submit type for form handling
             className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px] mt-4 disabled:opacity-50'
             disabled={loading}
          >
            {loading ? <ClipLoader size={20} color='white'/> : "Log In"}
          </button>
          
          {/* Separator / 'Or continue' Section */}
          <div className='w-[80%] flex items-center gap-2 mt-4'>
            <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
            <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>
              Or continue
            </div>
            <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
          </div>
          
          {/* Google Log In Button */}
          <div className='w-[80%] border-[1px] border-[#e7e6e6] rounded-[5px] px-[10px] py-[10px] cursor-pointer flex items-center justify-center gap-2 hover:border-black'>
            <img src={google} alt="Google logo" className='w-5 h-5'/>
            <span className='text-md text-gray-500'>Log In with Google</span> 
          </div>

            {/* NEVIGATION LINK TO SIGN UP PAGE */}
            <div className='mt-4 text-center text-sm w-[80%]'>
                <p>Don't have an account? 
                    {/* Use <Link to="/signup" ...> for React Router */}
                    <a href="/signup" className='text-black font-semibold hover:underline ml-1'>Sign Up</a>
                </p>
            </div>

        </div> 
        {/* End of Left Div */}
        

        {/* Right Div (Branding/Image) */}
        <div className='w-[50%] h-[100%] rounded-r-2xl bg-black md:flex items-center justify-center flex-col hidden'>
          {/* Logo size increased from w-30 to w-48 */}
          <img src={logo} alt="logo" className='w-48 shadow-2xl'/>
          <span className='text-2xl text-white mt-4'>VIRTUAL COURSES</span>
        </div>
        {/* End of Right Div */}

      </form>
    </div>
  );
}

export default Login;