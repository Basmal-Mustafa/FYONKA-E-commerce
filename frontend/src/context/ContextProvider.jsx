// import React, { createContext, useContext, useState } from 'react';

// export const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// const ContextProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (item) => {
//     setCartItems([...cartItems, item]);
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default ContextProvider;
