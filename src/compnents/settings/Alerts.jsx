import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TableCard from "../layout/TableCard";
import {
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { getAlerts, updateAlerts } from "../../actions/settingsActions";
// icons

import { ReactComponent as Done } from "../../Icons/done.svg";
import { ReactComponent as Edit } from "../../Icons/edit.svg";
import { ReactComponent as Close } from "../../Icons/close.svg";

function Alerts({ alerts, getAlerts, updateAlerts }) {
  useEffect(() => {
    const getData = async () => {
      await getAlerts();
    };
    getData();
  }, [getAlerts]);

  return (
    <div>
      <h3>Settings - Alerts</h3>
      <TableCard>
        <Form>
          <div className="d-flex justify-content-between table_card_header mb-3">
            <div className="d-flex">
              <Button
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
              <Link to="/settings/">
                <Close />
              </Link>
            </div>
          </div>

          <FormGroup row>
            <Label sm={2}>hour overdue:</Label>
            <Col sm={8}>
              <div className="d-flex my-2">
                <Square color="#EFDC2D" />
                <InputGroup
                  style={{
                    height: "40px"
                  }}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>up to</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    tag={Field}
                    name="hour_overdue_min"
                    style={{
                      height: "40px"
                    }}
                    placeholder="85% - 100% utilization"
                  />
                </InputGroup>
              </div>
              <div className="d-flex my-2">
                <Square color="#FF6565" />
                <InputGroup
                  style={{
                    height: "40px"
                  }}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>more than</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    tag={Field}
                    name="hour_overdue_max"
                    style={{
                      height: "40px"
                    }}
                    placeholder="more than 100% utilization"
                  />
                </InputGroup>
              </div>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Time overdue:</Label>
            <Col sm={8}>
              <div className="d-flex my-2">
                <Square color="#EFDC2D" />
                <InputGroup
                  style={{
                    height: "40px"
                  }}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>days before deadline</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    tag={Field}
                    name="time_overdue_min"
                    style={{
                      height: "40px"
                    }}
                    placeholder="5 - 0 days before deadline"
                  />
                </InputGroup>
              </div>
              <div className="d-flex my-2">
                <Square color="#FF6565" />
                <InputGroup
                  style={{
                    height: "40px"
                  }}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>days past deadline</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    tag={Field}
                    name="time_overdue_max"
                    style={{
                      height: "40px"
                    }}
                    placeholder="0 days past deadline"
                  />
                </InputGroup>
              </div>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Payment overdue:</Label>
            <Col sm={8}>
              <div className="d-flex my-2">
                <Square color="#EFDC2D" />
                <InputGroup
                  style={{
                    height: "40px"
                  }}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>up to (days delay)</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    tag={Field}
                    name="payment_overdue_min"
                    style={{
                      height: "40px"
                    }}
                    placeholder="up to 15 days delay"
                  />
                </InputGroup>
              </div>
              <div className="d-flex my-2">
                <Square color="#FF6565" />
                <InputGroup
                  style={{
                    height: "40px"
                  }}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>more than (days delay)</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    tag={Field}
                    name="payment_overdue_max"
                    style={{
                      height: "40px"
                    }}
                    placeholder="more than 15 delay"
                  />
                </InputGroup>
              </div>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Utilization:</Label>
            <Col sm={8}>
              <div className="d-flex my-2">
                <Square color="#EFDC2D" />
                <InputGroup
                  style={{
                    height: "40px"
                  }}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText> less than (monthly)</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    tag={Field}
                    name="utilization_min"
                    style={{
                      height: "40px"
                    }}
                    placeholder="Less than 70% monthly"
                  />
                </InputGroup>
              </div>
              <div className="d-flex my-2">
                <Square color="#FF6565" />
                <InputGroup
                  style={{
                    height: "40px"
                  }}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText> more than (monthly)</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    tag={Field}
                    name="utilization_max"
                    style={{
                      height: "40px"
                    }}
                    placeholder="Less than 70% monthly"
                  />
                </InputGroup>
              </div>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Cash flow:</Label>
            <Col sm={8}>
              <div className="d-flex my-2">
                <Square color="#EFDC2D" />
                <InputGroup
                  style={{
                    height: "40px"
                  }}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Less than</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    tag={Field}
                    name="cashFlow_min"
                    style={{
                      height: "40px"
                    }}
                    placeholder="Less than 600,000 NIS"
                  />
                </InputGroup>
              </div>
              <div className="d-flex my-2">
                <Square color="#FF6565" />
                <InputGroup
                  style={{
                    height: "40px"
                  }}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Less than</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    tag={Field}
                    name="cashFlow_max"
                    style={{
                      height: "40px"
                    }}
                    placeholder="Less than 550,000  NIS"
                  />
                </InputGroup>
              </div>
            </Col>
          </FormGroup>
        </Form>
      </TableCard>
    </div>
  );
}
const Square = ({ color = "red" }) => {
  return (
    <div
      className="rounded border mr-2"
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: color
      }}
    />
  );
};
const CompWithFormik = withFormik({
  mapPropsToValues: ({ alerts }) => {
    return {
      hour_overdue_min: alerts.hour_overdue_min || "",
      hour_overdue_max: alerts.hour_overdue_max || "",
      time_overdue_min: alerts.time_overdue_min || "",
      time_overdue_max: alerts.time_overdue_max || "",
      payment_overdue_min: alerts.payment_overdue_min || "",
      payment_overdue_max: alerts.payment_overdue_max || "",
      utilization_min: alerts.utilization_min || "",
      utilization_max: alerts.utilization_max || "",
      cashFlow_min: alerts.cashFlow_min || "",
      cashFlow_max: alerts.cashFlow_max || ""
    };
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(values);
    props.updateAlerts(values);
    setSubmitting(false);
  },
  validationSchema: Yup.object().shape({})
})(Alerts);

const mapStateToProps = state => ({
  alerts: state.settings.alerts
});
export default connect(
  mapStateToProps,
  { getAlerts, updateAlerts }
)(CompWithFormik);
