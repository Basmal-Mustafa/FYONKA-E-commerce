import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; 

import HomePage from '@/pages/shop/HomePage';
import About from "@/pages/shared/AboutPage";
import LoginPage from "@/pages/user/LoginPage";
import RegisterPage from "@/pages/user/RegisterPage";
import UserProfilePage from "@/pages/user/UserProfilePage";
import CheckoutPage from "@/pages/user/CheckoutPage";
import ContactPage from "@/pages/shared/ContactPage";
import ProductPage from "@/pages/shop/ProductPage";
import ProductDetails from "@/pages/shop/ProductDetailsPage";
import NotFoundContent from "@/components/General/NotFoundContent";
import { CartProvider } from '@/context/CartContext';

// صفحات الأدمن
import DashboardLayout from "@/components/layout/DashboardLayout";
import Home from "@/pages/admin/Home";
import AddProduct from "@/pages/admin/AddProduct";
import ProductsList from "@/pages/admin/ProductsList";
import EditProduct from "@/pages/admin/EditProduct";
import Orders from "@/pages/admin/Orders";
import Categories from "@/pages/admin/Categories";

function RouterApp() {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <CartProvider>
            <Routes>
                {/* صفحات المستخدم */}
                <Route path="*" element={<NotFoundContent />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* صفحات المنتجات */}
                {/* <Route path="/products" element={<Products />} /> */}
                <Route path="/products" element={<ProductPage />} />
                <Route path="/product/:id" element={<ProductDetails />} />

                 {/* الداشبورد */}
                 <Route path="/admin" element={<DashboardLayout />}>
                    <Route index element={<Home />} /> 
                    <Route path="add" element={<AddProduct />} />
                    <Route path="Add" element={<AddProduct />} />
                    <Route path="products" element={<ProductsList />} />
                    <Route path="edit-product/:id" element={<EditProduct />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="categories" element={<Categories />} />
                 </Route>

                
                {/* صفحات السلة */}
                {/* <Route path="/products" element={<Products showModal={showModal} toggleModal={toggleModal} />} 
                /> */}
            </Routes>
        </CartProvider>
    );
}

export default RouterApp;
