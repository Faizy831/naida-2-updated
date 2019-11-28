import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getClients } from "../../actions/clientsActions";
import { getTeamMembers } from "../../actions/usersActions";
import { getProjects } from "../../actions/projectsActions";
import { getSuppliers } from "../../actions/suppliersActions";
import { getExpense, editExpense } from "../../actions/expensesActions";

import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";

import TableCard from "../layout/TableCard";
// reactstrap
import { Table, Input, CustomInput, Button } from "reactstrap";
// icons
import { ReactComponent as Done } from "../../Icons/done.svg";
import { ReactComponent as Edit } from "../../Icons/edit.svg";
import { ReactComponent as Close } from "../../Icons/close.svg";

function ExpensesDetails({
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
  suppliers,
  getExpense,
  match
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await Promise.all([
        getExpense(match.params.id),
        getClients(),
        getTeamMembers(),
        getProjects(),
        getSuppliers()
      ]);
      setLoading(false);
    };
    getData();
  }, [
    getClients,
    getTeamMembers,
    getProjects,
    getSuppliers,
    getExpense,
    match.params.id
  ]);

  const [fileName, setFileName] = useState(null);

  const handleFileChange = e => {
    values.newAttachment = e.target.files[0];
    if (e.target.files[0]) setFileName(e.target.files[0].name);
  };
  
  const [editable, setEditable] = useState(true);

  return (
    <div>
      <h3>{ suppliers[0] && suppliers[0].official_name }</h3>
      <Form >
        <TableCard>
          <div className="d-flex justify-content-between table_card_header">
            <div className="d-flex">
              <Button
                tag={Link}
                onClick={ () => setEditable( !editable ) }
                size="lg"
                className="btn-circle table-card-button mr-2"
              >
                <Edit />
              </Button>
              <Button
                size="lg"
                className="btn-circle table-card-button "
                type="submit"
              >
                <Done />
              </Button>
            </div>
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
                    <Input 
                      type="date" 
                      tag={Field} 
                      name="handling_date" 
                      disabled = { editable ? true : false }
                      onKeyPress={(e)=>{ e.charCode === 13 && e.preventDefault() }} />
                  </td>
                  <td width="10%">
                    <Input
                      tag={Field}
                      component="select"
                      type="select"
                      name="supplier_id"
                      onChange={handleChange}
                      defaultValue={suppliers[0] && suppliers[0].id}
                      disabled = { editable ? true : false }
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
                      disabled = { editable ? true : false }
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
                      disabled = { editable ? true : false }
                    >
                      {projects.map(project => (
                        <option value={project.id}>
                          {project.asanaData.name}
                        </option>
                      ))}
                    </Input>
                  </td>
                  <td width="14%">
                    <Input tag={Field} name="details" 
                    disabled = { editable ? true : false }
                    onKeyPress={(e)=>{ e.charCode === 13 && e.preventDefault() }} /> 
                  </td>
                  <td width="13%">
                    <Input
                      tag={Field}
                      component="select"
                      type="select"
                      name="owner_id"
                      onChange={handleChange}
                      defaultValue={users[0] && users[0].id}
                      disabled = { editable ? true : false }
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
                      disabled = { editable ? true : false }
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
                      disabled = { editable ? true : false }
                      onKeyPress={(e)=>{ e.charCode === 13 && e.preventDefault() }}
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
                    <Input tag={Field} name="invoice_date" type="date" disabled = { editable ? true : false }
                    onKeyPress={(e)=>{ e.charCode === 13 && e.preventDefault() }} />
                  </td>
                  <td width="10%">
                    <Input tag={Field} name="cost" disabled = { editable ? true : false }
                    onKeyPress={(e)=>{ e.charCode === 13 && e.preventDefault() }} />
                  </td>

                  <td width="15%">
                    <Input tag={Field} name="cost_client" disabled = { editable ? true : false }
                    onKeyPress={(e)=>{ e.charCode === 13 && e.preventDefault() }} />
                  </td>
                  <td width="14%">
                    <Input
                      tag={Field}
                      component="select"
                      type="select"
                      name="type"
                      onChange={handleChange}
                      disabled = { editable ? true : false }
                    >
                      <option value="20">חשבון / אישור תשלום</option>
                      <option value="305">חשבונית מס</option>
                      <option value="330">חשבונית מס / קבלה</option>
                      <option value="400">קבלה</option>
                      <option value="405">קבלה על תרומה</option>
                    </Input>
                  </td>
                  <td width="13%">
                    <Input tag={Field} name="performa_invoice" disabled = { editable ? true : false }
                    onKeyPress={(e)=>{ e.charCode === 13 && e.preventDefault() }} />
                  </td>
                  <td width="20%">
                    <Input tag={Field} name="tax_invoice" disabled = { editable ? true : false }
                    onKeyPress={(e)=>{ e.charCode === 13 && e.preventDefault() }} />
                  </td>
                  <td width="15%">
                    <Input tag={Field} name="internal_po" disabled = { editable ? true : false }
                    onKeyPress={(e)=>{ e.charCode === 13 && e.preventDefault() }} />
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
                        disabled = { editable ? true : false }
                        onKeyPress={(e)=>{ e.charCode === 13 && e.preventDefault() }}
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
                      disabled = { editable ? true : false }
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
                      disabled = { editable ? true : false }
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
                      disabled = { editable ? true : false }
                      onKeyPress={(e)=>{ e.charCode === 13 && e.preventDefault() }}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </fieldset>
        </TableCard>
      </Form>
    </div>
  );
}

const CompWithFormik = withFormik({
  mapPropsToValues: ({
    expense: {
      handling_date,
      supplier_id,
      client_id,
      project_id,
      owner_id,
      status,
      charge_client,
      invoice_date,
      cost,
      cost_client,
      performa_invoice,
      tax_invoice,
      internal_po,
      currency,
      payment_terms,
      details
    }
  }) => ({
    handling_date,
    supplier_id,
    client_id,
    project_id,
    owner_id,
    status,
    charge_client,
    invoice_date,
    cost,
    cost_client,
    performa_invoice,
    tax_invoice,
    internal_po,
    currency,
    payment_terms,
    details
  }),
  enableReinitialize: true,

  handleSubmit: (values, { props: { editExpense, match }, setSubmitting }) => {
    setSubmitting(true);
    editExpense(match.params.id, values);
  },
  validationSchema: Yup.object().shape({})
})(ExpensesDetails);
const mapStateToProps = state => ({
  clients: state.clients.clients,
  users: state.users.team,
  projects: state.projects.projects,
  suppliers: state.suppliers.suppliers,
  expense: state.expenses.currentExpense
});
export default connect(
  mapStateToProps,
  {
    getClients,
    getTeamMembers,
    getProjects,
    getSuppliers,
    getExpense,
    editExpense
  }
)(CompWithFormik);
