import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSupplier, editSupplier } from "../../actions/suppliersActions";

import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";

// reactstrap
import { Table, Input, Button } from "reactstrap";
// icons
import { ReactComponent as Done } from "../../Icons/done.svg";
import { ReactComponent as Edit } from "../../Icons/edit.svg";
import { ReactComponent as Close } from "../../Icons/close.svg";

import TableCard from "../layout/TableCard";
import Spinner from "../layout/Spinner";

function SupplierDetails({
  handleChange,
  isSubmitting,
  getSupplier,
  match,
  supplier
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getSupplier(match.params.id);
      setLoading(false);
    };
    getData();
  }, [getSupplier, match.params.id]);

  return (
    <div>
      <h3>New client</h3>
      <Form>
        <TableCard>
          <div className="d-flex justify-content-between table_card_header">
            <div className="d-flex">
              <Button
                tag={Link}
                to={`/clients/:id/edit`}
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
              <Link to="/clients">
                <Close />
              </Link>
            </div>
          </div>
          {!loading ? (
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
                      <Input
                        tag={Field}
                        name="official_name"
                        defaultValue={supplier.official_name}
                      />
                    </td>
                    <td width="10%">
                      <Input
                        tag={Field}
                        name="number"
                        defaultValue={supplier.number}
                      />
                    </td>
                    <td width="15%">
                      <Input
                        tag={Field}
                        name="contact_person"
                        defaultValue={supplier.contact_person}
                      />
                    </td>
                    <td width="14%">
                      <Input
                        tag={Field}
                        name="phone_number"
                        defaultValue={supplier.phone_number}
                      />
                    </td>
                    <td width="13%">
                      <Input
                        tag={Field}
                        name="email"
                        type="email"
                        defaultValue={supplier.email}
                      />
                    </td>
                    <td width="26%">
                      <Input
                        tag={Field}
                        name="address"
                        defaultValue={supplier.address}
                      />
                    </td>
                    <td width="8%">
                      <Input
                        tag={Field}
                        name="country"
                        defaultValue={supplier.country}
                      />
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
                      <Input
                        tag={Field}
                        name="finance_contact"
                        defaultValue={supplier.finance_contact}
                      />
                    </td>
                    <td colSpan="2">
                      <Input
                        tag={Field}
                        name="finance_email"
                        type="email"
                        className="w-75"
                        defaultValue={supplier.finance_email}
                      />
                    </td>
                    <td width="15%">
                      <Input
                        tag={Field}
                        name="currency"
                        defaultValue={supplier.currency}
                      />
                    </td>
                    <td width="13%">
                      <Input
                        tag={Field}
                        component="select"
                        type="select"
                        name="payment_terms"
                        onChange={handleChange}
                        defaultValue={supplier.payment_terms}
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
          ) : (
            <Spinner />
          )}
        </TableCard>
      </Form>
    </div>
  );
}

const CompWithFormik = withFormik({
  mapPropsToValues: ({ supplier }) => {
    return {
      official_name: supplier.official_name,
      number: supplier.number,
      contact_person: supplier.contact_person,
      phone_number: supplier.phone_number,
      email: supplier.email,
      address: supplier.address,
      country: supplier.country,
      finance_contact: supplier.finance_contact,
      finance_email: supplier.finance_email,
      currency: supplier.currency,
      payment_terms: supplier.payment_terms
    };
  },
  enableReinitialize: true,
  handleSubmit: (values, { props: { editSupplier, match }, setSubmitting }) => {
    setSubmitting(true);
    console.log(values);
    editSupplier(match.params.id, values);
  },
  validationSchema: Yup.object().shape({})
})(SupplierDetails);
const mapStateToProps = state => ({
  supplier: state.suppliers.currentSupplier
});
export default connect(
  mapStateToProps,
  { getSupplier, editSupplier }
)(CompWithFormik);
