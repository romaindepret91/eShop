import { useContext, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./CartSidePanel.scss";
import { CartContext } from "../../context/CartContext";

export default function CartSidePanel({
  openCartSidePanel,
  setOpenCartSidePanel,
}) {
  const { cart } = useContext(CartContext);
  const product = cart[cart.length - 1];
  console.log(cart);
  return (
    <div className={`CartSidePanel ${openCartSidePanel ? "show" : ""}`}>
      {product && (
        <div className="CartSidePanel-card-wrapper">
          <Container className="CartSidePanel-card">
            <Card>
              <Card.Header>
                Item added to cart
                <Button
                  onClick={() => setOpenCartSidePanel(false)}
                  variant="light"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </Button>{" "}
              </Card.Header>
              <Card.Body>
                <Card.Img src={product.images[0]["image1"]} />
                <div>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text> {product.brand}</Card.Text>
                  <Card.Text style={{ fontWeight: 300, fontSize: ".8rem" }}>
                    Selected size: {product.selectedSize}
                  </Card.Text>
                  <Card.Text style={{ fontWeight: 700 }}>
                    $ {product.price}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
            <Button variant="primary">View Cart</Button>{" "}
            <Button variant="light" onClick={() => setOpenCartSidePanel(false)}>
              Continue shopping
            </Button>{" "}
          </Container>
        </div>
      )}
    </div>
  );
}
