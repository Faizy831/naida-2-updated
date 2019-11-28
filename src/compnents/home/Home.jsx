import React,{useState} from "react";
import TableCard from "../layout/TableCard";
import { Table, Badge, Input } from "reactstrap";
import CardPagination from "../layout/CardPagination";
// import { ReactComponent as Chart } from "../../Icons/chart.svg";
import DonutChart from './DoughnutChart/DonutChart';
import PaginationRe from '../pagination/Pag'


function Home() {
 
  const numbertest=[1,2,3,4,5]
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 2;
  const pagesCount = Math.ceil(numbertest.length / pageSize);
  const currentPosts= numbertest.slice(currentPage * pageSize,(currentPage + 1) * pageSize);
  const handleClick=(e, index) =>{
    
    e.preventDefault();

    setCurrentPage(index);
    
  }
  return (
    <div>
      <h3>Home</h3>
      <TableCard>
        <h5>Alerts</h5>
        <Table borderless hover className="table_card_table">
          <thead>
            <tr>
              <th>client</th>
              <th>project</th>
              <th colSpan="2">phase</th>
              <th>date</th>
              <th className="text-center">type</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map(_ => (
              <tr
                key={_}
                style={{
                  cursor: "pointer"
                }}
              >
                <td>Google</td>
                <td>Google home mini</td>
                <td colSpan="2">Farming</td>
                <td>DD/MM/YYYY</td>
                <td className="text-center">
                  <Badge
                    color="warning"
                    pill
                    className="table-card-badge w-75 text-left"
                  >
                    Hour overdue
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-end">
        <PaginationRe
                  pagesCount={pagesCount}
                  currentPage={currentPage}
                  handleClick={handleClick}
              
                  />
        </div>
      </TableCard>
      <div className="d-flex justify-content-between">
        <div className="home_card home_card_caseFlow">
          <h5 className="Cash_Heading">Cash Flow</h5>
          <div className="d-flex justify-content-around">
            <div className="d-flex flex-column p-3 align-items-center">
              <h5 className="home_card_up">
                <div>Billed</div> <div>500,00 NIS</div>
              </h5>
               <h5 className="home_card_center">
                <div>To be Paid</div> <div>500,00 NIS</div>
              </h5>
              <h5 className="home_card_down cash_flow_down1">
                <div>Paid</div> <div>500,00 NIS</div>
              </h5>
              <h6>This Month</h6>
            </div>
            <div className="d-flex flex-column p-3 align-items-center">
              <h5 className="home_card_up Cash_flow_up1">
                <div>Billed</div> <div>500,00 NIS</div>
              </h5>
               <h5 className="home_card_center">
                <div>To be Paid</div> <div>500,00 NIS</div>
              </h5>
              <h5 className="home_card_down Cash_flow_down2">
                <div>Paid</div> <div>500,00 NIS</div>
              </h5>
              <h6>Last Month</h6>
            </div>
            <div className="d-flex flex-column p-3 align-items-center">
              <h5 className="home_card_up">
                <div>Billed</div> <div>500,00 NIS</div>
              </h5>
               <h5 className="home_card_center Cash_flow_center1">
                <div>To be Paid</div> <div>500,00 NIS</div>
              </h5>
              <h5 className="home_card_down">
                <div>Paid</div> <div>500,00 NIS</div>
              </h5>
              <h6>Next Month</h6>
            </div>
          </div>
        </div>
        <div className="home_card home_card_chartpie">
          <div className="d-flex justify-content-between">
            <h5 className="chart_pie_heading">Utilization</h5>{" "}
            <Input
              type="select"
              style={{
                width: "50%"
              }}
            >
              <option value="">Last Week</option>
              <option value="">Last Month</option>
              <option value="">Last 6 Months</option>
            </Input>
          </div>
          <div
            style={{
              fontSize: "10rem",
              textAlign: "center"
            }}
          >
        <DonutChart   
         value='45'
         valuelabel='Completed'
         size='160'
         strokewidth='23' 
         />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
