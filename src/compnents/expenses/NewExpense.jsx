import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getClients } from "../../actions/clientsActions";
import { getTeamMembers } from "../../actions/usersActions";
import { getProjects } from "../../actions/projectsActions";
import { getSuppliers } from "../../actions/suppliersActions";
import { addExpense } from "../../actions/expensesActions";

import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";

import TableCard from "../layout/TableCard";
// reactstrap
import { Table, Input, CustomInput, Button } from "reactstrap";
// icons
import { ReactComponent as Done } from "../../Icons/done.svg";
import { ReactComponent as Edit } from "../../Icons/edit.svg";
import { ReactComponent as Close } from "../../Icons/close.svg";

function NewExpense({
  handleChange,
  values,
  getClients,
  getTeamMembers,
  users,
  clients,
  projects,
  getProjects,
  isSubmitting,
  getSuppliers,
  suppliers
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await Promise.all([
        getClients(),
        getTeamMembers(),
        getProjects(),
        getSuppliers()
      ]);
      setLoading(false);
    };
    getData();
  }, [getClients, getTeamMembers, getProjects, getSuppliers]);

  const [fileName, setFileName] = useState(null);
  const handleFileChange = e => {
    values.attachment = e.target.files[0];
    if (e.target.files[0]) setFileName(e.target.files[0].name);
  };
  return (
    <div>
      <h3>New expense</h3>
      <Form>
        <TableCard>
          <div className="d-flex justify-content-end table_card_header">
            <div>
              <Link to="/expenses">
                <Close />
              </Link>
            </div>
          </div>
          <fieldset disabled={loading || isSubmitting}>
            <Table borderless className="table_card_table">
              <thead>
                <tr>
                  <th width="13%">handling date</th>
                  <th width="10%">supplier</th>
                  <th width="10%">client</th>
                  <th width="15%">project</th>
                  <th width="14%">expense details</th>
                  <th width="13%">owner</th>
                  <th width="15%">payment status</th>
                  <th width="10%">charge client</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="13%">
                    <Input type="date" tag={Field} name="handling_date" />
                  </td>
                  <td width="10%">
                    <Input
                      tag={Field}
                      component="select"
                      type="select"
                      name="supplier_id"
                      onChange={handleChange}
                      defaultValue={suppliers[0] && suppliers[0].id}
                    >
                      {suppliers.map(supplier => (
                        <option value={supplier.id}>
                          {supplier.official_name}
                        </option>
                      ))}
                    </Input>
                  </td>
                  <td width="10%">
                    <Input
                      tag={Field}
                      component="select"
                      type="select"
                      name="client_id"
                      onChange={handleChange}
                      defaultValue={clients[0] && clients[0].id}
                    >
                      {clients.map(client => (
                        <option value={client.id}>
                          {client.official_name}
                        </option>
                      ))}
                    </Input>
                  </td>
                  <td width="15%">
                    <Input
                      tag={Field}
                      component="select"
                      type="select"
                      name="project_id"
                      onChange={handleChange}
                      defaultValue={projects[0] && projects[0].id}
                    >
                      {projects.map(project => (
                        <option value={project.id}>
                          {project.asanaData.name}
                        </option>
                      ))}
                    </Input>
                  </td>
                  <td width="14%">
                    <Input tag={Field} name="details" />
                  </td>
                  <td width="13%">
                    <Input
                      tag={Field}
                      component="select"
                      type="select"
                      name="owner_id"
                      onChange={handleChange}
                      defaultValue={users[0] && users[0].id}
                    >
                      {users.map(user => (
                        <option value={user.id}>{user.name}</option>
                      ))}
                    </Input>
                  </td>
                  <td width="15%">
                    <Input
                      tag={Field}
                      component="select"
                      type="select"
                      name="status"
                      onChange={handleChange}
                      clasName="text-capitalize"
                    >
                      <option value="issued">issued</option>
                      <option value="accepted">accepted</option>
                      <option value="delayed">delayed</option>
                      <option value="declined">declined</option>
                      <option value="Cancelled">Cancelled</option>
                    </Input>
                  </td>
                  <td
                    width="10%"
                    className="d-flex align-items-center justify-content-between"
                  >
                    <div className="mr-2">No</div>
                    <CustomInput
                      type="switch"
                      tag={Field}
                      id="charge_client"
                      name="charge_client"
                      onChange={handleChange}
                    />
                    <div>Yes</div>
                  </td>
                </tr>
              </tbody>
            </Table>
            <Table borderless className="table_card_table">
              <thead>
                <tr>
                  <th width="13%">invoice date</th>
                  <th width="10%">cost</th>
                  <th width="15%">cost for client</th>
                  <th width="14%">type</th>
                  <th width="13%">performa invoice #</th>
                  <th width="20%">tax invoice</th>
                  <th width="15%">internal PO #</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="13%">
                    <Input tag={Field} name="invoice_date" type="date" />
                  </td>
                  <td width="10%">
                    <Input tag={Field} name="cost" />
                  </td>

                  <td width="15%">
                    <Input tag={Field} name="cost_client" />
                  </td>
                  <td width="14%">
                    <Input
                      tag={Field}
                      component="select"
                      type="select"
                      name="type"
                      onChange={handleChange}
                    >
                      <option value="20">חשבון / אישור תשלום</option>
                      <option value="305">חשבונית מס</option>
                      <option value="330">חשבונית מס / קבלה</option>
                      <option value="400">קבלה</option>
                      <option value="405">קבלה על תרומה</option>
                    </Input>
                  </td>
                  <td width="13%">
                    <Input tag={Field} name="performa_invoice" />
                  </td>
                  <td width="20%">
                    <Input tag={Field} name="tax_invoice" />
                  </td>
                  <td width="15%">
                    <Input tag={Field} name="internal_po" />
                  </td>
                </tr>
              </tbody>
            </Table>
            <Table borderless className="table_card_table">
              <thead>
                <tr>
                  <th width="15%">currency</th>
                  <th colSpan="2">payment terms</th>
                  <th width="15%">invoice image</th>

                  <th colSpan="3">
                    <div className="d-flex align-items-center">
                      <div className="mr-4">Client charged for hours</div>
                      <CustomInput
                        onChange={handleChange}
                        label
                        tag={Field}
                        size="lg"
                        type="checkbox"
                        id="client_charged_for_hours"
                        name="client_charged_for_hours"
                        checked={values.client_charged_for_hours}
                      />
                    </div>
                  </th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="13%">
                    <Input
                      tag={Field}
                      component="select"
                      type="select"
                      name="currency"
                      onChange={handleChange}
                    >
                      <option value="USD">USD</option>
                      <option value="NIS">NIS</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="RMB">RMB</option>
                    </Input>
                  </td>
                  <td colSpan="2">
                    <Input
                      tag={Field}
                      component="select"
                      type="select"
                      name="payment_terms"
                      onChange={handleChange}
                      defaultValue="CASH"
                    >
                      <option value="CASH">CASH</option>
                      <option value="EOM + 30">EOM + 30</option>
                      <option value="EOM + 60">EOM + 60</option>
                      <option value="EOM + 90">EOM + 90</option>
                      <option value="NET + 30">NET + 30</option>
                      <option value="NET + 60">NET + 60</option>
                      <option value="NET + 90">NET + 90</option>
                    </Input>
                  </td>

                  <td width="15%">
                    <CustomInput
                      type="file"
                      name="attachment"
                      label={fileName || "choose file"}
                      id="attachmentInput"
                      onChange={handleFileChange}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </fieldset>
          <div className="d-flex justify-content-end table_card_header">
            <div className="d-flex">
              <Button size="lg" className="table-card-button " type="submit">
                Save
              </Button>
            </div>
          </div>
        </TableCard>
      </Form>
    </div>
  );
}

const CompWithFormik = withFormik({
  mapPropsToValues: ({ users, clients, projects, suppliers }) => ({
    handling_date: "",
    supplier_id: suppliers[0] ? suppliers[0].id : "",
    client_id: clients[0] ? clients[0].id : "",
    project_id: projects[0] ? projects[0].id : "",
    owner_id: users[0] ? users[0].id : "",
    status: "",
    charge_client: "",
    invoice_date: "",
    cost: "",
    cost_client: "",
    performa_invoice: "",
    tax_invoice: "",
    internal_po: "",
    currency: "NIS",
    payment_terms: "",
    details: ""
  }),
  enableReinitialize: true,

  handleSubmit: (values, { props: { addExpense }, setSubmitting }) => {
    setSubmitting(true);
    console.log(values);
    addExpense(values);
  },
  validationSchema: Yup.object().shape({})
})(NewExpense);
const mapStateToProps = state => ({
  clients: state.clients.clients,
  users: state.users.team,
  projects: state.projects.projects,
  suppliers: state.suppliers.suppliers
});
export default connect(
  mapStateToProps,
  { getClients, getTeamMembers, getProjects, getSuppliers, addExpense }
)(CompWithFormik);
