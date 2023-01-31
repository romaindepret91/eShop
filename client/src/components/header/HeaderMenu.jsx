import { Navbar, Nav, Container } from "react-bootstrap";

export default function HeaderMenu({ setOpenSidePanel, openSidePanel }) {
  return (
    <div className="Header_headerMenu">
      <Navbar bg="light" expand="lg">
        <Container className="ps-1">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>Home</Nav.Link>
              <Nav.Link onClick={() => setOpenSidePanel(!openSidePanel)}>
                All products
              </Nav.Link>
              <Nav.Link>Men</Nav.Link>
              <Nav.Link>Women</Nav.Link>
              <Nav.Link>Kids</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
