import React from "react";
import TableCard from "../layout/TableCard";
import history from "../../history";

function Settings() {
  return (
    <div>
      <h3>Settings</h3>
      <TableCard>
        <div className="d-flex justify-content-around">
          <SettingsCrad text="Team" link="/settings/team" color="#A3A0FB" />
          <SettingsCrad
            text="Presets"
            link="/settings/presets"
            color="#EFDC2D"
          />
          <SettingsCrad text="Alerts" link="/settings/alerts" color="#FF6565" />
        </div>
      </TableCard>
    </div>
  );
}

const SettingsCrad = ({ color = "red", link = "/settings", text }) => {
  return (
    <div
      className="settigns_card shadow-sm"
      style={{ backgroundColor: color }}
      onClick={() => history.push(link)}
    >
      <h4>{text}</h4>
    </div>
  );
};

export default Settings;
