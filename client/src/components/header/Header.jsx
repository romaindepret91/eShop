import HeaderMenu from "./HeaderMenu";
import HeaderTop from "./HeaderTop";
import HeaderCarousel from "./HeaderCarousel";

export default function Header({ setOpenSidePanel, openSidePanel }) {
  return (
    <div className="Header">
      <HeaderTop />
      <HeaderMenu
        setOpenSidePanel={setOpenSidePanel}
        openSidePanel={openSidePanel}
      />
      <HeaderCarousel />
    </div>
  );
}
