import React, { createContext, useState } from "react";

export const ProductsContext = createContext({
  products: [],
  setProducts: () => {},
});

const ProductsContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
