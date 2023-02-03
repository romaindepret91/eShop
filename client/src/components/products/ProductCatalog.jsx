import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import ProductCard from "./ProductCard";

export default function ProductCatalog() {
  const { filteredProducts } = useContext(ProductsContext);

  return (
    <Container>
      <Row xs={1} md={2} lg={3} xl={4}>
        {filteredProducts.map((product) => (
          <Col key={product._id} className="mb-3">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
