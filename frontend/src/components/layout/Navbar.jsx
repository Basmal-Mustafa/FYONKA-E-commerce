import React, { useState } from "react";
import navLinks from "@/mockData/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdMenu } from 'react-icons/md';
import ResponsiveMenu from "@/components/layout/ResponsiveMenu";
import ResponsiveSearch from "@/components/layout/Search";
import "@/styles/Navbar.css";
import { useCart } from '@/context/CartContext';
import Cart from "@/components/cart/Cart";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showCart, setShowCart] = useState(false); // حالة ظهور السلة
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleSearchClick = () => {
    setSearchOpen(prev => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem("user");
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <>
      <nav className="bg-white/20 backdrop-blur-md sticky mb-2 top-0 z-40">
        <div className="flex py-3 px-2 justify-between gap-10">
          <div className="hidden md:flex gap-3">
            <img className="img-logo md:w-16 md:h-16 sm:w-20 sm:h-14 sm:mt-2 md:mt-1 ml-3" src="/fyonka.png" alt="Logo" />
            <a className="webName text-4xl font-bold md:pt-4 sm:mt-1 inline-block sm:pt-7" href="/home">FYONKA</a>
          </div>
          <div className="hidden md:block">
            <ul className="flex flex-wrap justify-end gap-x-4 gap-y-2 pt-4 pl-10 min-w-[600px] mb-2 mr-2 md:mt-1">
              {navLinks.map((link, index) => {
                if (link.title === "AccountOrProfile") {
                  return (
                    <li key={index} className="inline-block">
                      <a className="inline-block py-1 px-3 font-semibold" href={isAuthenticated ? "/profile" : "/login"}>
                        <FontAwesomeIcon icon={link.icon} className="px-1" />
                        {isAuthenticated ? "Profile" : "Login"}
                      </a>
                    </li>
                  );
                }

                if (link.title === "LogoutButton") {
                  return isAuthenticated ? (
                    <li key={index}>
                      <button onClick={handleLogout} className="logout-button" type="button">Log Out</button>
                    </li>
                  ) : null;
                }

                if (link.isSearch) {
                  return (
                    <li key={index}>
                      <a
                        className="inline-block py-1 px-3 font-semibold cursor-pointer"
                        href={link.link}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSearchClick();
                        }}
                      >
                        {link.icon && <FontAwesomeIcon icon={link.icon} className="px-1" />}
                        {link.title}
                      </a>
                    </li>
                  );
                }
                if (link.title === "Cart") {
                  return (
                    <li key={index}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleCart(); // فتح/إغلاق السلة بدلاً من الانتقال لصفحة
                        }}
                  className="inline-block py-1 px-3 font-semibold cursor-pointer"
                        >
                        {link.icon && <FontAwesomeIcon icon={link.icon} className="px-1" />}
                        {link.title} ({cartItems.length}) {/* عدد العناصر في السلة */}
                        </a>
                      </li>
                    );
                  }    

                return (
                  <li key={index}>
                    <a className="inline-block py-1 px-3 font-semibold" href={link.link}>
                      {link.icon && <FontAwesomeIcon icon={link.icon} className="px-1" />}
                      {link.title}
                    </a>
                  </li>

                  
                );
              })}
            </ul>
          </div>

          <div className="md:hidden w-full flex justify-between px-4 py-3">
            <div className="text-3xl flex gap-2 font-bold">
              <img className="img-logo w-12 h-11" src="src/assets/fyonka.png" alt="Logo" />
              <h1><a className="text-secondary pt-2 inline-block" href="#">FYONKA</a></h1>
            </div>
            <div className="flex items-center gap-1">
              <button 
                className="text-2xl p-2 rounded-full hover:bg-primary hover:text-white duration-200"
                onClick={toggleCart} // فتح/إغلاق السلة في الموبايل
              >
                <FontAwesomeIcon icon={faCartShopping} />
                {/* (اختياري) إظهار عدد العناصر في السلة */}
                {cartItems.length > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button 
                className="text-2xl p-2 rounded-full hover:bg-primary hover:text-white duration-200" 
                onClick={handleSearchClick}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>

            <button className="rounded-full hover:bg-secondary p-2 hover:text-white" onClick={() => setOpen(prev => !prev)}>
              <MdMenu className="text-4xl" />
            </button>

           
          </div>
        </div>

      </nav>

      <ResponsiveMenu open={open} setOpen={setOpen} />
      <ResponsiveSearch open={searchOpen} setOpen={setSearchOpen} />
      
      {/* إضافة مكون السلة */}
      <Cart showModal={showCart} toggle={toggleCart} />
    </>
  );
}


{/*
            <div className="flex items-center gap-1">
              <button className="text-2xl p-2 rounded-full hover:bg-primary hover:text-white duration-200">
                <FontAwesomeIcon icon={faCartShopping} />
              </button>
              <button className="text-2xl p-2 rounded-full hover:bg-primary hover:text-white duration-200" onClick={handleSearchClick}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>

            <button className="rounded-full hover:bg-secondary p-2 hover:text-white" onClick={() => setOpen(prev => !prev)}>
              <MdMenu className="text-4xl" />
            </button>
          </div>
        </div>
      </nav>

      <ResponsiveMenu open={open} setOpen={setOpen} />
      <ResponsiveSearch open={searchOpen} setOpen={setSearchOpen} />
    </>
  );
}
*/}
export default Navbar;
