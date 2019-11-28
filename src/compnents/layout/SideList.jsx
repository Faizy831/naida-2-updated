import React from "react";
import { NavLink } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
function SideList({ sectionsList }) {
  return (
    <ListGroup className="sidemenu_list">
      {sectionsList.map((section, i) => (
        <NavLink key={i} to={section.link}>
          <ListGroupItem className={`sidemenu_list_item`}>
            <section.Icon /> <div>{section.text}</div>
          </ListGroupItem>
        </NavLink>
      ))}
    </ListGroup>
  );
}

export default SideList;
