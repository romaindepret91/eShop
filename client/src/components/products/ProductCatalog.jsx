import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";

export default function ProductCatalog() {
  return (
    <Container>
      <Row>
        <Col className="mb-3">
          <Card>
            <Image src="image1.jpg" alt="image1" fluid />
            <Card.Body>
              <Card.Title>image1</Card.Title>
              <Card.Text>image1</Card.Text>
              <Button variant="primary">View </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-3">
          <Card>
            <Image src="image2.jpg" alt="image2" fluid />
            <Card.Body>
              <Card.Title>image2</Card.Title>
              <Card.Text>image2</Card.Text>
              <Button variant="primary">View </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-3">
          <Card>
            <Image src="image3.jpg" alt="image3" fluid />
            <Card.Body>
              <Card.Title>image3</Card.Title>
              <Card.Text>image3</Card.Text>
              <Button variant="primary">View Product</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
