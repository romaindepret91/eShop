import { Routes, Route } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Header } from "./components/header/Header";
import Homepage from "./components/homepage/Homepage";
import ProductCatalog from "./components/products/ProductCatalog";
import ProductSheet from "./components/products/ProductSheet";
import Cart from "./components/cart/Cart";
import { CartContext } from "./context/CartContext";
import resetCounter from "./helpers/resetCounter";

export default function App() {
  const [startCounter, setStartCounter] = useState(
    JSON.parse(localStorage.getItem("startCounter")) || false
  );
  const [counterData, setCounterData] = useState({
    date: Date.now(),
    delay: 30000,
  });
  const wantedDelay = 30000;
  const [openCartSidePanel, setOpenCartSidePanel] = useState(false);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    if (cart.length) {
      if (!startCounter) setStartCounter(true);
    } else setStartCounter(false);

    resetCounter(setCounterData, wantedDelay);
  }, [cart]);

  return (
    <div className="App">
      <Header
        openCartSidePanel={openCartSidePanel}
        setOpenCartSidePanel={setOpenCartSidePanel}
        startCounter={startCounter}
        counterData={counterData}
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
              startCounter={startCounter}
              setStartCounter={setStartCounter}
            />
          }
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}
