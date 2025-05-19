import React from "react";
import Navbar from "@/components/layout/Navbar"
import TopHeader from "@/components/layout/TopHeader";
import Footer from "@/components/layout/Footer";
import RegisterForm from "@/components/user/RegisterForm";

export default function RegisterPage() {
    return (
        <div>
            <TopHeader />
            <Navbar />
            <RegisterForm />
            <Footer />
        </div>
    )
}
