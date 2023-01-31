import { Navbar, Container } from "react-bootstrap";
import HeaderLogo from "./HeaderLogo";
import SearchBar from "../search/SearchBar";
import HeaderButtonGroup from "./HeaderButtonGroup";

export default function HeaderTop() {
  return (
    <div className="Header_headerTop">
      <Navbar bg="light">
        <Container className="d-flex">
          <Navbar.Brand href="#home">
            <HeaderLogo />
          </Navbar.Brand>
          <Container className="d-flex justify-content-end">
            <SearchBar />
            <HeaderButtonGroup />
          </Container>
        </Container>
      </Navbar>
    </div>
  );
}
