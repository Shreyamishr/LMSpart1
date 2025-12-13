import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/signUp";
import Login from "./pages/Login";
export const serverURL="http://localhost:8000"
import{ToastContainer}from 'react-toastify'
import getCurrentUser from "./customHooks/getCurrentUser";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import EditProfile from "./pages/EditProfile";
import Dashboard from "./pages/Dashboard";

function App() {
  getCurrentUser()
  const{userData}=useSelector(state=>state.user)

  return (
    <>
    <ToastContainer/>

        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={!userData ?<SignUp />:<Navigate to="/"/>} />
        <Route path="/login" element={<Login />} />
         <Route path="/profile" element={<Profile/>}/>
         <Route path="/dashboard" element={userData?.role === 'educator' ? <Dashboard/> : <Navigate to='/'/>}/>
         <Route path="/forget" element={<ForgetPassword />}/>
         <Route path="/editprofile" element={<EditProfile/>}/>
         



         

      </Routes>
    </>
  );
}

export default App;
