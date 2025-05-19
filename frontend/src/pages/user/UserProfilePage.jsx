import React from "react";
import { useSelector } from "react-redux";
import UserProfile from "@/components/user/UserProfile";
import Navbar from "@/components/layout/Navbar";
import TopHeader from "@/components/layout/TopHeader";
import Footer from "@/components/layout/Footer";
import NotFoundContent from "@/components/General/NotFoundContent";

const UserProfilePage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <TopHeader />
      <Navbar />
      {user ? <UserProfile user={user} /> : <NotFoundContent />}
      <Footer />
    </div>
  );
};

export default UserProfilePage;
