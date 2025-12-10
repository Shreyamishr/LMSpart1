import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/signUp";
import Login from "./pages/Login";
export const serverURL="http://localhost:8000"
import{ToastContainer}from 'react-toastify'
import getCurrentUser from "./customHooks/getCurrentUser";

function App() {
  getCurrentUser()

  return (
    <>
    <ToastContainer/>

      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/signup" element={<SignUp />} />
         <Route path="/login" element={<Login />} />

      </Routes>
    </>
  );
}

export default App;
