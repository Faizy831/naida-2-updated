import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getClients } from "../../actions/clientsActions";
import { getProjects, getProject } from "../../actions/projectsActions";
import TableCard from "../layout/TableCard";
import {
  Row,
  FormGroup,
  Label,
  Col,
  Input,
  FormFeedback,
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
  project
}) {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [client, setClient] = useState("");
  const [FiltredProjects, setFiltredProjects] = useState([]);
  const [phases, setphases] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await Promise.all([getProjects(), getClients()]);
      setLoading(false);
    };
    getData();
  }, [getProjects, getClients]);

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
    if (project && project.tasks) {
      setphases(
        project.tasks.map(task => ({ name: task.name, id: task.asanaTaskID }))
      );
    }
  }, [project]);
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
      <h3>Project P&L</h3>
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
                  invalid={errors.client_id && touched.client_id}
                  onChange={handleChange}
                >
                  <option disabled selected value={null}>
                    Select client
                  </option>
                  {clients.map(client => (
                    <option value={client.id}>{client.official_name}</option>
                  ))}
                </Input>
                <FormFeedback>{errors.client_id}</FormFeedback>
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
                  invalid={errors.project_id && touched.project_id}
                  onChange={handleChange}
                >
                  <option disabled selected value={null}>
                    Select project
                  </option>
                  {FiltredProjects.map(project => (
                    <option value={project.id}>{project.asanaData.name}</option>
                  ))}
                </Input>
                <FormFeedback>{errors.project_id}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup className="p-0">
                <Label for="pahse">Phase</Label>
                <Input
                  required
                  tag={Field}
                  component="select"
                  type="select"
                  name="phase"
                  onChange={handleChange}
                  invalid={errors.phase && touched.phase}
                >
                  <option disabled selected value={null}>
                    Select Phase
                  </option>
                  {phases.map(phase => (
                    <option value={phase.name}>{phase.name}</option>
                  ))}
                </Input>
                <FormFeedback>{errors.phase}</FormFeedback>
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
    project_id: projects[0] && projects[0].id,
    phase: project && project.tasks && project.tasks[0].name,
    client_id: clients[0] && clients[0].id
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setSubmitting(true);
    props.setFilterData(values);
    props.nextStep();
  },
  validationSchema: Yup.object().shape({
    project_id: Yup.string().required("This Field is Required"),
    phase: Yup.string().required("This Field is Required"),
    client_id: Yup.string().required("This Field is Required")
  })
})(Filter);
const mapStateToProps = state => ({
  clients: state.clients.clients,
  projects: state.projects.projects,
  project: state.projects.currentProject
});
export default connect(
  mapStateToProps,
  { getClients, getProjects, getProject }
)(CompWithFormik);
