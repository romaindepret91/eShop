import { Container, Row, Col, Image } from "react-bootstrap";
import { useState } from "react";
import "./ProductSheetImages.scss";

export default function ProductSheetImages({ productImages }) {
  const [displayedImage, setDisplayedImage] = useState(
    productImages[0]["image1"]
  );

  return (
    <Container className="ProductSheetImages mt-2">
      <Row xs={1}>
        <Container>
          <Image
            className="img-fluid border border-light"
            src={displayedImage}
            alt="Product displayed image"
          />
        </Container>
      </Row>
      <Row xs={3}>
        {productImages.map((image, index) => {
          return (
            <Col key={index}>
              <Image
                onClick={() => {
                  setDisplayedImage(image[`image${index + 1}`]);
                }}
                className="img-fluid border border-light"
                src={image[`image${index + 1}`]}
                alt="Product displayed image"
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
