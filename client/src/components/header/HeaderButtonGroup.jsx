import { ButtonGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

export default function HeaderButtonGroup() {
  return (
    <ButtonGroup className="me-2" aria-label="First group">
      <Button variant="light">
        <FontAwesomeIcon icon={faLocationDot} />
      </Button>{" "}
      <Button variant="light">
        <FontAwesomeIcon icon={faUser} />
      </Button>{" "}
      <Button variant="light">
        <FontAwesomeIcon icon={faCartShopping} />
      </Button>
    </ButtonGroup>
  );
}
