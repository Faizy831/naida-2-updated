import React, { useState } from "react";
import UtilizationFilter from "./UtilizationFilter";
import TableCard from "../layout/TableCard";
import { Button, Table, Progress } from "reactstrap";
import { ReactComponent as Done } from "../../Icons/done.svg";
import { ReactComponent as Edit } from "../../Icons/edit.svg";
import { ReactComponent as Close } from "../../Icons/close.svg";

import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

function Utilization({ project = {} }) {
  const [filterData, setFilterData] = useState({});
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(1);
  return (
    <div>
      {step === 1 ? (
        <UtilizationFilter
          setFilterData={setFilterData}
          nextStep={() => setStep(2)}
        />
      ) : (
        <div>
          <h3>Utilization</h3>

          <TableCard>
            <div className="d-flex justify-content-between table_card_header">
              <div className="d-flex">
                <Button
                  size="lg"
                  className={`btn-circle table-card-button mr-2 `}
                >
                  <Edit />
                </Button>
                <Button
                  size="lg"
                  className={`btn-circle table-card-button mr-2 `}
                >
                  <Done />
                </Button>
              </div>
              <div>
                <Link to="/reports">
                  <Close />
                </Link>
              </div>
            </div>

            <Table borderless hover className="table_card_table">
              <thead>
                <tr>
                  <th>team</th>
                  <th>date Range</th>
                  <th>billable hours</th>
                  <th>total hours</th>
                  <th>utilization</th>
                </tr>
              </thead>

              {!loading ? (
                <tbody>
                  <tr>
                    <td>team id</td>
                    <td>date range</td>
                    <td>100</td>
                    <td>120</td>
                    <td>75%</td>
                  </tr>
                </tbody>
              ) : null}
            </Table>

            <Table borderless className="table_card_table">
              <thead>
                <tr>
                  <th>name</th>
                  <th>Date range</th>
                  <th>billable hours</th>
                  <th>total hours</th>
                  <th>utilization</th>
                </tr>
              </thead>

              {!loading ? (
                <tbody>
                  <tr>
                    <td>name</td>
                    <td>range</td>
                    <td>100</td>
                    <td>120</td>
                    <td>75%</td>
                  </tr>
                </tbody>
              ) : null}
            </Table>

            {loading ? <Spinner /> : null}
          </TableCard>
        </div>
      )}
    </div>
  );
}

export default Utilization;
