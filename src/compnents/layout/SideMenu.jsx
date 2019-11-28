import React from "react";
import SideList from "./SideList";
import sectionsList from "../../sectionsList";

function SideMenu() {
  return (
    <div className="sidemenu">
      <div className="logo">Nadia 2.0</div>
      <SideList sectionsList={sectionsList} />
    </div>
  );
}

export default SideMenu;
