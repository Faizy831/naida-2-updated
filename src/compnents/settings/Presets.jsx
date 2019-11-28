import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormGroup, Input, Button, Label, Col } from "reactstrap";
import TableCard from "../layout/TableCard";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { getPresets, updatePresets } from "../../actions/settingsActions";
// icons
import { ReactComponent as Done } from "../../Icons/done.svg";
import { ReactComponent as Edit } from "../../Icons/edit.svg";
import { ReactComponent as Close } from "../../Icons/close.svg";

function Presets({ presets, getPresets, updatePresets }) {
  useEffect(() => {
    const getData = async () => {
      await getPresets();
    };
    getData();
  }, [getPresets]);

  return (
    <div>
      <h3>Presets</h3>
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
            <Label sm={2}>Departement</Label>
            <Col sm={8}>
              <Input
                tag={Field}
                name="departements"
                placeholder="Design, Engineering, Digital, Management, "
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Teams</Label>
            <Col sm={8}>
              <Input
                tag={Field}
                name="teams"
                placeholder="Team Boaz, Team Elad, Team Shir, Team Eitan, "
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>roles</Label>
            <Col sm={8}>
              <Input
                tag={Field}
                name="roles"
                placeholder="Product designer, Mechanical designer, Digital designer, Manager, Admin, add more"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>commisions</Label>
            <Label sm={1}>local</Label>
            <Col sm={1}>
              <Input tag={Field} name="commision_local" placeholder="35%" />
            </Col>
            <Label sm={1}>import</Label>
            <Col sm={1}>
              <Input tag={Field} name="commision_import" placeholder="100%" />
            </Col>
            <Label sm={4} className="text-right">
              Amount for 50% discount on commision
            </Label>
            <Col sm={2}>
              <Input
                tag={Field}
                name="amount50discount"
                placeholder="2,000 USD"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>prime hour cost</Label>
            <Col sm={3}>
              <Input tag={Field} name="primeHourCost" placeholder="45$" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>employee monthly hours</Label>
            <Col sm={3}>
              <Input
                tag={Field}
                name="employee_monthly_hours"
                placeholder="182"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>week start on</Label>
            <Col sm={4}>
              <Input tag={Field} name="weekStartOn" placeholder="Sunday" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Expense types</Label>
            <Col sm={8}>
              <Input
                tag={Field}
                name="expenses"
                placeholder="LIST WILL BE PROVIDED"
              />
            </Col>
          </FormGroup>
        </Form>
      </TableCard>
    </div>
  );
}

const CompWithFormik = withFormik({
  mapPropsToValues: ({ presets }) => {
    return {
      departements: presets.departements || "",
      teams: presets.teams || "",
      roles: presets.roles || "",
      commision_local: presets.commision_local || "",
      commision_import: presets.commision_import || "",
      amount50discount: presets.amount50discount || "",
      primeHourCost: presets.primeHourCost || "",
      employee_monthly_hours: presets.employee_monthly_hours || "",
      weekStartOn: presets.weekStartOn || "",
      expenses: presets.expenses || ""
    };
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    props.updatePresets(values);
    setSubmitting(false);
  },
  validationSchema: Yup.object().shape({})
})(Presets);

const mapStateToProps = state => ({
  presets: state.settings.presets
});
export default connect(
  mapStateToProps,
  { getPresets, updatePresets }
)(CompWithFormik);
