import React, { useState, useEffect } from "react";
import "@/styles/LoginForm.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth); 

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile"); 
    }
  }, [isAuthenticated, navigate]);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      
      console.log('Response Data:', response.data);

      dispatch(login(response.data.user));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log('Logged in user:', response.data.user);
      toast.success('LogIn successful!');
      navigate('/profile');
    } catch (error) {
      console.error('Login Error:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "LogIn failed. Please try again.");
    }
  };



  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">SIGN IN</button>
      </form>
      <div className="login-links mt-5">
        <a href="/home">Return to store</a>
        <a href="/register">Create Account</a>
        {/* <a href="/">Forgot your password?</a> */}
      </div>
    </div>
  );
}

export default LoginForm;