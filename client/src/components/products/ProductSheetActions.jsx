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
  const { cart, setCart } = useContext(CartContext);
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
    product.selectedSize = selectedSize;
    cart.push(product);
    setCart(cart);
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
