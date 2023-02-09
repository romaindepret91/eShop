import React, { createContext, useState } from "react";

export const CartContext = createContext({
  cart: [],
  setCart: () => {},
  cartTotalPrice: 0,
  setCartTotalPrice: () => {},
});

const CartContextProvider = (props) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [cartTotalPrice, setCartTotalPrice] = useState(
    JSON.parse(localStorage.getItem("cartTotalPrice")) || 0
  );

  return (
    <CartContext.Provider
      value={{ cart, setCart, cartTotalPrice, setCartTotalPrice }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
