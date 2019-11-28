import React, { useState } from "react";
import ClientFilter from "./ClientFilter";
import TableCard from "../layout/TableCard";
import { Button, Table, Progress } from "reactstrap";
import { ReactComponent as Done } from "../../Icons/done.svg";
import { ReactComponent as Edit } from "../../Icons/edit.svg";
import { ReactComponent as Close } from "../../Icons/close.svg";

import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

// charts
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js";
function Client() {
  const [filterData, setFilterData] = useState({});
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(1);
  return (
    <div>
      {step === 1 ? (
        <ClientFilter
          setFilterData={setFilterData}
          nextStep={() => setStep(2)}
        />
      ) : (
        <div>
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
              {/* ---------------- */}
              <div className="d-flex mb-5">
                <div className="w-50">
                  <Table borderless hover className="table_card_table">
                    <thead>
                      <tr>
                        <th>Project</th>
                        <th>Task</th>
                        <th>Total Hours</th>
                      </tr>
                    </thead>

                    {!loading ? (
                      <tbody>
                        <tr>
                          <td>team id</td>
                          <td>date range</td>
                          <td>100</td>
                        </tr>
                      </tbody>
                    ) : null}
                  </Table>
                </div>
                <div className="w-50">
                  <Doughnut
                    legend={{
                      position: "bottom"
                    }}
                    data={{
                      labels: ["January", "February"],
                      datasets: [
                        {
                          label: "My First dataset",
                          backgroundColor: ["#17BBC8", "#43425D"],
                          borderWidth: 0,
                          // hoverBackgroundColor: "rgba(255,99,132,0.4)",
                          // hoverBorderColor: "rgba(255,99,132,1)",
                          data: [50, 50]
                        }
                      ]
                    }}
                    options={{
                      maintainAspectRatio: false,
                      elements: {
                        center: {
                          text: "141",
                          text2: "Hours",
                          color: "#43425D",
                          sidePadding: 15
                        }
                      }
                    }}
                    height={"300px"}
                    width="320px"
                  />
                </div>
              </div>

              {/* ---------------- */}
              <div className="d-flex mb-5">
                <div className="w-50">
                  <Table borderless hover className="table_card_table">
                    <thead>
                      <tr>
                        <th>Departement</th>
                        <th>user</th>
                        <th>Total Hours</th>
                        <th>amount due</th>
                      </tr>
                    </thead>

                    {!loading ? (
                      <tbody>
                        <tr>
                          <td>product designer</td>
                          <td>user</td>
                          <td>50</td>
                          <td>200 USD</td>
                        </tr>
                      </tbody>
                    ) : null}
                  </Table>
                </div>
                <div className="w-50">
                  <Doughnut
                    legend={{
                      position: "bottom"
                    }}
                    data={{
                      labels: ["January", "February", "January", "February"],
                      datasets: [
                        {
                          label: "My First dataset",
                          backgroundColor: [
                            "#17BBC8",
                            "#43425D",
                            "#EFDC2D",
                            "#FF6565"
                          ],
                          borderWidth: 0,
                          // hoverBackgroundColor: "rgba(255,99,132,0.4)",
                          // hoverBorderColor: "rgba(255,99,132,1)",
                          data: [30, 40, 15, 15]
                        }
                      ]
                    }}
                    options={{
                      maintainAspectRatio: false,
                      elements: {
                        center: {
                          text: "141",
                          text2: "USD",
                          color: "#43425D",
                          sidePadding: 15
                        }
                      }
                    }}
                    height={"300px"}
                    width="320px"
                  />
                </div>
              </div>
              {/* ---------------- */}
              <div className="d-flex mb-5">
                <div className="w-50">
                  <Table borderless hover className="table_card_table">
                    <thead>
                      <tr>
                        <th>Expenses /Detailed Expenses</th>
                        <th>type</th>
                        <th>amount due</th>
                      </tr>
                    </thead>

                    {!loading ? (
                      <tbody>
                        <tr>
                          <td>product designer</td>
                          <td>user</td>
                          <td>50</td>
                        </tr>
                        <tr className="border-top">
                          <td colSpan="2">total</td>
                          <td>200 USD</td>
                        </tr>
                      </tbody>
                    ) : null}
                  </Table>
                </div>
              </div>
              {/* ---------------- */}
              <div className="d-flex mb-5">
                <div className="w-50">
                  <Table borderless hover className="table_card_table">
                    <thead>
                      <tr>
                        <th>cost</th>
                        <th>amount due</th>
                      </tr>
                    </thead>

                    {!loading ? (
                      <tbody>
                        <tr>
                          <td>50</td>
                          <td>200 USD</td>
                        </tr>
                      </tbody>
                    ) : null}
                  </Table>
                </div>
                <div className="w-50">
                  <Doughnut
                    legend={{
                      position: "bottom"
                    }}
                    data={{
                      labels: ["January", "February", "January"],
                      datasets: [
                        {
                          label: "My First dataset",
                          backgroundColor: ["#17BBC8", "#43425D", "#FF6565"],
                          borderWidth: 0,
                          // hoverBackgroundColor: "rgba(255,99,132,0.4)",
                          // hoverBorderColor: "rgba(255,99,132,1)",
                          data: [50, 25, 25]
                        }
                      ]
                    }}
                    options={{
                      maintainAspectRatio: false,
                      elements: {
                        center: {
                          text: "141",
                          text2: "USD",
                          color: "#43425D",
                          sidePadding: 15
                        }
                      }
                    }}
                    height={"300px"}
                    width="320px"
                  />
                </div>
              </div>
              {loading ? <Spinner /> : null}
            </TableCard>
          </div>
        </div>
      )}
    </div>
  );
}

export default Client;

Chart.pluginService.register({
  beforeDraw: function(chart) {
    if (chart.config.options.elements.center) {
      //Get ctx from string
      var ctx = chart.chart.ctx;

      //Get options from the center object in options
      var centerConfig = chart.config.options.elements.center;
      var fontStyle = centerConfig.fontStyle || "Arial";
      var txt = centerConfig.text;
      var txt2 = centerConfig.text2;
      var color = centerConfig.color || "#000";
      var sidePadding = centerConfig.sidePadding || 20;
      var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
      //Start with a base font of 30px
      ctx.font = "15px " + fontStyle;

      //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = chart.innerRadius * 2;

      // Pick a new font size so it will not be larger than the height of label.
      var fontSizeToUse = "20";

      //Set font settings to draw it correctly.
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2 - 10;
      ctx.font = fontSizeToUse + "px " + fontStyle;
      ctx.fillStyle = color;

      //Draw text in center
      ctx.fillText(txt, centerX, centerY);
      ctx.fillText(txt2, centerX, centerY + 30);
    }
  }
});
