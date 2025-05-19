import React, { useState } from 'react';
import '@/styles/Checkout.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    shippingAddress: '',
  });

  const [orderDetails, setOrderDetails] = useState({
    orderId: '12345',
    products: [
      { name: 'Product 1', price: 50, quantity: 1 },
      { name: 'Product 2', price: 30, quantity: 2 },
      { name: 'Product 2', price: 30, quantity: 2 },
    ],
    totalAmount: 110,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h2>Checkout Form</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street"
            required
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
          <input
            type="text"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            placeholder="Shipping Address"
            required
          />
          <button type="submit">Place Order</button>
        </form>
      </div>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="order-details">
          <div className="order-id">
            <span>Order ID: </span>
            <strong>{orderDetails.orderId}</strong>
          </div>
          <div className="products">
            {orderDetails.products.map((product, index) => (
              <div key={index} className="product-card">
                <span>{product.name}</span>
                <span>Quantity: {product.quantity}</span>
                <span>Price: ${product.price}</span>
              </div>
            ))}
          </div>
          <div className="total-amount">
            <span>Total Amount: </span>
            <strong>${orderDetails.totalAmount}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
