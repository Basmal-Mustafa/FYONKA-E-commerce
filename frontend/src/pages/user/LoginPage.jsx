// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginSuccess, loginFailure } from '../store/authSlice'; // Importing actions
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { loginUser } from '../api/auth'; // Assuming there is an API function for login

// const Login = () => {}

// export default Login;


import React from "react";
import TopHeader from "@/components/layout/TopHeader";
import Navbar from "@/components/layout/Navbar"
import LoginForm from "@/components/user/LoginForm";
import Footer from "@/components/layout/Footer"

export default function LoginPage() {
    return (
        <div>
            <TopHeader />
            <Navbar />
            <LoginForm />
            <Footer />
        </div>
    )
}
