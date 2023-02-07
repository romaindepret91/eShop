import { ButtonGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";

export default function HeaderButtonGroup() {
  const { loginWithRedirect, logout } = useAuth0();
  return (
    <ButtonGroup className="me-2" aria-label="First group">
      <Button
        variant="light"
        onClick={() => {
          logout({ returnTo: window.location.origin });
        }}
      >
        <FontAwesomeIcon icon={faLocationDot} />
      </Button>{" "}
      <Button variant="light" onClick={loginWithRedirect}>
        <FontAwesomeIcon icon={faUser} />
      </Button>{" "}
      <Button variant="light">
        <FontAwesomeIcon icon={faCartShopping} />
      </Button>
    </ButtonGroup>
  );
}
