import { useState } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import "./ProductSheetActions.scss";

export default function ProductSheetActions({ product }) {
  const [selectedSize, setSelectedSize] = useState("");
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
        <Button size="lg" id="buy-btn">
          Add to cart
        </Button>
      </Container>
    </Container>
  );
}
