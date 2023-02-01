import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import SizingGroupContextProvider from "./context/SizingGroupContext";
import ProductsContextProvider from "./context/ProductsContext";
import Homepage from "./components/homepage/Homepage";
import ProductCatalog from "./components/products/ProductCatalog";

export default function App() {
  return (
    <div className="App">
      <ProductsContextProvider>
        <SizingGroupContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/products/*" element={<ProductCatalog />}></Route>
          </Routes>
        </SizingGroupContextProvider>
      </ProductsContextProvider>
    </div>
  );
}
