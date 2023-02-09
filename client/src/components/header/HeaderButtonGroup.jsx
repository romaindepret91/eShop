import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Button, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "../../context/CartContext";
import {
  faLocationDot,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import "./HeaderButtonGroup.scss";

export default function HeaderButtonGroup() {
  const navigate = useNavigate();
  const { loginWithRedirect, logout } = useAuth0();
  const { cart } = useContext(CartContext);
  return (
    <ButtonGroup className="me-2" aria-label="First group">
      <Button
        className="btn-map"
        variant="light"
        onClick={() => {
          logout({ returnTo: window.location.origin });
        }}
      >
        <FontAwesomeIcon icon={faLocationDot} />
      </Button>{" "}
      <Button className="btn-user" variant="light" onClick={loginWithRedirect}>
        <FontAwesomeIcon icon={faUser} />
      </Button>{" "}
      <Button
        className="btn-cart"
        variant="light"
        onClick={() => {
          navigate("/cart");
        }}
      >
        <FontAwesomeIcon icon={faCartShopping} />
        {cart.length > 0 && (
          <Badge pill bg="warning" text="dark">
            {cart.length}
          </Badge>
        )}
      </Button>
    </ButtonGroup>
  );
}
