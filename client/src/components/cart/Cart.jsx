import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { CartContext } from "../../context/CartContext";
import { ProductsContext } from "../../context/ProductsContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import "./Cart.scss";

export default function Cart() {
  const { cart, setCart, cartTotalPrice, setCartTotalPrice } =
    useContext(CartContext);
  const { products } = useContext(ProductsContext);
  const itemsNumber = cart.reduce((a, i) => {
    return a + i.quantityInCart;
  }, 0);

  useEffect(() => {
    let newTotal = cart.reduce((a, i) => {
      return a + i.price * i.quantityInCart;
    }, 0);
    setCartTotalPrice(newTotal);
    localStorage.setItem("cartTotalPrice", newTotal);
    if (!cart.length) localStorage.removeItem("end_date");
  }, [cart]);

  return (
    <Container className="Cart">
      <div className="Cart-header">
        <div className="Cart-header-title">
          <h2>Your cart</h2>
        </div>
        <div className="Cart-header-content">
          Total ({itemsNumber} items): ${cartTotalPrice}{" "}
        </div>
      </div>
      <div className="Cart-list">
        {cart.map((product, index) => (
          <CartItem
            key={index}
            product={product}
            cart={cart}
            setCart={setCart}
            setCartTotalPrice={setCartTotalPrice}
            products={products}
          />
        ))}
      </div>
      <div className="Cart-summary">
        <CartSummary cart={cart} cartTotalPrice={cartTotalPrice} />
      </div>
    </Container>
  );
}
