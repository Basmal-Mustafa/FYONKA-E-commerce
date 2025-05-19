import React, { useState, StrictMode }  from "react";
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; 
import { store } from '@/store/index.js';
import App from '@/App';
import "@/App.css"
import '@/index.css';
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from '@/context/cart';
// import Cart from '@/components/cart/Cart';



ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CartProvider>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </CartProvider>
    </Provider>
  </StrictMode>
);