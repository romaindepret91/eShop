import { Container, Card } from "react-bootstrap";
import "./ProductSheetHeader.scss";

export default function ProductSheetHeader({ product }) {
  return (
    <Container className="ProductSheetHeader">
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            {product.name}
            <span>${product.price}</span>
          </Card.Title>
          <Card.Text>{product.brand}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
