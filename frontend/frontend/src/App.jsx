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
import Dashboard from "./pages/Educator/Dashbord";
import Courses from "./pages/Educator/courses";
import CreateCourses from "./pages/Educator/createCourses";


function App() {
  getCurrentUser()
  const{userData}=useSelector(state=>state.user)

  return (
    <>
    <ToastContainer/>

        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={userData ? <Profile /> : <Navigate to="/signup" />} />
        <Route path="/forget" element={userData ? <ForgetPassword /> : <Navigate to="/signup" />} />
        <Route path="/editprofile" element={userData ? <EditProfile /> : <Navigate to="/signup" />} />
        {/* /dash per screenshot: render EditProfile when logged in, otherwise redirect to signup */}
        <Route path="/dash" element={userData ? <EditProfile /> : <Navigate to="/signup" />} />
        <Route path="/dashboard" element={userData?.role === 'educator' ? <Dashboard /> : <Navigate to='/' />} />
         <Route path="/courses" element={userData?.role === 'educator' ? <Courses /> : <Navigate to='/courses' />} />
         <Route path="/createcourse" element={userData?.role === 'educator' ? <CreateCourses /> : <Navigate to='/CreateCourses' />} />
         



         

      </Routes>
    </>
  );
}

export default App;
