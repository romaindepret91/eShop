import { useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faAngleUp,
  faAngleDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import SidePanelLink from "./SidePanelLink";
import "./SidePanel.scss";

export default function SidePanel({
  openSidePanel,
  setOpenSidePanel,
  sizingGroup,
}) {
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
          <h1 className="SidePanel-menu-title">
            {(
              sizingGroup.charAt(0).toUpperCase() + sizingGroup.slice(1)
            ).replace("-", " ")}
            <Button
              href={
                "/" +
                sizingGroup.split("-")[1] +
                "/" +
                sizingGroup.split("-")[0]
              }
              variant="white"
            >
              <span>See All</span>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>{" "}
          </h1>
          <div className="SidePanel-menu-item">
            <div className="SidePanel-menu-item-wrapper">
              <h2 className="SidePanel-menu-item-title">
                {" "}
                <SidePanelLink
                  sizingGroup={sizingGroup}
                  category="boxing-gloves"
                />
              </h2>
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
                <li>
                  <SidePanelLink sizingGroup={sizingGroup} category="shorts" />
                </li>
                <li>
                  <SidePanelLink sizingGroup={sizingGroup} category="tops" />
                </li>
                <li>
                  <SidePanelLink sizingGroup={sizingGroup} category="caps" />
                </li>
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
                <li>
                  <SidePanelLink
                    sizingGroup={sizingGroup}
                    category="handwraps"
                  />
                </li>
                <li>
                  <SidePanelLink
                    sizingGroup={sizingGroup}
                    category="mouthguards"
                  />
                </li>
                <li>
                  <SidePanelLink
                    sizingGroup={sizingGroup}
                    category="ankle-supports"
                  />
                </li>
                <li>
                  <SidePanelLink
                    sizingGroup={sizingGroup}
                    category="shinguards"
                  />
                </li>
                <li>
                  <SidePanelLink sizingGroup={sizingGroup} category="others" />
                </li>
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
                <li>
                  <SidePanelLink
                    sizingGroup={sizingGroup}
                    category="kick-pads"
                  />
                </li>
                <li>
                  <SidePanelLink
                    sizingGroup={sizingGroup}
                    category="focus-mitts"
                  />
                </li>
                <li>
                  <SidePanelLink
                    sizingGroup={sizingGroup}
                    category="belly-pads"
                  />
                </li>
                <li>
                  <SidePanelLink
                    sizingGroup={sizingGroup}
                    category="heavy-bags"
                  />
                </li>
                <li>
                  <SidePanelLink sizingGroup={sizingGroup} category="others" />
                </li>
              </ul>
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
}
