import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getClients } from "../../actions/clientsActions";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
  CustomInput,
  FormFeedback
} from "reactstrap";
import TableCard from "../layout/TableCard";

function NewProjectBasic({
  data,
  setData,
  setBuissModle,
  clients,
  users,
  errors,
  touched,
  values,
  handleChange,
  isSubmitting
}) {
  const [fileName, setFileName] = useState(null);
  const handleFileChange = e => {
    values.attachment = e.target.files[0];
    if (e.target.files[0]) setFileName(e.target.files[0].name);
  };
  return (
    <TableCard className="w-100">
      <Form>
        <div className="d-flex new_project">
          <div className="w-50">
            <FormGroup row>
              <Label for="project_name" sm={4}>
                Project name
              </Label>
              <Col sm={8}>
                <Input
                  tag={Field}
                  type="text"
                  name="project_name"
                  placeholder="Project name"
                  invalid={errors.project_name && touched.project_name}
                />
                <FormFeedback>{errors.project_name}</FormFeedback>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="client_id" sm={4}>
                Client
              </Label>
              <Col sm={8}>
                <Input
                  tag={Field}
                  component="select"
                  type="select"
                  name="client_id"
                  onChange={handleChange}
                  invalid={errors.client_id && touched.client_id}
                >
                  <option key={1} value="">
                    Select Client
                  </option>
                  {clients &&
                    clients.map(client => (
                      <option key={client.togglID} value={client.togglID}>
                        {client.official_name}
                      </option>
                    ))}
                </Input>
                <FormFeedback>{errors.client_id}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="owner" sm={4}>
                Owner
              </Label>
              <Col sm={8}>
                <Input
                  tag={Field}
                  component="select"
                  type="select"
                  name="owner"
                  onChange={handleChange}
                  invalid={errors.owner && touched.owner}
                >
                  <option key={1} value="">
                    Select owner
                  </option>
                  {users &&
                    users.map(user => (
                      <option value={user.email}>{user.name}</option>
                    ))}
                </Input>
                <FormFeedback>{errors.owner}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="currnecy" sm={4}>
                Currency
              </Label>
              <Col sm={8}>
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
                <FormText color="muted">ILS,USD,EUR,GBP,RMB</FormText>
                <FormFeedback>{errors.currnecy}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="commission" sm={4}>
                Commissions
              </Label>
              <Col sm={4}>
                <Input
                  tag={Field}
                  type="text"
                  name="commission_local"
                  placeholder="local"
                  invalid={errors.commission_local && touched.commission_local}
                />
                <FormFeedback>{errors.commission_local}</FormFeedback>
              </Col>
              <Col sm={4}>
                <Input
                  tag={Field}
                  type="text"
                  name="commission_import"
                  placeholder="import"
                  invalid={
                    errors.commission_import && touched.commission_import
                  }
                />
                <FormFeedback>{errors.commission_import}</FormFeedback>
              </Col>
              <FormText color="muted">
                Commission added to modeling and subcontractor work
              </FormText>
            </FormGroup>

            <FormGroup row>
              <Label for="Business_modle" sm={4}>
                Business modle
              </Label>
              <Col sm={8}>
                <Input
                  tag={Field}
                  onChange={handleChange}
                  component="select"
                  type="select"
                  invalid={errors.business_modle && touched.business_modle}
                  name="business_modle"
                >
                  <option value="TM_monthly">Time & material - monthly</option>
                  <option value="TM_Milestone">
                    Time & material - milestone
                  </option>
                  <option value="fixed">Fixed</option>
                  <option value="retainer">Retainer</option>
                </Input>
                <FormFeedback>{errors.business_modle}</FormFeedback>
              </Col>
            </FormGroup>
          </div>

          <div className="w-50">
            <FormGroup row>
              <Label for="attachmentInput" sm={3}>
                Attachments
              </Label>
              <Col sm={9}>
                <CustomInput
                  type="file"
                  name="attachment"
                  label={fileName || "choose file"}
                  id="attachmentInput"
                  onChange={handleFileChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="comments" sm={3}>
                Comments
              </Label>
              <Col sm={9}>
                <Input
                  tag={Field}
                  type="textarea"
                  component="textarea"
                  name="comments"
                  rows="7"
                />
              </Col>
            </FormGroup>
            <FormGroup row className="pt-4">
              <Label for="material_subcon_billing" sm={3}>
                Material & SubCon Billing
              </Label>
              <Col sm={9} className="d-flex ">
                <CustomInput
                  tag={Field}
                  type="checkbox"
                  className="align-self-center"
                  name="material_subcon_billing"
                  id="material_subcon_billing"
                  checked={values.material_subcon_billing}
                  value={values.material_subcon_billing}
                  onChange={handleChange}
                  inline
                />
              </Col>
            </FormGroup>
          </div>
        </div>
        <div className="d-flex w-100 justify-content-end ">
          <div className="py-2">
            <Button
              style={{
                width: "70px"
              }}
              tag={Link}
              to="/projects"
              className="table-card-button mr-3"
            >
              Cancel
            </Button>
            <Button
              style={{
                width: "70px"
              }}
              className="table-card-button "
              disabled={isSubmitting}
            >
              Next
            </Button>
          </div>
        </div>
      </Form>
    </TableCard>
  );
}
const CompWithFormik = withFormik({
  mapPropsToValues: ({ data }) => ({
    project_name: data.project_name,
    client_id: data.client_id,
    owner: data.owner && data.owner.email,
    currnecy: data.currnecy || "ILS",
    commission_local: data.commission_local,
    commission_import: data.commission_import,
    business_modle: data.business_modle || "TM_monthly",
    attachment: data.attachment || null,
    comments: data.comments || "",
    material_subcon_billing: !!data.material_subcon_billing
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setSubmitting(true);
    props.setBuissModle(values.business_modle);
    props.setData({
      ...props.data,
      ...values,
      owner: props.users.find(user => user.email === values.owner)
    });
    props.setStep(2);
    setSubmitting(false);
  },
  validationSchema: Yup.object().shape({
    project_name: Yup.string("Enter Project Name").required(
      "Project Name is Required"
    ),
    commission_import: Yup.string().required("This Field is Required"),
    commission_local: Yup.string().required("This Field is Required"),
    client_id: Yup.string("Select a client").required("Client Is Required"),
    owner: Yup.string("Select an Owner").required("Owner Is Required"),
    currnecy: Yup.string("Select a currnecy").required("currnecy Is Required"),
    business_modle: Yup.string().required("This Field is Required")
  })
})(NewProjectBasic);
const mapStateToProps = state => ({
  clients: state.clients.clients,
  users: state.users.team
});
export default connect(mapStateToProps)(CompWithFormik);
