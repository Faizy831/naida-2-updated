import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import uid from "uid";
import { connect } from "react-redux";
import { getClients } from "../../actions/clientsActions";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";

import TableCard from "../layout/TableCard";

import {
  FormGroup,
  FormText,
  Input,
  Col,
  Label,
  Button,
  FormFeedback
} from "reactstrap";
import Phases from "./Phases";

function NewProjectFixed({
  values,
  handleChange,
  errors,
  touched,
  isSubmitting,
  setStep
}) {
  const [phases, setPhases] = useState([
    { id: "1", number: "1", name: "", owner: "", hours: "", due_Date: "" }
  ]);
  const addPhase = () => {
    setPhases([
      ...phases,
      {
        id: uid(),
        number: "",
        name: "",
        owner: "",
        hours: "",
        due_Date: ""
      }
    ]);
  };
  useEffect(() => {
    values.phases = phases;
  }, [phases]);
  return (
    <div>
      <Form>
        <TableCard>
          <h5>Fixed Rate</h5>

          <FormGroup row>
            <Label for="rates" sm={2}>
              Rates
            </Label>
            <Col sm={2}>
              <Input
                type="number"
                name="product_designer_rate"
                id="product_designer_rate"
                tag={Field}
                invalid={
                  errors.product_designer_rate && touched.product_designer_rate
                }
                placeholder="Product designer"
              />

              <FormText>Hourly rates</FormText>
              <FormFeedback>{errors.product_designer_rate}</FormFeedback>
            </Col>
            <Col sm={2}>
              <Input
                type="number"
                tag={Field}
                invalid={errors.mec_designer_rate && touched.mec_designer_rate}
                name="mec_designer_rate"
                id="mec_designer_rate"
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
                id="digital_designer_rate"
                placeholder="Digital designer"
              />
              <FormFeedback>{errors.digital_designer_rate}</FormFeedback>
            </Col>
            <Col sm={2}>
              <Input
                type="number"
                tag={Field}
                name="vp_rate"
                invalid={errors.vp_rate && touched.vp_rate}
                id="vp_rate"
                placeholder="VP"
              />
              <FormFeedback>{errors.vp_rate}</FormFeedback>
            </Col>
            <Col sm={2}>
              <Input
                type="number"
                tag={Field}
                name="partner_rate"
                invalid={errors.partner_rate && touched.partner_rate}
                id="partner_rate"
                placeholder="Partner"
              />
              <FormFeedback>{errors.partner_rate}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Project management fee</Label>
            <Col sm={5}>
              <Input
                type="number"
                tag={Field}
                invalid={errors.monthly_fee && touched.monthly_fee}
                name="monthly_fee"
                id="monthly_fee"
                placeholder="Amount due p/month"
              />
              <FormFeedback>{errors.monthly_fee}</FormFeedback>
            </Col>
            <Label sm={2}>Down-payment fee</Label>
            <Col sm={2}>
              <Input
                type="number"
                tag={Field}
                name="down_payment_fee"
                invalid={errors.down_payment_fee && touched.down_payment_fee}
                id="down_payment_fee"
                placeholder="amount due"
              />
              <FormText>Form Contract/po</FormText>
              <FormFeedback>{errors.down_payment_fee}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>PO</Label>
            <Col sm={2}>
              <Input
                type="text"
                tag={Field}
                name="po_number"
                id="po_number"
                placeholder="Number"
                invalid={errors.po_number && touched.po_number}
              />
              <FormText>From Client</FormText>
              <FormFeedback>{errors.po_number}</FormFeedback>
            </Col>
            <Col sm={2}>
              <Input
                type="number"
                name="po_amount"
                tag={Field}
                id="po_amount"
                invalid={errors.po_amount && touched.po_amount}
                placeholder="Amount due"
              />
              <FormText>Amount due in existing PO</FormText>
              <FormFeedback>{errors.po_amount}</FormFeedback>
            </Col>
            <Label sm={2}>Material Billing</Label>

            <Col sm={4}>
              <Input
                tag={Field}
                onChange={handleChange}
                component="select"
                type="select"
                name="material_billing"
                invalid={errors.material_billing && touched.material_billing}
              >
                <option value="monthly">Monthly</option>
                <option value="p_phase">P/Phase</option>
              </Input>
              <FormFeedback>{errors.material_billing}</FormFeedback>
            </Col>
          </FormGroup>
        </TableCard>

        <TableCard>
          <Phases phases={phases} setPhases={setPhases} />

          <FormGroup>
            <div className="d-flex w-100 justify-content-between">
              <div className="py-2">
                <Button
                  style={{
                    height: "35px"
                  }}
                  onClick={addPhase}
                  className="table-card-button ml-0"
                >
                  Add Row
                </Button>
              </div>
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
                    width: "70px",
                    height: "35px"
                  }}
                  className="table-card-button "
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              </div>
            </div>
          </FormGroup>
        </TableCard>
      </Form>
    </div>
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
    po_number: "",
    po_amount: "",
    down_payment_fee: "",
    material_billing: "monthly"
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setSubmitting(true);
    values.phases = values.phases.filter(phase => phase.name && phase.due_Date);
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
    material_billing: Yup.string()
  })
})(NewProjectFixed);
const mapStateToProps = state => ({ clients: state.clients.clients });
export default connect(
  mapStateToProps,
  { getClients }
)(CompWithFormik);
