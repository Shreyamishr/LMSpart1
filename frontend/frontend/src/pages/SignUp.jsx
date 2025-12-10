// import React, { useState } from 'react'; 
// import logo from '../assets/logo.png';
// import google from '../assets/google.png'; 
// import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'; 
// import { serverURL } from '../App';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { clipLoader} from 'react-spinners';

// // import { Link } from 'react-router-dom'; // For React Router

// function SignUp() {
//     const[show,setShow]=useState(fasle)
//     const navigate=useNavigate()
//     const[name,setName]=useState("")
//     const[email,setEmail]=useState("")
//     const[password,setPassword]=useState("")
//     const [role,setRole]=useState("")
//     const [loading,setloading]=useState(false)

//   const [showPassword, setShowPassword] = useState(false); 

//   const togglePasswordVisibility = () => { 
//     setShowPassword(!showPassword);
//   };
// const handleSignUp=async()=>{
//     setloading(true)
//     try{
//         const result =await axios.post(serverURL+"/api/auth/signup",{name:name,email,password,role},{withCredentials:true})
//         console.log(result.data)
//         setloading(false)
//         navigate("/")

//         toast.done("Sign Up Scessfully")


//     }catch(error){
//         console.log(error)
//         setloading(false)
//         toast.error(error.response.data.message)

//     }
// }
//   return (
//     // Outer container for the whole page/component
//     <div className='bg-[#ddbdbb] w-[100vw] h-[100vh] flex items-center justify-center'>
//       
//       {/* Form Container (the main white box with shadow) */}
//       <form className='w-[90%] md:w-[60%] h-[80%] bg-[white] shadow-xl rounded-2xl flex overflow-hidden'> 
//         
//         {/* Left Div (Sign-Up Form) */}
//         <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3 px-6 py-10'>
//           
//           {/* Header Section */}
//           <div className='w-[80%] text-center mb-4'>
//             <h1 className='font-semibold text-black text-2xl'>let's get started</h1>
//             <h2 className='text-[#999797] text-[18px]'>Create your account</h2>
//           </div>
//           
//           {/* Name Input Group */}
//           <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
//             <label htmlFor="name" className='font-semibold'>Name</label>
//             <input 
//               id='name' 
//               type='text' 
//               className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] focus:outline-none focus:border-black' 
//               placeholder='Your name' onChange={(e)=>setName(e.target.value)}value={name}
//             />
//           </div>

//           {/* Email Input Group */}
//           <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
//             <label htmlFor="email" className='font-semibold'>Email</label>
//             <input 
//               id='email' 
//               type='text' 
//               className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] focus:outline-none focus:border-black' 
//               placeholder='Your Email' onChange={(e)=>setEmail(e.target.value)}value={email}
//             />
//           </div>
//           
//           {/* Password Input Group (Eye Icon Logic added here) */}
//           <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
//             <label htmlFor="password" className='font-semibold'>Password</label>
//             <div className="relative w-full">
//               <input 
//                 id='password' 
//                 type={showPassword ? 'text' : 'password'} 
//                 className='border-1 w-full h-[35px] border-[#e7e6e6] text-[15px] px-[20px] pr-10 focus:outline-none focus:border-black' 
//                 placeholder='Your password' onChange={(e)=>setPassword(e.target.value)}value={password}
//               />
//               <button 
//                 type="button" 
//                 onClick={togglePasswordVisibility} 
//                 className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-black"
//               >
//                 {showPassword ? <FaRegEyeSlash size={16} /> : <FaRegEye size={16} />} 
//               </button>
//             </div>
//           </div>
//           
//           {/* Student/Educator Selection */}
//           <div className='w-[80%] flex items-center justify-start gap-4 mt-3'> 
//             <span className='px-[10px] py-[5px] border-[1px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black'onClick={()=>setRole("student")}>
//               Student
//             </span>
//             <span className='px-[10px] py-[5px] border-[1px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black'>
//               Educator onClick={()=>setRole("Educator")}
//             </span>
//           </div>

//           {/* Sign Up Button */}
//           <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px] mt-4'onclick={handleSignUp}disable={loading}>
//             {loading ? <clipLoader size={30}color='white'/>:"sign up"}
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
//           {/* Google Sign Up Button */}
//           <div className='w-[80%] border-[1px] border-[#e7e6e6] rounded-[5px] px-[10px] py-[10px] cursor-pointer flex items-center justify-center gap-2 hover:border-black'>
//             <img src={google} alt="Google logo" className='w-5 h-5'/>
//             <span className='text-md text-gray-500'>Google</span> 
//           </div>

//             {/* NEVIGATION LINK TO LOGIN PAGE */}
//             <div className='mt-4 text-center text-sm w-[80%]'>
//                 <p>Already have an account? 
//                     {/* Use <Link to="/login" ...> for React Router */}
//                     <a href="/login" className='text-black font-semibold hover:underline ml-1'>Log In</a>
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

