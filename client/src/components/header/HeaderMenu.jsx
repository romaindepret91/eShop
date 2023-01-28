import { Navbar, Nav, Container } from "react-bootstrap";

export default function HeaderMenu() {
  return (
    <div className="Header_headerMenu">
      <Navbar bg="light" expand="lg">
        <Container className="ps-1">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
