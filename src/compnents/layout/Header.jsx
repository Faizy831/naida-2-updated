import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { ReactComponent as ProfilIcon } from "../../Icons/profil.svg";
import { ReactComponent as DownIcon } from "../../Icons/down.svg";
import sectionsList from "../../sectionsList";

function Header({ logout, auth }) {
  const [newDropDown, setNewDropDown] = useState(false);
  const [profilDropDown, setProfilDropDown] = useState(false);

  return (
    <div className="header shadow-sm border-bottom ">
      <div
        className="d-flex w-100 position-absolute justify-content-end"
        style={{
          right: "1em",
          top: "1em"
        }}
      >
        <Dropdown
          isOpen={newDropDown}
          toggle={() => setNewDropDown(!newDropDown)}
        >
          <DropdownToggle className="mx-2 px-4 header_btn">New</DropdownToggle>
          <DropdownMenu className="header_new_dropdown">
            {sectionsList
              .filter(section => section.new)
              .map((section, i) => (
                <DropdownItem key={i} className="header_new_dropdown_item">
                  <Link to={section.link + "/new"}>
                    <section.Icon /> {section.text}
                  </Link>
                </DropdownItem>
              ))}
          </DropdownMenu>
        </Dropdown>
        <div className="d-flex align-items-center border-left px-3 mx-3">
          <Dropdown
            isOpen={profilDropDown}
            toggle={() => setProfilDropDown(!profilDropDown)}
          >
            <DropdownToggle tag="span" className="text-capitalize">
              {auth.displayName}
              <span
                style={{
                  color: "#A4AFB7",
                  paddingLeft: "0.2em"
                }}
              >
                <DownIcon />
              </span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={logout}>SignOut</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <h2 className="d-flex align-items-center">
          <ProfilIcon />
        </h2>
      </div>
    </div>
  );
}
const mapStateToProps = state => ({
  auth: state.firebase.auth
});
export default connect(
  mapStateToProps,
  {
    logout
  }
)(Header);
