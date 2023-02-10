import { useState, useContext, useEffect } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import { CartContext } from "../../context/CartContext";
import { getOneProduct } from "../../dbRequests/products";
import "./ProductSheetActions.scss";

export default function ProductSheetActions({
  product,
  openCartSidePanel,
  setOpenCartSidePanel,
  setStartCounter,
  handleUpdateProducStock,
}) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [productStock, setProductStock] = useState(null);
  const { cart, setCart, cartTotalPrice, setCartTotalPrice } =
    useContext(CartContext);

  const handleSelectSize = (e) => {
    setSelectedSize(e.currentTarget.innerText);
    const eltClass = e.currentTarget.className;
    const sizes =
      e.currentTarget.parentNode.parentNode.querySelectorAll(".col-2 > button");

    sizes.forEach((element) => {
      element.className === eltClass
        ? element.classList.add("active")
        : element.classList.remove("active");
    });
  };

  const handleAddToCart = () => {
    if (
      cart.some((p) => {
        return p._id === product._id && p.selectedSize === selectedSize;
      })
    ) {
      cart.forEach((p) => {
        if (p._id === product._id && p.selectedSize === selectedSize) {
          p.quantityInCart += 1;
        }
      });
    } else {
      product.quantityInCart = 1;
      product.selectedSize = selectedSize;
      cart.push(product);
    }
    setCart(cart);
    setCartTotalPrice(cartTotalPrice + product.price);
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartTotalPrice", cartTotalPrice + product.price);
    setOpenCartSidePanel(!openCartSidePanel);
    setStartCounter(true);
    handleUpdateProducStock({ size: selectedSize, quantity: -1 });
    setTimeout(() => {
      setOpenCartSidePanel(false);
    }, 6000);
  };

  useEffect(() => {
    getOneProduct(product.slug, product._id).then((res) => {
      setProductStock(res.data.stock);
    });
  }, [product]);

  return (
    <Container className="ProductSheetActions ">
      <Row className="ProductSheetActions-size">
        <Col xs={12}>
          Select size:<span>{selectedSize}</span>
        </Col>
        {productStock &&
          Object.keys(productStock).map((size) => {
            return (
              <Col xs={2} key={size}>
                <Button
                  variant="light"
                  className={size}
                  disabled={productStock[size] < 1}
                  onClick={(e) => handleSelectSize(e)}
                >
                  {!size.includes("oz") ? size.toUpperCase() : size}
                </Button>
              </Col>
            );
          })}
      </Row>
      <Container className="ProductSheetActions-buy ">
        <Button
          disabled={!selectedSize}
          size="lg"
          id="buy-btn"
          onClick={() => {
            handleAddToCart();
          }}
        >
          Add to cart
        </Button>
      </Container>
    </Container>
  );
}
