import { useLocation } from "react-router-dom";
import { useState } from "react";
import ProductSheetImages from "./ProductSheetImages";
import ProductSheetHeader from "./ProductSheetHeader";
import ProductSheetActions from "./ProductSheetActions";
import { Container, Row, Col } from "react-bootstrap";

export default function ProductSheet({
  openCartSidePanel,
  setOpenCartSidePanel,
}) {
  const { state } = useLocation();
  const [product] = useState(state.product);
  const [productImages] = useState(product.images);

  return (
    <Container className="ProductSheet">
      {" "}
      <Row>
        <Col xs={12} md={6}>
          <ProductSheetImages productImages={productImages} />
        </Col>
        <Col xs={12} sm={10} md={6} lg={5} className="d-flex flex-column ">
          <ProductSheetHeader product={product} />
          <ProductSheetActions
            product={product}
            openCartSidePanel={openCartSidePanel}
            setOpenCartSidePanel={setOpenCartSidePanel}
          />
        </Col>
      </Row>
    </Container>
  );
}
