import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import history from "../../history";
import { connect } from "react-redux";
import { getClients } from "../../actions/clientsActions";
import { Table, Button, Badge } from "reactstrap";

import TableCard from "../layout/TableCard";
import CardSearch from "../layout/CardSearch";
import CardPagination from "../layout/CardPagination";
import Spinner from "../layout/Spinner";
import PaginationRe from '../pagination/Pag'

function ClientsList({ clients, getClients }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getClients();
      setLoading(false);
    };
    getData();
  }, [getClients]);

  const redirectToClientDetails = id => history.push(`/clients/${id}`);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const pagesCount = Math.ceil(clients.length / pageSize);
  const currentPosts= clients.slice(currentPage * pageSize,(currentPage + 1) * pageSize);
  const handleClick=(e, index) =>{
    
    e.preventDefault();

    setCurrentPage(index);
    
  }

  return (
    <div>
      <h3>Clients</h3>
      <TableCard>
        <div className="d-flex">
          <CardSearch />
          <Button tag={Link} to="/clients/new" className="table-card-button">
            New Client
          </Button>
        </div>

        <Table borderless hover className="table_card_table">
          <thead>
            <tr>
              <th>name</th>
              <th>official name</th>
              <th>number</th>
              <th>contact name</th>
              <th className="text-center">active projects</th>
            </tr>
          </thead>

          {!loading ? (
            <tbody>
              {currentPosts.map(
                ({
                  id,
                  official_name,
                  number,
                  contact_person,
                  projects,
                  name
                }) => (
                  <tr
                    key={id}
                    onClick={() => redirectToClientDetails(id)}
                    style={{
                      cursor: "pointer"
                    }}
                  >
                    <td>{name}</td>
                    <td>{official_name}</td>
                    <td>{number}</td>
                    <td>{contact_person}</td>
                    <td className="text-center">
                      {projects
                        .filter(p => !p.archived)
                        .map(p => (
                          <Badge
                            style={{
                              backgroundColor: "#4AD991"
                            }}
                            pill
                            className="table-card-badge"
                          >
                            {p.name}
                          </Badge>
                        ))}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          ) : null}
        </Table>
        {loading ? <Spinner /> : null}
        <div className="d-flex justify-content-start">
        <PaginationRe
              pagesCount={pagesCount}
              currentPage={currentPage}
              handleClick={handleClick}
          
              />
        </div>
      </TableCard>
    </div>
  );
}
const mapStateToProps = state => ({
  clients: state.clients.clients
});
export default connect(
  mapStateToProps,
  {
    getClients
  }
)(ClientsList);
