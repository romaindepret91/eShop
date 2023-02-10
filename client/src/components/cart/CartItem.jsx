import { Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./CartItem.scss";
import { useState, useEffect } from "react";
import { updateProductStock } from "../../dbRequests/products";

export default function CartItem({ product, products, cart, setCart }) {
  const [quantityAvailable, setQuantityAvailable] = useState(1);

  const handleChangeQuantitySelected = async (e) => {
    let quantityDB;
    const cartUpdated = cart.map((p) => {
      if (p._id === product._id && p.selectedSize === product.selectedSize) {
        quantityDB = -(parseInt(e.currentTarget.value) - p.quantityInCart);
        p.quantityInCart = parseInt(e.currentTarget.value);
      }
      return p;
    });
    setCart(cartUpdated);
    localStorage.setItem("cart", JSON.stringify(cartUpdated));
    await updateProductStock(product._id, {
      size: product.selectedSize,
      quantity: quantityDB,
    });
  };

  const handleDeleteItem = async (e) => {
    const id = e.currentTarget.parentElement.parentElement.dataset.productId;
    const size = e.currentTarget.parentElement.parentElement
      .querySelector(".selectedSize")
      .innerText.split(" ")
      .at(-1);

    const quantityDB = cart.find((p) => p._id === id).quantityInCart;
    await updateProductStock(product._id, {
      size: product.selectedSize,
      quantity: quantityDB,
    });

    const cartUpdated = cart.filter((p) => {
      return p._id !== id || p.selectedSize !== size;
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
  }, [products, cart]);

  return (
    <Card className="CartItem" data-product-id={product._id}>
      <Card.Body>
        <Card.Img src={product.images[0]["image1"]} />
        <div>
          <Card.Title>
            {product.name}
            <span style={{ fontWeight: 600 }}>$ {product.price}</span>
          </Card.Title>
          <Card.Text> {product.brand}</Card.Text>
          <Card.Text
            className="selectedSize"
            style={{ fontWeight: 300, fontSize: ".8rem" }}
          >
            Selected size: {product.selectedSize}
          </Card.Text>
        </div>
      </Card.Body>
      <Card.Footer>
        <Card.Text>
          Quantity:{" "}
          {quantityAvailable && (
            <Form.Select
              value={product.quantityInCart}
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
        <FontAwesomeIcon icon={faTrash} onClick={handleDeleteItem} />
      </Card.Footer>
    </Card>
  );
}
