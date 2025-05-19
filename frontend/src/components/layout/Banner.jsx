import React from 'react'
import "@/styles/Banner.css"
import { useNavigate } from 'react-router-dom';

function Banner() {

    const navigate = useNavigate();

    const openProduct = () => {
        navigate('/products');
    };    

    return (
        <div className="hero-container">
            <img src="/src/assets/Home.webp" alt="Hero" className="hero-img" />
            <div className="hero-content">
                <h1>Every Gift Has A Story</h1>
                <p>Let's tell unforgettable stories together, one gift at a time.</p>
                <button className="hero-btn" onClick={openProduct}>SHOP NOW</button>
            </div>
        </div>
    )
}

export default Banner
