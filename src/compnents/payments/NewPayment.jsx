import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

import { connect } from "react-redux";
import { addPayment } from "../../actions/paymentsActions";
import { getProjects, getProject } from "../../actions/projectsActions";
import { getClients } from "../../actions/clientsActions";

import TableCard from "../layout/TableCard";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
// reactstrap
import {
  Table,
  Input,
  Button,
  FormFeedback,
  Progress,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
// icons
import { ReactComponent as Done } from "../../Icons/done.svg";
import { ReactComponent as Edit } from "../../Icons/edit.svg";
import { ReactComponent as Close } from "../../Icons/close.svg";
import { ReactComponent as Attachment } from "../../Icons/attachment.svg";
import { ReactComponent as Complete } from "../../Icons/completed.svg";
import { ReactComponent as UnComplete } from "../../Icons/uncomplete.svg";
import Spinner from "../layout/Spinner";
import { tsTypeAliasDeclaration } from "@babel/types";

function NewPayment({
  values,
  touched,
  errors,
  handleChange,
  isSubmitting,
  getProjects,
  getProject,
  projects,
  project,
  setFieldValue
}) {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [client, setClient] = useState("");
  const [phases, setphases] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await Promise.all([getProjects()]);
      setLoading(false);
    };
    getData();
  }, [getProjects]);

  useEffect(() => {
    if (values.project_id) {
      const project = projects.find(
        project => project.id === values.project_id
      );
      if (project) {
        setClient(project.owner.firstName + " " + project.owner.lastName);
        values.client = project.owner.firstName + " " + project.owner.lastName;
        values.currnecy = project.currnecy;
      }
      const getData = async () => {
        setLoading(true);
        await getProject(values.project_id);
        setLoading(false);
      };
      getData();
    }
  }, [values.project_id, projects, getProject]);

  useEffect(() => {
    values.payment_date = date;
  }, [date, values.payment_date]);

  useEffect(() => {
    if (project && project.tasks) {
      setphases(
        project.tasks.map(task => ({ name: task.name, id: task.asanaTaskID }))
      );
    }
  }, [project]);
  useEffect(() => {
    if (project && project.tasks) {
      values.phase_date = project.tasks.find(
        task => task.name === values.phase
      ).due_Date;
    }
  }, [values.phase]);
  return (
    <div>
      <h3>New payment</h3>
      <Form>
        <TableCard>
          <div className="d-flex justify-content-between table_card_header">
            <div className="d-flex">
              <Button
                tag={Link}
                to={`/payments/:id`}
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
              <Link to="/payments">
                <Close />
              </Link>
            </div>
          </div>
          <fieldset disabled={loading || isSubmitting}>
            <Table borderless className="table_card_table">
              <thead>
                <tr>
                  <th width="13%">Project</th>
                  <th width="10%">Client</th>
                  <th width="15%">Phase</th>
                  <th width="14%">Amount Due</th>
                  <th width="13%">payment Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="13%">
                    <Input
                      tag={Field}
                      component="select"
                      type="select"
                      name="project_id"
                      onChange={handleChange}
                    >
                      <option disabled selected value={null}>
                        Select project
                      </option>

                      {projects.map(project => (
                        <option value={project.id}>
                          {project.asanaData.name}
                        </option>
                      ))}
                    </Input>
                  </td>
                  <td width="10%">
                    {/* {client} */}
                    <Input
                      value={client}
                      disabled
                      className="text-capitalize"
                    />
                  </td>
                  <td width="15%">
                    <Input
                      tag={Field}
                      component="select"
                      type="select"
                      name="phase"
                      onChange={handleChange}
                    >
                      <option disabled selected value={null}>
                        Select Phase
                      </option>
                      {phases.map(phase => (
                        <option value={phase.name}>{phase.name}</option>
                      ))}
                    </Input>
                  </td>
                  <td width="14%">
                    <InputGroup>
                      <Input
                        name="amount_due"
                        invalid={errors.amount_due && touched.amount_due}
                        tag={Field}
                      />
                      <InputGroupAddon
                        addonType="append"
                        style={{
                          height: "25px !important"
                        }}
                      >
                        <InputGroupText
                          style={{
                            height: "25px !important",
                            fontSize: "13px"
                          }}
                        >
                          {project && project.currnecy}
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>

                    <FormFeedback>{errors.amount_due}</FormFeedback>
                  </td>
                  <td width="13%">
                    <DatePicker
                      selected={date}
                      name="payment_date"
                      onChange={value => setDate(value)}
                    />
                    <FormFeedback>{errors.payment_date}</FormFeedback>
                  </td>
                </tr>
              </tbody>
            </Table>
          </fieldset>
        </TableCard>
      </Form>
      {values.project_id && project && project.tasks && (
        <div>
          <TableCard>
            <h3 className="text-capitalize">
              Project Info - {project.project_name}
            </h3>
            <Table borderless hover className="table_card_table">
              <thead>
                <tr>
                  <th>phase name</th>
                  <th>hours (min)</th>
                  <th>hours (max)</th>
                  <th>hours (act)</th>
                  <th>owner</th>
                  <th>progress</th>
                  <th>due date</th>
                  <th>expenses</th>
                  <th>completion</th>
                </tr>
              </thead>

              {!loading ? (
                <tbody>
                  {project.tasks.map(
                    ({
                      hours_max,
                      hours_min,
                      hours_act,
                      hours,
                      owner,
                      progress,
                      due_Date,
                      expenses,
                      completion,
                      toggl: { name, duration }
                    }) => (
                      <tr
                        style={{
                          cursor: "pointer"
                        }}
                      >
                        <td>{name}</td>
                        <td>{hours}</td>
                        <td>{hours}</td>
                        <td>
                          {duration
                            ? (duration / 1000 / 60 / 60).toFixed(0)
                            : "-"}
                        </td>
                        <td>Mustapha lounici</td>
                        <td>
                          <Progress
                            color={
                              duration
                                ? duration / 1000 / 60 / 60 / hours > hours
                                  ? "danger"
                                  : "primary"
                                : ""
                            }
                            value={
                              duration
                                ? (duration / 1000 / 60 / 60 / hours) * 100
                                : 0
                            }
                          />
                        </td>
                        <td>{due_Date}</td>
                        <td>500$</td>
                        <td
                          style={{
                            fontSize: "1.5em",
                            paddingLeft: "2em"
                          }}
                        >
                          <UnComplete />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              ) : null}
            </Table>
            <Table borderless className="table_card_table">
              <thead>
                <tr>
                  <th>business model</th>
                  <th>rates</th>
                  <th>modeling commission</th>
                  <th>po number</th>
                  <th>Po budget</th>
                  <th>currency</th>
                </tr>
              </thead>

              {!loading ? (
                <tbody>
                  <tr>
                    <td>{project.business_modle}</td>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>Product designer</td>
                            <td>{project.product_designer_rate}</td>
                          </tr>
                          <tr>
                            <td>Mechanical designer</td>
                            <td>{project.mec_designer_rate}</td>
                          </tr>
                          <tr>
                            <td>Digital designer</td>
                            <td>{project.digital_designer_rate}</td>
                          </tr>
                          <tr>
                            <td>VP</td>
                            <td>{project.vp_rate}</td>
                          </tr>
                          <tr>
                            <td>Partner</td>
                            <td>{project.partner_rate}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      {" "}
                      <table>
                        <tbody>
                          <tr>
                            <td>Local</td>
                            <td>{project.commission_local}%</td>
                          </tr>
                          <tr>
                            <td>Import</td>
                            <td>{project.commission_import}%</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <p>{project.po_number}</p>
                    </td>
                    <td>
                      <p>
                        {project.po_hours}Hours/
                        {(project.amount_due || project.down_payment_fee) *
                          project.po_hours}{" "}
                        {project.currnecy}
                      </p>
                    </td>

                    <td>{project.currnecy}</td>
                  </tr>
                </tbody>
              ) : null}
            </Table>
            {loading ? <Spinner /> : null}
          </TableCard>
        </div>
      )}
    </div>
  );
}
const CompWithFormik = withFormik({
  mapPropsToValues: ({ projects, project }) => ({
    project_id: projects[0] && projects[0].id,
    phase: project && project.tasks && project.tasks[0].name,
    amount_due: "",
    payment_date: new Date(),
    client: "",
    phase_date: ""
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setSubmitting(true);
    props.addPayment(values);
  },
  validationSchema: Yup.object().shape({})
})(NewPayment);
const mapStateToProps = state => ({
  clients: state.clients.clients,
  projects: state.projects.projects,
  project: state.projects.currentProject
});
export default connect(
  mapStateToProps,
  {
    addPayment,
    getProjects,
    getProject
  }
)(CompWithFormik);
