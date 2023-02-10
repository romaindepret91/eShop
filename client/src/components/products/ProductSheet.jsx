import { useLocation } from "react-router-dom";
import { useState } from "react";
import ProductSheetImages from "./ProductSheetImages";
import ProductSheetHeader from "./ProductSheetHeader";
import ProductSheetActions from "./ProductSheetActions";
import { Container, Row, Col } from "react-bootstrap";
import { updateProductStock } from "../../dbRequests/products";

export default function ProductSheet({
  openCartSidePanel,
  setOpenCartSidePanel,
  startCounter,
  setStartCounter,
}) {
  const { state } = useLocation();
  const [product, setProduct] = useState(state.product);
  const [productImages] = useState(product.images);

  const handleUpdateProducStock = async (stock) => {
    const updatedProduct = await updateProductStock(product._id, stock);
    setProduct(updatedProduct.data);
  };

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
            startCounter={startCounter}
            setStartCounter={setStartCounter}
            handleUpdateProducStock={handleUpdateProducStock}
          />
        </Col>
      </Row>
    </Container>
  );
}
