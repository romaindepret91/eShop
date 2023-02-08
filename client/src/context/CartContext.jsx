import React, { createContext, useState } from "react";

export const CartContext = createContext({
  cart: [],
  setCart: () => {},
});

const CartContextProvider = (props) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
