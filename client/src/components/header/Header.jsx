import HeaderMenu from "./HeaderMenu";
import HeaderTop from "./HeaderTop";
import SidePanel from "../sidePanel/SidePanel";
import CartSidePanel from "../cart/CartSidePanel";
import { useState, useContext, memo } from "react";
import { SizingGroupContext } from "../../context/SizingGroupContext";
import "./Header.scss";

export const Header = memo(
  ({ openCartSidePanel, setOpenCartSidePanel, startCounter, counterData }) => {
    const [openSidePanel, setOpenSidePanel] = useState(false);
    const { sizingGroup, setSizingGroup } = useContext(SizingGroupContext);
    return (
      <header className="Header bg-light">
        <HeaderTop startCounter={startCounter} counterData={counterData} />
        <HeaderMenu
          setOpenSidePanel={setOpenSidePanel}
          openSidePanel={openSidePanel}
          setSizingGroup={setSizingGroup}
        />
        <SidePanel
          openSidePanel={openSidePanel}
          setOpenSidePanel={setOpenSidePanel}
          sizingGroup={sizingGroup}
        />
        <CartSidePanel
          openCartSidePanel={openCartSidePanel}
          setOpenCartSidePanel={setOpenCartSidePanel}
        />
      </header>
    );
  }
);
