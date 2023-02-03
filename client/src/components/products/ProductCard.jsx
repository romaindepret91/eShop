import { Image, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ProductCard.scss";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <Card
      className="Product-card"
      onClick={() => {
        navigate(`/products/${product.slug}`, {
          state: { product: product },
        });
      }}
    >
      <Image src={product.images[0]["image1"]} alt="image1" fluid />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.brand}</Card.Text>
        <Card.Text>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
