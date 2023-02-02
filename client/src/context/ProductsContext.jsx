import React, { createContext, useState, useEffect } from "react";
import { getAllProducts } from "../dbRequests/products";
import slugify from "slugify";

export const ProductsContext = createContext({
  filteredProducts: [],
  setFilteredProducts: () => {},
});

const ProductsContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [url, setUrl] = useState(window.location.pathname);

  useEffect(() => {
    if (!isLoaded) {
      getAllProducts().then((products) => {
        setProducts(products.data);
        setIsLoaded(true);
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    if (url.includes("products") && products.length) {
      let sizingGroup;
      let category;
      const urlLength = url.split("/").length;
      if (urlLength === 3) {
        sizingGroup = url.split("/")[urlLength - 1];
        setFilteredProducts(
          products.filter((p) => {
            if (sizingGroup !== "all") return p.sizingGroup === sizingGroup;
            return p;
          })
        );
      } else if (urlLength === 4) {
        sizingGroup = url.split("/")[urlLength - 2];
        category = url.split("/")[urlLength - 1];
        setFilteredProducts(
          products.filter((p) => {
            if (sizingGroup === "all")
              return slugify(p.category.name).toLowerCase() === category;

            return (
              slugify(p.category.name).toLowerCase() === category &&
              p.sizingGroup === sizingGroup
            );
          })
        );
      }
    }
  }, [url, products]);

  return (
    <ProductsContext.Provider
      value={{ filteredProducts, setFilteredProducts, url }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
