import React, { useState } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { addClient } from "../../actions/clientsActions";
import TableCard from "../layout/TableCard";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
// reactstrap
import { Table, Input, CustomInput, Button, FormFeedback } from "reactstrap";
// icons
import { ReactComponent as Done } from "../../Icons/done.svg";
import { ReactComponent as Edit } from "../../Icons/edit.svg";
import { ReactComponent as Close } from "../../Icons/close.svg";

function NewClient({
  addClient,
  values,
  touched,
  errors,
  handleChange,
  isSubmitting
}) {
  const [loading, setLoading] = useState(false);

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
                      name="official_name"
                      invalid={errors.official_name && touched.official_name}
                      tag={Field}
                    />
                    <FormFeedback>{errors.official_name}</FormFeedback>
                  </td>
                  <td width="10%">
                    <Input
                      name="number"
                      invalid={errors.number && touched.number}
                      tag={Field}
                    />
                    <FormFeedback>{errors.number}</FormFeedback>
                  </td>
                  <td width="15%">
                    <Input
                      name="contact_person"
                      invalid={errors.contact_person && touched.contact_person}
                      tag={Field}
                    />
                    <FormFeedback>{errors.contact_person}</FormFeedback>
                  </td>
                  <td width="14%">
                    <Input
                      name="phone_number"
                      invalid={errors.phone_number && touched.phone_number}
                      tag={Field}
                    />
                    <FormFeedback>{errors.phone_number}</FormFeedback>
                  </td>
                  <td width="13%">
                    <Input
                      name="email"
                      invalid={errors.email && touched.email}
                      tag={Field}
                      type="email"
                    />
                    <FormFeedback>{errors.email}</FormFeedback>
                  </td>
                  <td width="26%">
                    <Input
                      name="address"
                      invalid={errors.address && touched.address}
                      tag={Field}
                    />
                    <FormFeedback>{errors.address}</FormFeedback>
                  </td>
                  <td width="8%">
                    <Input
                      name="country"
                      invalid={errors.country && touched.country}
                      tag={Field}
                    />
                    <FormFeedback>{errors.country}</FormFeedback>
                  </td>
                </tr>
              </tbody>
            </Table>

            <Table borderless className="table_card_table">
              <thead>
                <tr>
                  <th width="15%">Name</th>

                  <th width="15%">finance contact</th>
                  <th colSpan="2">finance E-mail</th>
                  <th width="15%">currency</th>
                  <th width="13%">payment terms</th>
                  <th colSpan="2">
                    <div className="d-flex justify-content-around align-items-center">
                      <div>send invoice automaticaly</div>
                      <CustomInput
                        label
                        value={values.send_invoice_auto}
                        checked={values.send_invoice_auto}
                        onChange={handleChange}
                        size="lg"
                        type="checkbox"
                        id="send_invoice_auto"
                        name="send_invoice_auto"
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
                      name="name"
                      invalid={errors.name && touched.name}
                      tag={Field}
                    />
                    <FormFeedback>{errors.name}</FormFeedback>
                  </td>
                  <td width="13%">
                    <Input
                      name="finance_contact"
                      invalid={
                        errors.finance_contact && touched.finance_contact
                      }
                      tag={Field}
                    />{" "}
                    <FormFeedback>{errors.finance_contact}</FormFeedback>
                  </td>
                  <td colSpan="2">
                    <Input
                      name="finance_email"
                      type="email"
                      className="w-75"
                      invalid={errors.finance_email && touched.finance_email}
                      tag={Field}
                    />{" "}
                    <FormFeedback>{errors.finance_email}</FormFeedback>
                  </td>
                  <td width="15%">
                    <Input
                      tag={Field}
                      component="select"
                      type="select"
                      name="currnecy"
                      invalid={errors.currnecy && touched.currnecy}
                      onChange={handleChange}
                    >
                      <option value="ILS">ILS</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="RMB">RMB</option>
                    </Input>
                    <FormFeedback>{errors.currency}</FormFeedback>
                  </td>
                  <td width="13%">
                    <Input
                      type="select"
                      component="select"
                      invalid={errors.payment_terms && touched.payment_terms}
                      name="payment_terms"
                      tag={Field}
                    >
                      <option value="CASH">CASH</option>
                      <option value="EOM + 30">EOM + 30</option>
                      <option value="EOM + 60">EOM + 60</option>
                      <option value="EOM + 90">EOM + 90</option>
                      <option value="NET + 30">NET + 30</option>
                      <option value="NET + 60">NET + 60</option>
                      <option value="NET + 90">NET + 90</option>
                    </Input>{" "}
                    <FormFeedback>{errors.payment_terms}</FormFeedback>
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
    name: "",
    official_name: "",
    number: "",
    contact_person: "",
    phone_number: "",
    email: "",
    address: "",
    country: "",
    send_invoice_auto: false,
    finance_contact: "",
    finance_email: "",
    currency: "ILS",
    payment_terms: "CASH"
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setSubmitting(true);
    props.addClient(values);
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("This Field is Required"),
    official_name: Yup.string().required("This Field is Required"),
    number: Yup.number().required("This Field is Required"),
    contact_person: Yup.string().required("This Field is Required"),
    phone_number: Yup.number().required("This Field is Required"),
    email: Yup.string()
      .email("ENter a valid Email")
      .required("This Field is Required"),
    finance_email: Yup.string()
      .email("ENter a valid Email")
      .required("This Field is Required"),
    address: Yup.string().required("This Field is Required"),
    country: Yup.string().required("This Field is Required"),
    finance_contact: Yup.string().required("This Field is Required"),
    currency: Yup.string().required("This Field is Required"),
    payment_terms: Yup.string().required("This Field is Required")
  })
})(NewClient);
export default connect(
  null,
  {
    addClient
  }
)(CompWithFormik);
