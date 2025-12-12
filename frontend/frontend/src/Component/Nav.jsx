import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { IoPersonCircle } from 'react-icons/io5'; 
import { toast } from 'react-toastify';

// Import Assets and Configuration
import logo from '../assets/logo.png';
import { serverURL } from '../App';
import { setUserData } from '../redux/userSlice';

function Nav({ userData }) { 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // State to control the visibility of the Profile dropdown menu (linked to Avatar)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Toggle the dropdown state
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Async function to handle user logout (unchanged logic)
    const handleLogout = async () => {
        try {
            const result = await axios.post(
                serverURL + "/api/auth/logout",
                {},
                { withCredentials: true }
            );
            
            dispatch(setUserData(null)); 
            toast.success(result.data?.message || 'Logged out successfully'); 
            navigate('/login');

        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.message || 'Logout failed.';
            toast.error(errorMessage);
        }
    };

    // Function to handle navigation from the dropdown
    const handleMenuItemClick = (path) => {
        navigate(path);
        setIsDropdownOpen(false); // Close dropdown after clicking
    };

    return (
        // Main Navigation Bar Container (Background set to gray-900)
        <div className='w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-gray-900 z-10 shadow-lg'>
            
            {/* Left Section: Logo */}
            <div className='lg:w-[20%] w-[40%] lg:pl-[50px]'>
                <img 
                    src={logo} 
                    alt="logo" 
                    className='w-[60px] rounded-[5px] border-2 border-white cursor-pointer' 
                    onClick={() => handleMenuItemClick('/')} 
                />
            </div>

            {/* Right Section: User/Action Links */}
            {/* Adjusted order here */}
            <div className='w-auto flex items-center justify-center gap-4 pr-[20px]'> 
                
                {/* 1. Avatar / User Initial Section with Profile Dropdown (FIRST ITEM) */}
                <div className='relative'>
                    
                    {!userData ? (
                        // Show Login icon
                        <IoPersonCircle 
                            className='w-[40px] h-[40px] fill-white cursor-pointer hover:fill-gray-300' 
                            onClick={() => handleMenuItemClick("/login")} 
                        />
                    ) : (
                        // Show user initial (Dropdown Trigger)
                        <div 
                            className='w-[40px] h-[40px] rounded-full text-black flex items-center justify-center text-[18px] font-semibold border-2 bg-white border-white cursor-pointer'
                            onClick={toggleDropdown} // <-- Dropdown opens on avatar click
                        >
                            {userData.name?.slice(0, 1).toUpperCase()}
                        </div>
                    )}

                    {/* Dropdown Menu (Visible only if logged in AND opened) */}
                    {userData && isDropdownOpen && (
                        <div className='absolute right-0 mt-3 w-48 bg-white rounded-md shadow-2xl overflow-hidden ring-1 ring-black ring-opacity-5'>
                            
                            {/* My Profile Option */}
                            <div 
                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer border-b border-gray-100'
                                onClick={() => handleMenuItemClick("/profile")} 
                            >
                                My Profile
                            </div>
                            
                            {/* My Courses Option */}
                            <div 
                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
                                onClick={() => handleMenuItemClick("/my-courses")} 
                            >
                                My Courses
                            </div>
                        </div>
                    )}
                </div>


                {/* 2. Dashboard Link (Visible ONLY if the user's role is 'educator') (SECOND ITEM) */}
                {userData?.role === "educator" && (
                    // Note: This div is outside the 'relative' avatar container
                    <div 
                        className='px-[15px] py-[8px] border-2 border-white text-white bg-gray-800 rounded-[5px] text-[16px] font-light cursor-pointer hover:bg-white hover:text-black transition-colors'
                        onClick={() => handleMenuItemClick("/dashboard")} // Navigate directly to dashboard
                    >
                        Dashboard
                    </div>
                )}


                {/* 3. Login/Logout Buttons (THIRD ITEM) */}
                <div className='pl-2'>
                    {!userData ? (
                        <span 
                            className='px-[15px] py-[8px] border-2 border-white text-white rounded-[5px] text-[16px] font-light cursor-pointer hover:bg-white hover:text-black transition-colors'
                            onClick={() => handleMenuItemClick("/login")}
                        >
                            Login
                        </span>
                    ) : (
                        <span 
                            className='px-[15px] py-[8px] bg-white text-black rounded-[5px] shadow-sm shadow-white text-[16px] font-semibold cursor-pointer hover:bg-gray-200 transition-colors'
                            onClick={handleLogout}
                        >
                            LogOut
                        </span>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Nav;