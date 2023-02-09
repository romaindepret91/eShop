import { useState, useContext } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import { CartContext } from "../../context/CartContext";
import "./ProductSheetActions.scss";

export default function ProductSheetActions({
  product,
  openCartSidePanel,
  setOpenCartSidePanel,
}) {
  const [selectedSize, setSelectedSize] = useState("");
  const { cart, setCart, cartTotalPrice, setCartTotalPrice } =
    useContext(CartContext);
  const handleSelectSize = (e) => {
    setSelectedSize(e.currentTarget.innerText);
    const eltClass = e.currentTarget.className;
    const sizes =
      e.currentTarget.parentNode.parentNode.querySelectorAll(".col-2 > button");

    sizes.forEach((element) => {
      element.className === eltClass
        ? element.classList.add("active")
        : element.classList.remove("active");
    });
  };

  const handleAddToCart = () => {
    if (
      cart.some((p) => {
        return p._id === product._id && p.selectedSize === selectedSize;
      })
    ) {
      const i = cart.indexOf(product);
      cart[i].quantityInCart += 1;
    } else {
      product.quantityInCart = 1;
      product.selectedSize = selectedSize;
      cart.push(product);
    }
    setCart(cart);
    setCartTotalPrice(cartTotalPrice + product.price);
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartTotalPrice", cartTotalPrice + product.price);
    setOpenCartSidePanel(!openCartSidePanel);
    setTimeout(() => {
      setOpenCartSidePanel(false);
    }, 6000);
  };
  return (
    <Container className="ProductSheetActions ">
      <Row className="ProductSheetActions-size">
        <Col xs={12}>
          Select size:<span>{selectedSize}</span>
        </Col>
        {Object.keys(product.stock).map((size, quantity) => {
          return (
            <Col xs={2} key={size}>
              <Button
                variant="light"
                className={size}
                disabled={quantity < 1}
                onClick={(e) => handleSelectSize(e)}
              >
                {!size.includes("oz") ? size.toUpperCase() : size}
              </Button>
            </Col>
          );
        })}
      </Row>
      <Container className="ProductSheetActions-buy ">
        <Button
          size="lg"
          id="buy-btn"
          onClick={() => {
            handleAddToCart();
          }}
        >
          Add to cart
        </Button>
      </Container>
    </Container>
  );
}
