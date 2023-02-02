import { Image, Card } from "react-bootstrap";
import { serverURL } from "../../../dbRequests/serverURL";

export default function ProductCard({ product }) {
  const imageURL = `${serverURL}${product.images[0]["image1"].replace(
    "public",
    ""
  )}`;

  return (
    <Card>
      <Image src={imageURL} alt="image1" fluid />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.brand}</Card.Text>
        <Card.Text>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
