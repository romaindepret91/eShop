import { useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import "./SidePanel.scss";

export default function SidePanel({ openSidePanel, setOpenSidePanel }) {
  const [collapseStates, setCollapseStates] = useState({
    Apparel: false,
    Protection: false,
    Trainer: false,
  });

  const toggleCollapse = (title) => {
    setCollapseStates({
      ...collapseStates,
      [title]: !collapseStates[title],
    });
  };

  return (
    <div className={`SidePanel ${openSidePanel ? "show" : ""}`}>
      <div className="SidePanel-menu-wrapper">
        <Button onClick={() => setOpenSidePanel(false)} variant="light">
          <FontAwesomeIcon icon={faXmark} />
        </Button>{" "}
        <div className="SidePanel-menu">
          <div className="SidePanel-menu-item">
            <div className="SidePanel-menu-item-wrapper">
              <h2 className="SidePanel-menu-item-title">Boxing gloves</h2>
            </div>
          </div>
          <div className="SidePanel-menu-item">
            <div
              className="SidePanel-menu-item-wrapper"
              onClick={() => toggleCollapse("Apparel")}
            >
              <h2 className="SidePanel-menu-item-title">Apparel</h2>
              <FontAwesomeIcon
                className="SidePanel-menu-item-icon"
                icon={collapseStates.Apparel ? faAngleUp : faAngleDown}
              />
            </div>
            <Collapse in={collapseStates.Apparel}>
              <ul className="SidePanel-menu-item-list">
                <li>Shorts</li>
                <li>Tops</li>
                <li>Caps</li>
              </ul>
            </Collapse>
          </div>
          <div className="SidePanel-menu-item">
            <div
              className="SidePanel-menu-item-wrapper"
              onClick={() => toggleCollapse("Protection")}
            >
              <h2 className="SidePanel-menu-item-title">Protection gears</h2>
              <FontAwesomeIcon
                className="SidePanel-menu-item-icon"
                icon={collapseStates.Protection ? faAngleUp : faAngleDown}
              />
            </div>
            <Collapse in={collapseStates.Protection}>
              <ul className="SidePanel-menu-item-list">
                <li>Handwraps</li>
                <li>Mouthguards</li>
                <li>Ankle supports</li>
                <li>Shinguards</li>
                <li>Others</li>
              </ul>
            </Collapse>
          </div>
          <div className="SidePanel-menu-item">
            <div
              className="SidePanel-menu-item-wrapper"
              onClick={() => toggleCollapse("Trainer")}
            >
              <h2 className="SidePanel-menu-item-title">Trainer equipment</h2>
              <FontAwesomeIcon
                className="SidePanel-menu-item-icon"
                icon={collapseStates.Trainer ? faAngleUp : faAngleDown}
              />
            </div>
            <Collapse in={collapseStates.Trainer}>
              <ul className="SidePanel-menu-item-list">
                <li>Kick pads</li>
                <li>Focus mitts</li>
                <li>Belly pads</li>
                <li>Heavy bags</li>
                <li>Others</li>
              </ul>
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
}
