import React, { useState } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addSupplier } from "../../actions/suppliersActions";

import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";

// reactstrap
import { Table, Input, CustomInput, Button } from "reactstrap";
// icons
import { ReactComponent as Done } from "../../Icons/done.svg";
import { ReactComponent as Edit } from "../../Icons/edit.svg";
import { ReactComponent as Close } from "../../Icons/close.svg";

import TableCard from "../layout/TableCard";

function NewSupplier({ handleChange, values, isSubmitting, addSupplier }) {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h3>New Supplier</h3>
      <Form>
        <TableCard>
          <div className="d-flex justify-content-between table_card_header">
            <div className="d-flex">
              <Button
                tag={Link}
                to={`/Suppliers/:id/edit`}
                size="lg"
                className="btn-circle table-card-button mr-2"
                disabled
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
              <Link to="/Suppliers">
                <Close />
              </Link>
            </div>
          </div>
          <fieldset disabled={loading || isSubmitting}>
            <Table borderless className="table_card_table">
              <thead>
                <tr>
                  <th width="13%">official name</th>
                  <th width="10%">number</th>
                  <th width="15%">contact person</th>
                  <th width="14%">phone number</th>
                  <th width="13%">email</th>
                  <th width="26%">address</th>
                  <th width="8%">country</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="13%">
                    <Input tag={Field} name="official_name" />
                  </td>
                  <td width="10%">
                    <Input tag={Field} name="number" />
                  </td>
                  <td width="15%">
                    <Input tag={Field} name="contact_person" />
                  </td>
                  <td width="14%">
                    <Input tag={Field} name="phone_number" />
                  </td>
                  <td width="13%">
                    <Input tag={Field} name="email" type="email" />
                  </td>
                  <td width="26%">
                    <Input tag={Field} name="address" />
                  </td>
                  <td width="8%">
                    <Input tag={Field} name="country" />
                  </td>
                </tr>
              </tbody>
            </Table>

            <Table borderless className="table_card_table">
              <thead>
                <tr>
                  <th width="15%">finance contact</th>
                  <th colSpan="2">finance E-mail</th>
                  <th width="15%">currency</th>
                  <th width="13%">payment terms</th>

                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="13%">
                    <Input tag={Field} name="finance_contact" />
                  </td>
                  <td colSpan="2">
                    <Input
                      tag={Field}
                      name="finance_email"
                      type="email"
                      className="w-75"
                    />
                  </td>
                  <td width="15%">
                    <Input
                      tag={Field}
                      component="select"
                      type="select"
                      name="currnecy"
                      onChange={handleChange}
                    >
                      <option value="ILS">ILS</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="RMB">RMB</option>
                    </Input>
                  </td>
                  <td width="13%">
                    <Input
                      tag={Field}
                      component="select"
                      type="select"
                      name="payment_terms"
                      onChange={handleChange}
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
                  <td />
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
  mapPropsToValues: () => ({
    official_name: "",
    number: "",
    contact_person: "",
    phone_number: "",
    email: "",
    address: "",
    country: "",
    finance_contact: "",
    finance_email: "",
    currency: "",
    payment_terms: ""
  }),
  handleSubmit: (values, { props: { addSupplier }, setSubmitting }) => {
    setSubmitting(true);
    // console.log(values);
    addSupplier(values);
  },
  validationSchema: Yup.object().shape({})
})(NewSupplier);
const mapStateToProps = state => ({});
export default connect(
  mapStateToProps,
  { addSupplier }
)(CompWithFormik);
