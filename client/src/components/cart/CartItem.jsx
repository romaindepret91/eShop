import { Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./CartItem.scss";
import { useState, useEffect } from "react";

export default function CartItem({
  product,
  products,
  cart,
  setCart,
  setCartTotalPrice,
}) {
  const [quantityAvailable, setQuantityAvailable] = useState(1);
  const [quantitySelected, setQuantitySelected] = useState(1);

  const handleChangeQuantitySelected = (e) => {
    setQuantitySelected(e.currentTarget.value);
    const cartUpdated = cart.map((p) => {
      if (p._id === product._id)
        p.quantityInCart = parseInt(e.currentTarget.value);
      return p;
    });
    setCart(cartUpdated);
    localStorage.setItem("cart", JSON.stringify(cartUpdated));
  };
  useEffect(() => {
    if (products.length) {
      setQuantityAvailable(
        products.find((p) => p._id === product._id)["stock"][
          product.selectedSize.toLowerCase()
        ]
      );
    }
  }, [products]);

  useEffect(() => {
    let newTotal = cart.reduce((a, i) => {
      return a + i.price * i.quantityInCart;
    }, 0);
    setCartTotalPrice(newTotal);
    localStorage.setItem("cartTotalPrice", newTotal);
  }, [cart]);

  useEffect(() => {
    setQuantitySelected(
      cart.find((p) => p._id === product._id)["quantityInCart"]
    );
  }, []);

  return (
    <Card className="CartItem">
      <Card.Body>
        <Card.Img src={product.images[0]["image1"]} />
        <div>
          <Card.Title>
            {product.name}
            <span style={{ fontWeight: 600 }}>$ {product.price}</span>
          </Card.Title>
          <Card.Text> {product.brand}</Card.Text>
          <Card.Text style={{ fontWeight: 300, fontSize: ".8rem" }}>
            Selected size: {product.selectedSize}
          </Card.Text>
        </div>
      </Card.Body>
      <Card.Footer>
        <Card.Text>
          Quantity:{" "}
          {quantityAvailable && (
            <Form.Select
              value={quantitySelected}
              onChange={handleChangeQuantitySelected}
            >
              {(() => {
                const options = [];
                for (let i = 1; i <= quantityAvailable; i++) {
                  options.push(
                    <option key={i} value={i}>
                      {i}
                    </option>
                  );
                }
                return options;
              })()}
            </Form.Select>
          )}
        </Card.Text>

        <FontAwesomeIcon icon={faTrash} />
      </Card.Footer>
    </Card>
  );
}
