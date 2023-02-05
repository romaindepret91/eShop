import { Container, Button, Col, Row } from "react-bootstrap";
import "./ProductSheetActions.scss";

export default function ProductSheetActions({ product }) {
  return (
    <Container className="ProductSheetActions ">
      <Row className="ProductSheetActions-size">
        <Col xs={12}>Select size:</Col>
        {Object.keys(product.stock).map((size, quantity) => {
          return (
            <Col>
              <Button variant="light" disabled={quantity < 1}>
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
