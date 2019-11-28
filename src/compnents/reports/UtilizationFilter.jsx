import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getTeamMembers } from "../../actions/usersActions";
import { getPresets } from "../../actions/settingsActions";
import TableCard from "../layout/TableCard";
import {
  Row,
  FormGroup,
  Label,
  Col,
  Input,
  CustomInput,
  Button
} from "reactstrap";
import { DateRangePicker } from "react-date-range";

import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";

import { format, addDays } from "date-fns";

function Filter({
  getTeamMembers,
  getPresets,
  values,
  handleChange,
  touched,
  errors,
  isSubmitting,
  presets,
  members
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await Promise.all([getTeamMembers(), getPresets()]);
      setLoading(false);
    };
    getData();
  }, [getTeamMembers, getPresets]);

  const handleRangeChange = payload => {
    setDateRangePicker(payload);
  };

  const [dateRangePicker, setDateRangePicker] = useState({
    selection: {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection"
    }
  });
  return (
    <Form>
      <h3>Utilization</h3>
      <TableCard>
        <fieldset disabled={loading || isSubmitting}>
          <Row form className="d-flex align-items-center">
            <Col md={2}>
              <FormGroup className="p-0">
                <Label for="client">Departement</Label>
                <Input
                  required
                  tag={Field}
                  component="select"
                  type="select"
                  name="departement"
                  onChange={handleChange}
                >
                  <option disabled selected value={null}>
                    Select Departement
                  </option>
                  {presets.departements &&
                    presets.departements
                      .split(",")
                      .map(dep => <option value={dep}>{dep}</option>)}
                </Input>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup className="p-0">
                <Label for="project">Team</Label>
                <Input
                  required
                  tag={Field}
                  component="select"
                  type="select"
                  name="project_id"
                  onChange={handleChange}
                >
                  <option disabled selected value={null}>
                    Select Team
                  </option>
                  {presets.teams &&
                    presets.teams
                      .split(",")
                      .map(team => <option value={team}>{team}</option>)}
                </Input>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup className="p-0">
                <Label for="pahse">Supplier</Label>
                <Input
                  required
                  tag={Field}
                  component="select"
                  type="select"
                  name="supplier"
                  onChange={handleChange}
                >
                  <option disabled selected value={null}>
                    Select team
                  </option>
                  {members.map(member => (
                    <option value={member.id}>{member.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>

            <Col md={2} className="ml-auto">
              <FormGroup className="p-0">
                <Button className="header_btn mx-4 px-4">Apply</Button>
              </FormGroup>
            </Col>
          </Row>

          <DateRangePicker
            onChange={value => handleRangeChange(value)}
            className={"PreviewArea"}
            months={2}
            ranges={[dateRangePicker.selection]}
            direction="horizontal"
          />
        </fieldset>
      </TableCard>
    </Form>
  );
}

const CompWithFormik = withFormik({
  mapPropsToValues: ({ projects, project, clients }) => ({
    project_id: null,
    phase: null,
    client_id: null
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setSubmitting(true);
    props.setFilterData(values);
    props.nextStep();
  },
  validationSchema: Yup.object().shape({})
})(Filter);
const mapStateToProps = state => ({
  presets: state.settings.presets,
  members: state.users.team
});
export default connect(
  mapStateToProps,
  { getTeamMembers, getPresets }
)(CompWithFormik);
