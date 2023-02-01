import { Navbar, Nav, Container } from "react-bootstrap";

export default function HeaderMenu({
  setOpenSidePanel,
  openSidePanel,
  setSizingGroup,
}) {
  const handleOpenSidePanel = (sizingGroup) => {
    setOpenSidePanel(!openSidePanel);
    setSizingGroup(sizingGroup);
  };
  return (
    <div className="Header_headerMenu">
      <Navbar bg="light" expand="lg">
        <Container className="ps-1">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto pb-1 border-bottom w-100">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link
                data-sizing-group="all-products"
                onClick={(event) =>
                  handleOpenSidePanel(event.target.dataset.sizingGroup)
                }
              >
                All products
              </Nav.Link>
              <Nav.Link
                data-sizing-group="men-products"
                onClick={(event) =>
                  handleOpenSidePanel(event.target.dataset.sizingGroup)
                }
              >
                Men
              </Nav.Link>
              <Nav.Link
                data-sizing-group="women-products"
                onClick={(event) =>
                  handleOpenSidePanel(event.target.dataset.sizingGroup)
                }
              >
                Women
              </Nav.Link>
              <Nav.Link
                data-sizing-group="kids-products"
                onClick={(event) =>
                  handleOpenSidePanel(event.target.dataset.sizingGroup)
                }
              >
                Kids
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
