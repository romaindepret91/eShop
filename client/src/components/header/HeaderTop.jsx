import { Navbar, Container } from "react-bootstrap";
import HeaderLogo from "./HeaderLogo";
import SearchBar from "../search/SearchBar";
import HeaderButtonGroup from "./HeaderButtonGroup";
import Countdown from "react-countdown";
import "./HeaderTop.scss";

export default function HeaderTop() {
  return (
    <div className="Header_headerTop">
      <Navbar bg="light">
        <Container className="d-flex">
          <Navbar.Brand href="/">
            <HeaderLogo />
          </Navbar.Brand>
          <Container className="d-flex justify-content-end">
            <SearchBar />
            <Countdown
              autoStart={false}
              date={Date.now() + 900000}
              renderer={({ minutes, seconds }) => {
                return (
                  <span className="counter">
                    Cart valid for {minutes}:{seconds} minutes
                  </span>
                );
              }}
            />
            <HeaderButtonGroup />
          </Container>
        </Container>
      </Navbar>
    </div>
  );
}
