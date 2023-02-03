import { Navbar, Nav, Container } from "react-bootstrap";
import SearchBar from "../search/SearchBar";
import "./HeaderMenu.scss";

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
    <Container className="Header_headerMenu d-flex align-items-start">
      <Navbar bg="light" expand="lg">
        <Container className="ps-0">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="collapse-content">
            <Nav className="mr-auto pb-1 border-bottom w-100">
              <Nav.Link className="ps-0" href="/">
                Home
              </Nav.Link>
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
      <Container className="searchBar-wrapper py-2 w-75 bg-light">
        <SearchBar />
      </Container>
    </Container>
  );
}
