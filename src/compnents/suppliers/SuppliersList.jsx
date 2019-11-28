import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import history from "../../history";
import { connect } from "react-redux";
import { getSuppliers } from "../../actions/suppliersActions";
import { Table, Button, Badge } from "reactstrap";

import TableCard from "../layout/TableCard";
import CardSearch from "../layout/CardSearch";

import Spinner from "../layout/Spinner";
import PaginationRe from '../pagination/Pag'

function SuppliersList({ getSuppliers, suppliers }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getSuppliers();
      setLoading(false);
    };
    getData();
  }, [getSuppliers]);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const pagesCount = Math.ceil(suppliers.length / pageSize);
  const currentPosts= suppliers.slice(currentPage * pageSize,(currentPage + 1) * pageSize);
  const handleClick=(e, index) =>{
    
    e.preventDefault();

    setCurrentPage(index);
    
  }
  return (
    <div>
      <h3>Suppliers</h3>
      <TableCard>
        <div className="d-flex">
          <CardSearch title="suppliers" />
          <Button tag={Link} to="/suppliers/new" className="table-card-button">
            New Supplier
          </Button>
        </div>

        <Table borderless hover className="table_card_table">
          <thead>
            <tr>
              <th>name</th>
              <th>number</th>
              <th>contact name</th>
              <th>contact E-mail</th>
              <th>overdue payments</th>
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
                  email,
                  projects
                }) => (
                  <tr
                    style={{
                      cursor: "pointer"
                    }}
                    key={id}
                    onClick={() => history.push(`/suppliers/${id}`)}
                  >
                    <td>{official_name}</td>
                    <td>{number}</td>
                    <td>{contact_person}</td>
                    <td>{email}</td>
                    <td className="">
                      {["payment 1", "payment 1", "payment 1"].map(a => (
                        <Badge
                          color="warning"
                          pill
                          className="table-card-badge"
                        >
                          {a}
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
        <div className="d-flex justify-content-end">
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
  suppliers: state.suppliers.suppliers
});
export default connect(
  mapStateToProps,
  { getSuppliers }
)(SuppliersList);
