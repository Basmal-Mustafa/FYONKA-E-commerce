// src/store/index.js

// import cartReducer from '@/cartSlice'; 
// import productReducer from '@./productSlice'; 

// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});



