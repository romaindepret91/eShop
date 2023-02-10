import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Auth0Provider } from "@auth0/auth0-react";
import SizingGroupContextProvider from "./context/SizingGroupContext";
import ProductsContextProvider from "./context/ProductsContext";
import CartContextProvider from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ypg68f424ulae2qh.us.auth0.com"
      clientId="Ec8sBNg4wDxp5iXu7vsqrBGDFrrKLTBZ"
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <ProductsContextProvider>
          <SizingGroupContextProvider>
            <CartContextProvider>
              <App />
            </CartContextProvider>
          </SizingGroupContextProvider>
        </ProductsContextProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
