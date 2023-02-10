import { Navbar, Container } from "react-bootstrap";
import HeaderLogo from "./HeaderLogo";
import SearchBar from "../search/SearchBar";
import HeaderButtonGroup from "./HeaderButtonGroup";
import "./HeaderTop.scss";
import { Timer } from "./Timer";

export default function HeaderTop({ startCounter, counterData }) {
  return (
    <div className="Header_headerTop">
      <Navbar bg="light">
        <Container className="d-flex">
          <Navbar.Brand href="/">
            <HeaderLogo />
          </Navbar.Brand>
          <Container className="d-flex justify-content-end">
            <SearchBar />
            <Timer startCounter={startCounter} counterData={counterData} />
            <HeaderButtonGroup />
          </Container>
        </Container>
      </Navbar>
    </div>
  );
}
