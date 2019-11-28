import React from "react";
import TableCard from "../layout/TableCard";
import history from "../../history";
function Reports() {
  return (
    <div>
      <h3>Reports</h3>
      <TableCard>
        <div className="d-flex justify-content-around">
          <ReportsCrad
            text="Project P&L"
            link="/reports/projects"
            color="#A3A0FB"
          />
          <ReportsCrad
            text="Utilization"
            link="/reports/utilization"
            color="#EFDC2D"
          />
          <ReportsCrad text="TBD" link="/reports/" color="#FF6565" />
          <ReportsCrad
            text="Client T&M"
            link="/reports/clients"
            color="#17BBC8"
          />
          <ReportsCrad
            text="Expenses"
            link="/reports/expenses"
            color="#4AD991"
          />
        </div>
      </TableCard>
    </div>
  );
}

export default Reports;

const ReportsCrad = ({ color = "red", link = "/reports", text }) => {
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
