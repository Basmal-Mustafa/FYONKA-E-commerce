import React, { useState, useEffect } from "react";
import "@/styles/RegisterForm.css"
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

function RegisterForm() {
    const [fName, setFName] = useState("");
    // const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, user } = useSelector((state) => state.auth);
    
    useEffect(() => {
        if (isAuthenticated) {
        navigate("/login");
        }
    }, [isAuthenticated, navigate]);


    const handleRegister = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
            username: fName,
        //   lastName: lName,
            email,
          password,
        });
  
        console.log('Registration Response:', response.data);
  
        dispatch(login(response.data.user)); // يسجل اليوزر مباشرة بعد التسجيل
        toast.success('Registration successful!');
        navigate('/login');
    } catch (error) {
        console.error('Registration Error:', error.response?.data?.message || error.message);
        toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };


    return (
        <div className="register-container">
            <h1>Create account</h1>
            <form className="register-form" onSubmit={handleRegister}>
                <input type="text" placeholder="Name" value={fName} onChange={(e) => setFName(e.target.value)} required />
                {/* <input type="text" placeholder="Last name" value={lName} onChange={(e) => setLName(e.target.value)} required /> */}
                <input type="email" placeholder="Email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
                <input type="password" placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
                <button type="submit">CREATE</button>
            </form>
            <div className="return-link">
                <a href="/home">Return to store</a>
            </div>          
        </div>
    );
}


export default RegisterForm;

