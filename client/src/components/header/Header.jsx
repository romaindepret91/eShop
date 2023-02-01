import HeaderMenu from "./HeaderMenu";
import HeaderTop from "./HeaderTop";
import SidePanel from "../sidePanel/SidePanel";
import { useState, useContext, memo } from "react";
import { SizingGroupContext } from "../../context/SizingGroupContext";

export const Header = memo(() => {
  const [openSidePanel, setOpenSidePanel] = useState(false);
  const { sizingGroup, setSizingGroup } = useContext(SizingGroupContext);
  return (
    <header className="Header">
      <HeaderTop />
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
    </header>
  );
});
