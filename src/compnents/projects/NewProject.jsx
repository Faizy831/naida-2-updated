import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { addProject } from "../../actions/projectsActions";
import { getTeamMembers } from "../../actions/usersActions";
import { getClients } from "../../actions/clientsActions";

import NewProjectBasic from "./NewProjectBasic";
import NewProjectFixed from "./NewProjectFixed";
import NewProjectRetainer from "./NewProjectRetainer";
import NewProjectTM from "./NewProjectTM";
import Spinner from "../layout/Spinner";

function NewProject({ addProject, getTeamMembers, getClients }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getTeamMembers();
      await getClients();
      setLoading(false);
    };

    getData();
  }, [getClients, getTeamMembers]);

  // this is a steped form , we will have 2 steps
  const [step, setStep] = useState(1);
  const [buissModle, setBuissModle] = useState(1);
  const [projectData, setProjectData] = useState({});
  let StepTwo = null;

  const createProject = data => {
    addProject(data);
  };

  switch (buissModle) {
    case "TM_monthly":
    case "TM_Milestone":
      StepTwo = NewProjectTM;
      break;
    case "retainer":
      StepTwo = NewProjectRetainer;
      break;
    case "fixed":
      StepTwo = NewProjectFixed;
      break;
    default:
      StepTwo = NewProjectBasic;
      break;
  }
  if (loading) return <Spinner />;
  return (
    <div>
      <h3>
        New Project <small>- {projectData.project_name || "client name"}</small>
      </h3>
      {step === 1 ? (
        <NewProjectBasic
          data={projectData}
          setData={setProjectData}
          setBuissModle={setBuissModle}
          setStep={setStep}
        />
      ) : (
        <StepTwo
          data={projectData}
          setData={setProjectData}
          createProject={createProject}
          setStep={setStep}
        />
      )}
    </div>
  );
}

export default connect(
  null,
  { addProject, getTeamMembers, getClients }
)(NewProject);
