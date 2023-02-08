import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Header } from "./components/header/Header";
import SizingGroupContextProvider from "./context/SizingGroupContext";
import ProductsContextProvider from "./context/ProductsContext";
import CartContextProvider from "./context/CartContext";
import Homepage from "./components/homepage/Homepage";
import ProductCatalog from "./components/products/ProductCatalog";
import ProductSheet from "./components/products/ProductSheet";

export default function App() {
  const [openCartSidePanel, setOpenCartSidePanel] = useState(false);
  return (
    <div className="App">
      <ProductsContextProvider>
        <SizingGroupContextProvider>
          <CartContextProvider>
            <Header
              openCartSidePanel={openCartSidePanel}
              setOpenCartSidePanel={setOpenCartSidePanel}
            />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/products/all" element={<ProductCatalog />}>
                <Route path="*" element={<ProductCatalog />} />
              </Route>
              <Route path="/products/women" element={<ProductCatalog />}>
                <Route path="*" element={<ProductCatalog />} />
              </Route>
              <Route path="/products/men" element={<ProductCatalog />}>
                <Route path="*" element={<ProductCatalog />} />
              </Route>
              <Route
                path="/products/:slug"
                element={
                  <ProductSheet
                    openCartSidePanel={openCartSidePanel}
                    setOpenCartSidePanel={setOpenCartSidePanel}
                  />
                }
              />
            </Routes>
          </CartContextProvider>
        </SizingGroupContextProvider>
      </ProductsContextProvider>
    </div>
  );
}
