import React from "react";
import { NavLink } from 'react-router-dom';
import { assests } from '../../assets/Assests';
import './AdminSidebar.css';  

const Sidebar = () => {
  return (
    <div className='w-[230px] min-h-screen bg-slate-100 bg-stone-900'>
      <div className='flex flex-col gap-3 pt-6 px-5 text-[15px]'>
        
        <NavLink className='flex w-[160px] items-center gap-3 py-2 md:hover:bg-white md:hover:shadow duration-300 rounded-xl text-gray-600 hover:text-gray-900 hover:font-medium transition-colors' to="/admin">
            <img className='w-6 m-1 ' src={assests.home} alt="" />
            <p className='hidden md:block text-pink-500 text-lg'>Dashboard</p>
        </NavLink>

        <NavLink className='flex w-[160px] items-center gap-3 py-2 md:hover:bg-white md:hover:shadow duration-300 rounded-xl text-gray-600 hover:text-gray-900 hover:font-medium transition-colors' to="/admin/categories">
            <img className='w-6 m-1 ' src={assests.List} alt="" />
            <p className='hidden md:block text-pink-500 text-lg'>Categories</p>
        </NavLink>

        <NavLink className='flex w-[160px] items-center gap-3 py-2 md:hover:bg-white md:hover:shadow duration-300 rounded-xl text-gray-600 hover:text-gray-900 hover:font-medium transition-colors' to="/admin/add">
            <img className='w-6 m-1 ' src={assests.Plus} alt="" />
            <p className='hidden md:block text-pink-500 text-lg'>Add Items</p>
        </NavLink>

        <NavLink className='flex w-[160px] items-center gap-3 py-2 md:hover:bg-white md:hover:shadow duration-300 rounded-xl text-gray-600 hover:text-gray-900 hover:font-medium transition-colors' to="/admin/products">
            <img className='w-5 m-1 ' src={assests.List} alt="" />
            <p className='hidden md:block text-pink-500 text-lg '>List Items</p>
        </NavLink>

        <NavLink className='flex w-[160px] items-center gap-3 py-2 md:hover:bg-white md:hover:shadow duration-300 rounded-xl text-gray-600 hover:text-gray-900 hover:font-medium transition-colors' to="/admin/orders">
            <img className='w-6 m-1' src={assests.cancel} alt="" />
            <p className='hidden md:block text-pink-500 text-lg'>Orders</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar;
