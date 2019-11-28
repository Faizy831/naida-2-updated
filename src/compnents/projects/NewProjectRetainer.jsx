import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getClients } from "../../actions/clientsActions";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";

import TableCard from "../layout/TableCard";
import {
  FormGroup,
  Input,
  Col,
  Label,
  FormText,
  Button,
  FormFeedback
} from "reactstrap";
function NewProjectRetainer({ errors, touched, isSubmitting, setStep }) {
  return (
    <TableCard>
      <h5>Retainer</h5>
      <Form>
        <FormGroup row>
          <Label for="rates" sm={2}>
            Rates
          </Label>
          <Col sm={2}>
            <Input
              type="number"
              tag={Field}
              invalid={
                errors.product_designer_rate && touched.product_designer_rate
              }
              name="product_designer_rate"
              placeholder="Product designer"
            />
            <FormFeedback>{errors.product_designer_rate}</FormFeedback>
            <FormText>Hourly rates</FormText>
          </Col>
          <Col sm={2}>
            <Input
              type="number"
              tag={Field}
              invalid={errors.mec_designer_rate && touched.mec_designer_rate}
              name="mec_designer_rate"
              id="mec_designer"
              placeholder="Mechanical Designer"
            />
            <FormFeedback>{errors.mec_designer_rate}</FormFeedback>
          </Col>
          <Col sm={2}>
            <Input
              type="number"
              tag={Field}
              invalid={
                errors.digital_designer_rate && touched.digital_designer_rate
              }
              name="digital_designer_rate"
              id="digital_designer"
              placeholder="Digital designer"
            />
            <FormFeedback>{errors.digital_designer_rate}</FormFeedback>
          </Col>
          <Col sm={2}>
            <Input
              type="number"
              tag={Field}
              name="vp_rate"
              id="vp"
              invalid={errors.vp_rate && touched.vp_rate}
              placeholder="VP"
            />
            <FormFeedback>{errors.vp_rate}</FormFeedback>
          </Col>
          <Col sm={2}>
            <Input
              type="number"
              name="partner_rate"
              id="partner"
              invalid={errors.partner_rate && touched.partner_rate}
              tag={Field}
              placeholder="Partner"
            />
            <FormFeedback>{errors.partner_rate}</FormFeedback>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="Monthly fee" sm={2}>
            Monthly fee
          </Label>
          <Col sm={4}>
            <Input
              type="number"
              tag={Field}
              name="monthly_fee"
              invalid={errors.monthly_fee && touched.monthly_fee}
              id="monthly_fee"
              placeholder="Amount due"
            />
          </Col>
          <Label for="start_date" sm={2}>
            Start & End Dates
          </Label>
          <Col sm={2}>
            <Input
              type="date"
              tag={Field}
              name="start_date"
              invalid={errors.start_date && touched.start_date}
              id="start_date"
              placeholder="Start -DD/MM/YYYY"
            />
            <FormFeedback>{errors.start_date}</FormFeedback>

            <FormText>Start</FormText>
          </Col>
          <Col sm={2}>
            <Input
              type="date"
              tag={Field}
              name="end_date"
              invalid={errors.end_date && touched.end_date}
              id="end_date"
              placeholder="End -DD/MM/YYYY"
            />
            <FormFeedback>{errors.end_date}</FormFeedback>

            <FormText>End</FormText>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="po" sm={2}>
            PO
          </Label>
          <Col sm={2}>
            <Input
              type="text"
              name="po_number"
              id="po_number"
              tag={Field}
              placeholder="Number"
              invalid={errors.po_number && touched.po_number}
            />

            <FormFeedback>{errors.po_number}</FormFeedback>
            <FormText>From Client</FormText>
          </Col>
          <Col sm={2}>
            <Input
              type="text"
              name="po_amount"
              id="po_amount"
              invalid={errors.po_amount && touched.po_amount}
              tag={Field}
              placeholder="Amount due"
            />
            <FormFeedback>{errors.po_amount}</FormFeedback>
            <FormText>Amount due in exsisting PO</FormText>
          </Col>
          <Label for="project_name" sm={2}>
            Down-payment fee
          </Label>
          <Col sm={2}>
            <Input
              type="text"
              name="down_payment_fee"
              tag={Field}
              id="down_payment_fee"
              invalid={errors.down_payment_fee && touched.down_payment_fee}
              placeholder="Amount due"
            />
            <FormFeedback>{errors.down_payment_fee}</FormFeedback>
            <FormText>From Contact/PO</FormText>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="Max Monthly Hours" sm={2}>
            Max Monthly Hours
          </Label>
          <Col sm={2}>
            <Input
              type="text"
              tag={Field}
              invalid={errors.max_monthly_hours && touched.max_monthly_hours}
              name="max_monthly_hours"
              id="max_monthly_hours"
              placeholder="Hour amount"
            />
            <FormFeedback>{errors.max_monthly_hours}</FormFeedback>
          </Col>
        </FormGroup>
        <div className="d-flex w-100 justify-content-end ">
          <div className="py-2">
            <Button
              style={{
                width: "70px"
              }}
              onClick={() => setStep(1)}
              className="table-card-button mr-3"
            >
              Back
            </Button>
            <Button
              style={{
                width: "70px"
              }}
              className="table-card-button "
              disabled={isSubmitting}
            >
              Save
            </Button>
          </div>
        </div>
      </Form>
    </TableCard>
  );
}

const CompWithFormik = withFormik({
  mapPropsToValues: () => ({
    product_designer_rate: "",
    mec_designer_rate: "",
    digital_designer_rate: "",
    vp_rate: "",
    partner_rate: "",
    monthly_fee: "",
    start_date: "",
    end_date: "",
    po_number: "",
    po_amount: "",
    down_payment_fee: "",
    max_monthly_hours: ""
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setSubmitting(true);
    props.setData({ ...props.data, ...values });
    props.createProject({ ...props.data, ...values });
    setSubmitting(false);
  },
  validationSchema: Yup.object().shape({
    product_designer_rate: Yup.number().min(0),
    mec_designer_rate: Yup.number().min(0),
    digital_designer_rate: Yup.number().min(0),
    vp_rate: Yup.number().min(0),
    partner_rate: Yup.number().min(0),
    monthly_fee: Yup.number().min(0),
    po_number: Yup.string(),
    po_amount: Yup.string(),
    down_payment_fee: Yup.string(),
    start_date: Yup.date().required("This Field is Required"),
    end_date: Yup.date().required("This Field is Required"),
    max_monthly_hours: Yup.number()
  })
})(NewProjectRetainer);
const mapStateToProps = state => ({ clients: state.clients.clients });
export default connect(
  mapStateToProps,
  { getClients }
)(CompWithFormik);
