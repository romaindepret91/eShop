import { useState } from "react";
import Header from "./components/header/Header";
import SidePanel from "./components/sidePanel/SidePanel";

export default function App() {
  const [openSidePanel, setOpenSidePanel] = useState(false);
  return (
    <div className="App">
      <Header
        setOpenSidePanel={setOpenSidePanel}
        openSidePanel={openSidePanel}
      />
      <SidePanel
        openSidePanel={openSidePanel}
        setOpenSidePanel={setOpenSidePanel}
      />
    </div>
  );
}