// export default SignUp;
import React, { useState } from 'react'; 
import logo from '../assets/logo.png';
import google from '../assets/google.png'; 
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'; 
import { serverURL } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// clipLoader को 'react-spinners' से सही नामकरण के साथ इम्पोर्ट किया
import { ClipLoader } from 'react-spinners'; 
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

// import { Link } from 'react-router-dom'; // For React Router

function SignUp() {
    // Corrected 'fasle' to 'false' and removed redundant 'show' state
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student"); // Default role set
    const [loading, setLoading] = useState(false); // Corrected spelling
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false); 

    const togglePasswordVisibility = () => { 
        setShowPassword(!showPassword);
    };

    const handleSignUp = async () => {
        setLoading(true); // Corrected spelling
        try {
            const result = await axios.post(serverURL + "/api/auth/signup", {
                name: name,
                email: email,
                password: password,
                role: role
            }, { withCredentials: true });
            dispatch(setUserData(result.data));
            setLoading(false); // Corrected spelling
            navigate("/");

            // Corrected toast method to 'success'
            toast.success("Sign Up Successfully!");

        } catch (error) {
            console.log(error);
            setLoading(false); // Corrected spelling
            // Ensure error.response.data exists before accessing message
            const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
            toast.error(errorMessage);
        }
    }

    // Function to handle role selection and apply selection style
    const selectRole = (selectedRole) => {
        setRole(selectedRole);
    };

    // Helper function to get style for selected role
    const getRoleClassName = (currentRole) => {
        return `px-[10px] py-[5px] border-[1px] rounded-xl cursor-pointer ${
            role === currentRole 
                ? 'border-black bg-gray-100 font-semibold' 
                : 'border-[#e7e6e6] hover:border-black'
        }`;
    };

    return (
        // Outer container for the whole page/component
        <div className='bg-[#ddbdbb] w-[100vw] h-[100vh] flex items-center justify-center'>
            
            {/* Form Container (the main white box with shadow) */}
            <form className='w-[90%] md:w-[60%] h-[80%] bg-[white] shadow-xl rounded-2xl flex overflow-hidden'> 
                
                {/* Left Div (Sign-Up Form) */}
                <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3 px-6 py-10'>
                    
                    {/* Header Section */}
                    <div className='w-[80%] text-center mb-4'>
                        <h1 className='font-semibold text-black text-2xl'>let's get started</h1>
                        <h2 className='text-[#999797] text-[18px]'>Create your account</h2>
                    </div>
                    
                    {/* Name Input Group */}
                    <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                        <label htmlFor="name" className='font-semibold'>Name</label>
                        <input 
                            id='name' 
                            type='text' 
                            className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] focus:outline-none focus:border-black' 
                            placeholder='Your name' 
                            onChange={(e) => setName(e.target.value)} 
                            value={name}
                        />
                    </div>

                    {/* Email Input Group */}
                    <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
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
                    
                    {/* Password Input Group (Eye Icon Logic added here) */}
                    <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                        <label htmlFor="password" className='font-semibold'>Password</label>
                        <div className="relative w-full">
                            <input 
                                id='password' 
                                type={showPassword ? 'text' : 'password'} 
                                className='border-1 w-full h-[35px] border-[#e7e6e6] text-[15px] px-[20px] pr-10 focus:outline-none focus:border-black' 
                                placeholder='Your password' 
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password}
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
                    
                    {/* Student/Educator Selection */}
                    <div className='w-[80%] flex items-center justify-start gap-4 mt-3'> 
                        <span 
                            className={getRoleClassName("student")} 
                            onClick={() => selectRole("student")}
                        >
                            Student
                        </span>
                        <span 
                            className={getRoleClassName("educator")}
                            onClick={() => selectRole("educator")}
                        >
                            Educator
                        </span>
                    </div>

                    {/* Sign Up Button */}
                    <button 
                        className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px] mt-4 disabled:opacity-50' 
                        onClick={handleSignUp} 
                        disabled={loading} // Corrected syntax
                    >
                        {/* Corrected component name and added loading check */}
                        {loading ? <ClipLoader size={20} color='white' /> : "Sign Up"}
                    </button>
                    
                    {/* Separator / 'Or continue' Section */}
                    <div className='w-[80%] flex items-center gap-2 mt-4'>
                        <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                        <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>
                            Or continue
                        </div>
                        <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                    </div>
                    
                    {/* Google Sign Up Button */}
                    <div className='w-[80%] border-[1px] border-[#e7e6e6] rounded-[5px] px-[10px] py-[10px] cursor-pointer flex items-center justify-center gap-2 hover:border-black'>
                        <img src={google} alt="Google logo" className='w-5 h-5'/>
                        <span className='text-md text-gray-500'>Google</span> 
                    </div>

                    {/* NEVIGATION LINK TO LOGIN PAGE */}
                    <div className='mt-4 text-center text-sm w-[80%]'>
                        <p>Already have an account? 
                            {/* Use <Link to="/login" ...> for React Router */}
                            <a href="/login" className='text-black font-semibold hover:underline ml-1'>Log In</a>
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

export default SignUp;