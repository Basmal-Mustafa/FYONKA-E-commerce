import React from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import "@/styles/UserProfile.css"
import toast from 'react-hot-toast';
// import Button from '@/components/common/Button';

const UserProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);


    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem("user");
        toast.success('Logged out successfully!');
        navigate('/login');
    };

    console.log(user);
    
    return (
        <div className="profile-container">
          <h1 className="profile-title">My Account</h1>
    
          <div className="profile-content">
            <div className="order-history">
              <h3>Order history</h3>
              <p>You haven't placed any orders yet.</p>
              <hr />
            </div>
    
            <div className="account-details">
              <h2>Account details</h2>
              <br />
              <strong>{user?.username}</strong>
              <p>{user?.email}</p>
              <br />
              <p>Egypt</p>
              <br />
              <button onClick={handleLogout}className="logout-button" type="button">Log Out</button>
            </div>
          </div>
        </div>
      );
};

export default UserProfile;
