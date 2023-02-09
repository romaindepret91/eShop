import { Container, Card } from "react-bootstrap";
import "./CartSummary.scss";

export default function CartSummary({ cart, cartTotalPrice }) {
  return (
    <Container>
      <Card className="CartSummary">
        <Card.Header>Order Summary</Card.Header>
        <Card.Body>
          <Card.Text>
            <span>Sub-total</span>
            <span>${cartTotalPrice}</span>
          </Card.Text>
          <Card.Text>
            <span>Delivery*</span>
            <span>-</span>
          </Card.Text>
          <Card.Text>
            <span>Taxes*</span>
            <span>-</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Card.Text>
            Estimated Total: <span>CAD ${cartTotalPrice}</span>
          </Card.Text>
        </Card.Footer>
      </Card>
    </Container>
  );
}
