import { Container, Button, Col, Row } from "react-bootstrap";
import "./ProductSheetActions.scss";

export default function ProductSheetActions({ product }) {
  return (
    <Container className="ProductSheetActions ">
      <Row className="ProductSheetActions-size">
        <Col xs={12}>Select size:</Col>
        <Col>
          <Button variant="light">10 Oz</Button>
        </Col>
        <Col>
          <Button variant="light">12 Oz</Button>
        </Col>
        <Col>
          <Button variant="light">14 Oz</Button>
        </Col>
        <Col>
          <Button variant="light">16 Oz</Button>
        </Col>{" "}
      </Row>
      <Container className="ProductSheetActions-buy ">
        <Button size="lg" id="buy-btn">
          Add to cart
        </Button>
      </Container>
    </Container>
  );
}
