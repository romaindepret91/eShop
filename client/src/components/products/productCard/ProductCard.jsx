import { Image, Card, Button } from "react-bootstrap";

export default function ProductCard() {
  return (
    <Card>
      <Image src="image1.jpg" alt="image1" fluid />
      <Card.Body>
        <Card.Title>image1</Card.Title>
        <Card.Text>image1</Card.Text>
        <Button variant="primary">View </Button>
      </Card.Body>
    </Card>
  );
}
