import React from "react";
import { assests } from '../../assets/Assests'
import './AdminNavbar.css';  



const AdminNavbar = ({setToken}) => {
  return (
    <div className=" dashboard-navbar d-flex align-items-center justify-content-between py-2 px-4 navbar-custom">
      <div className="position-relative logo-section">
        <div className="d-flex align-items-center gap-2">
          <img src={assests.Logo} alt="Logo" className="logo-img" />
          <h1 className="brand-title">FYONKA</h1>
        </div>
      </div>
      <button 
        onClick={() => setToken('')} 
        className="btn btn-dark rounded-pill logout-btn">
        Log Out
      </button>
    </div>

  )
}

export default AdminNavbar;