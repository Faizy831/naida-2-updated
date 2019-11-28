import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getProject, updatePhases } from "../../actions/projectsActions";
import { getTeamMembers } from "../../actions/usersActions";
import TableCard from "../layout/TableCard";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { Button, Table, Progress } from "reactstrap";
import uid from "uid";
import firebase, { firestore } from "../../config/firebase";
import { ReactComponent as Done } from "../../Icons/done.svg";
import { ReactComponent as Edit } from "../../Icons/edit.svg";
import { ReactComponent as Close } from "../../Icons/close.svg";
import { ReactComponent as Attachment } from "../../Icons/attachment.svg";
import { ReactComponent as Complete } from "../../Icons/completed.svg";
import { ReactComponent as UnComplete } from "../../Icons/uncomplete.svg";
import Phases from "./Phases";

function ProjectDetails(props) {
  const { project, getProject, match, updatePhases, getTeamMembers } = props;

  const [loading, setLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [phases, setPhases] = useState([]);
  const uploadRef = useRef();
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await Promise.all([getProject(match.params.id)]);
      getTeamMembers();
      setLoading(false);
    };
    getData();
  }, [getProject, match.params.id, getTeamMembers]);
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
  const onSubmit = async () => {
    setCanEdit(false);
    if (phases.length > 0) {
      setLoading(true);
      await updatePhases(phases);
      await getProject(match.params.id);
      setLoading(false);
    }
    await firestore.collection("projects").add(project);
  };

  const uploadAttachment = async e => {
    let attachment = e.target.files[0];
    const storageRef = firebase.storage().ref("/attachments");

    if (attachment) {
      const attachmentImage = await storageRef
        .child(attachment.name)
        .put(attachment);
      attachment = await attachmentImage.ref.getDownloadURL();
      await firestore
        .collection("projects")
        .doc(project.id)
        .update({
          attachment
        });
    }
  };
  return (
    <div>
      <h3>
        <small>{project.project_name}</small>
      </h3>

      <TableCard>
        <div className="d-flex justify-content-between table_card_header">
          <div className="d-flex">
            <Button
              size="lg"
              className={`btn-circle table-card-button mr-2 ${
                canEdit ? "disabled" : ""
              }`}
              onClick={() => setCanEdit(!canEdit)}
            >
              <Edit />
            </Button>
            <Button
              size="lg"
              className={`btn-circle table-card-button mr-2 ${
                !canEdit ? "disabled" : ""
              }`}
              onClick={onSubmit}
            >
              <Done />
            </Button>
            <Button size="lg" className="btn-circle table-card-button ">
              <input
                type="file"
                ref={uploadRef}
                style={{
                  display: "none"
                }}
                onChange={uploadAttachment}
              />
              <Attachment onClick={() => uploadRef.current.click()} />
            </Button>
          </div>
          <div>
            <Link to="/projects">
              <Close />
            </Link>
          </div>
        </div>

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
                      {duration ? (duration / 1000 / 60 / 60).toFixed(0) : "-"}
                    </td>
                    <td>{owner.name}</td>
                    <td>
                      <Progress
                        className={
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
        {canEdit && (
          <div>
            <Phases phases={phases} setPhases={setPhases} title={false} />
            <Button
              size="sm"
              className="px-2 my-1 header_btn"
              onClick={addPhase}
            >
              Add Phase
            </Button>
          </div>
        )}
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
                  {canEdit && (
                    <div>
                      <Button size="sm" className="mx-2 px-2 my-1 header_btn">
                        Add new PO
                      </Button>
                    </div>
                  )}
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
  );
}
const mapStateToProps = state => ({
  project: state.projects.currentProject
});
export default connect(
  mapStateToProps,
  {
    getProject,
    updatePhases,
    getTeamMembers
  }
)(ProjectDetails);
