import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from "@/store/slices/authSlice"
import { Toaster } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
import '@/App.css';
import '@/index.css';
import RouterApp from "@/routes"
import { CartProvider } from './context/CartContext';
import Categories from './pages/admin/Categories';



// admin
export const BackendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        dispatch(login(JSON.parse(storedUser)));
      }
    }, []);

    return (
        <>
            <CartProvider>
                <RouterApp />
            </CartProvider>
            <Toaster 
                position="top-center"
                toastOptions={{
                    style: {
                    borderRadius: '8px',
                    background: '#333',
                    color: '#fff',
                    fontSize: '1.1rem', // حجم الخط
                    padding: '12px 24px', // مسافة داخلية أكبر
                    minWidth: '250px', // عرض مبدئي للتوست
                    },
                }}
            />
        </>
    );
};

export default App;

