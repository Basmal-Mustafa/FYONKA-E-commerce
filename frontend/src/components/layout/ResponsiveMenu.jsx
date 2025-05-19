import React from 'react'
import {motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ResponsiveMenu = ({ open, setOpen }) => {

    const { isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem("user");
        toast.success('Logged out successfully!');
        setOpen(false); // اقفل المينيو
        navigate('/login'); // ودي على صفحة اللوجين
    };

    return <AnimatePresence mode="wait">
        {
            open && (
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration:0.2 }}
                    className="sticky top-[100px] h-screen z-50"
                >
                    <div className="text-xl font-semibold uppercase bg-secondary/80 text-white py-6 m-10 rounded-3xl">
                        <ul className='flex flex-col justify-center items-center gap-10 '>
                            <li><a href='/'>Home</a></li>
                            <li><a href='/about'>About</a></li>
                            <li><a href='/products'>Gifts</a></li>
                            <li><a href='/contact'>Contact Us</a></li>
                            <li><a href={isAuthenticated ? "/profile" : "/login"}>{isAuthenticated ? "Profile" : "Login"}</a></li>
                            {isAuthenticated && (
                                <li>
                                    <button onClick={handleLogout} type="button" className='text-lg text-white'>
                                        Log Out
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </motion.div>
            )
        }
    </AnimatePresence>
}

export default ResponsiveMenu;
