import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getClients } from "../../actions/clientsActions";
import { getProjects, getProject } from "../../actions/projectsActions";
import { getSuppliers } from "../../actions/suppliersActions";
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
  getClients,
  getProjects,
  clients,
  projects,
  getProject,
  values,
  handleChange,
  touched,
  errors,
  isSubmitting,
  project,
  suppliers,
  getSuppliers
}) {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [client, setClient] = useState("");
  const [FiltredProjects, setFiltredProjects] = useState([]);
  const [phases, setphases] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await Promise.all([getProjects(), getClients(), getSuppliers()]);
      setLoading(false);
    };
    getData();
  }, [getProjects, getClients, getSuppliers]);

  useEffect(() => {
    if (values.project_id) {
      const getData = async () => {
        setLoading(true);
        await getProject(values.project_id);
        setLoading(false);
      };
      getData();
    }
  }, [values.project_id, projects, getProject]);

  useEffect(() => {
    if (values.client_id) {
      const clientID = clients.find(client => client.id === values.client_id)
        .togglID;

      const newFiltredProjects = projects.filter(
        project => +project.client_id === clientID
      );
      setFiltredProjects(newFiltredProjects);
    }
  }, [values.client_id, projects, clients]);

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
      <h3>Expenses</h3>
      <TableCard>
        <fieldset disabled={loading || isSubmitting}>
          <Row form className="d-flex align-items-center">
            <Col md={2}>
              <FormGroup className="p-0">
                <Label for="client">Client</Label>
                <Input
                  required
                  tag={Field}
                  component="select"
                  type="select"
                  name="client_id"
                  onChange={handleChange}
                >
                  <option disabled selected value={null}>
                    Select client
                  </option>
                  {clients.map(client => (
                    <option value={client.id}>{client.official_name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup className="p-0">
                <Label for="project">Project</Label>
                <Input
                  required
                  tag={Field}
                  component="select"
                  type="select"
                  name="project_id"
                  onChange={handleChange}
                >
                  <option disabled selected value={null}>
                    Select project
                  </option>
                  {FiltredProjects.map(project => (
                    <option value={project.id}>{project.asanaData.name}</option>
                  ))}
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
                    Select Supplier
                  </option>
                  {suppliers.map(supplier => (
                    <option value={supplier.id}>
                      {supplier.official_name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup className="p-0">
                <Label for="pahse">Type</Label>
                <Input
                  required
                  tag={Field}
                  component="select"
                  type="select"
                  name="supplier"
                  onChange={handleChange}
                >
                  <option disabled selected value={null}>
                    Select Supplier
                  </option>
                  {suppliers.map(phase => (
                    <option value={phase.name}>{phase.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>

            <Col md={1} className="ml-auto">
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
  clients: state.clients.clients,
  projects: state.projects.projects,
  project: state.projects.currentProject,
  suppliers: state.suppliers.suppliers
});
export default connect(
  mapStateToProps,
  { getClients, getProjects, getProject, getSuppliers }
)(CompWithFormik);
