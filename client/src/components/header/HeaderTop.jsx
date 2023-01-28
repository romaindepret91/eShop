import { Navbar, Container } from "react-bootstrap";
import HeaderLogo from "./HeaderLogo";

export default function HeaderTop() {
  return (
    <div className="Header_headerTop">
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand href="#home">
            <HeaderLogo />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}
