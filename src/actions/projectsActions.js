import {
  GET_PROJECTS,
  ADD_PROJECT,
  GET_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT
} from "./types";
import history from "../history";
import {
  createProject as createAsanaProject,
  createTask as createAsanaTask,
  client as asana,
  deleteTask as deleteAsanaTask,
  deleteProject as deleteAsanaProject
} from "../utils/asana";
import {
  createProject as createTogglProject,
  createTask as createTogglTask,
  getProjectTasks as getTogglProjectTasks,
  toggl,
  getProjectDetails as getTogglProjectDetails,
  deleteProject as deleteTogglProject
} from "../utils/toggl";

export const getProjects = () => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("projects")
    .get()
    .then(async snapshot => {
      const projectsP = snapshot.docs.map(async doc => {
        const project = { id: doc.id, ...doc.data() };
        try {
          project.asanaData = await asana.projects.findById(
            project.asanaProjectID
          );
          return project;
        } catch (error) {
          return null;
        }
      });

      const projects = (await Promise.all(projectsP)).filter(p => p);
      dispatch({
        type: GET_PROJECTS,
        payload: projects
      });
    });
};
export const getProject = id => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("projects")
    .doc(id)
    .get()
    .then(async doc => {
      let project = { id: doc.id, ...doc.data() };
      const phasesDoc = await doc.ref.collection("phases").get();
      const phasesP = phasesDoc.docs.map(async phaseDoc => {
        const phase = phaseDoc.data();
        const res = await getTogglProjectDetails(phase.togglTaskID);
        return { toggl: res, ...phase };
      });
      const tasks = await Promise.all(phasesP);
      project.tasks = tasks || [];
      dispatch({
        type: GET_PROJECT,
        payload: project
      });
    });
};

export const addProject = newProject => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const storageRef = firebase.storage().ref("/attachments");

  const {
    project_name: name,
    due_date,
    comments: notes,
    phases,
    owner,
    client_id
  } = newProject;

  // if attachments : upload it
  if (newProject.attachment) {
    const attachmentImage = await storageRef
      .child(newProject.attachment.name)
      .put(newProject.attachment);
    newProject.attachment = await attachmentImage.ref.getDownloadURL();
  }

  // create asana projects
  const asanaProject = await createAsanaProject({
    name,
    notes,
    due_on: due_date,
    owner
  });
  const asanaProjectID = asanaProject.gid;

  // // create toggl Project
  // const togglProject = await createTogglProject({ name }, client_id);
  // const togglProjectID = togglProject.id;

  // create nadia project
  const project = {
    ...newProject,
    asanaProjectID
  };

  const newProjectRef = await firestore.collection("projects").add(project);

  const tasksP = phases.map(async phase => {
    const asanaTask = await createAsanaTask({
      projectID: asanaProjectID,
      data: phase
    });

    const togglTask = await createTogglProject(phase, name, client_id);
    await firestore
      .collection("projects")
      .doc(newProjectRef.id)
      .collection("phases")
      .add({
        asanaTaskID: asanaTask.gid,
        togglTaskID: togglTask.id,
        ...phase
      });
  });
  await Promise.all(tasksP);

  dispatch({
    type: ADD_PROJECT,
    payload: { id: newProjectRef.id, ...project }
  });
  history.push("/projects");
};

export const editProject = (id, updProject) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("projects")
    .doc(id)
    .update(updProject)
    .then(doc => {
      dispatch({
        type: EDIT_PROJECT,
        payload: { id, ...updProject }
      });
    });
};

export const updatePhases = phases => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const state = getState();
  const users = state.users.team;
  const project = state.projects.currentProject;
  const firestore = getFirestore();

  const tasksP = phases.map(async phase => {
    phase.owner = users.find(user => user.id === phase.owner);
    const [asanaTask, togglTask] = await Promise.all([
      createAsanaTask({
        projectID: project.asanaProjectID,
        data: phase
      }),
      createTogglProject(phase, project.project_name, project.client_id),
      firestore
        .collection("projects")
        .doc(project.id)
        .update({
          phases: firestore.FieldValue.arrayUnion(phase)
        })
    ]);

    return firestore
      .collection("projects")
      .doc(project.id)
      .collection("phases")
      .add({
        asanaTaskID: asanaTask.gid,
        togglTaskID: togglTask.id,
        ...phase
      });
  });
  await Promise.all(tasksP);

  dispatch({
    type: EDIT_PROJECT,
    payload: { ...project }
  });
};

export const deleteProject = id => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const projectdoc = await firestore
    .collection("projects")
    .doc(id)
    .get();
  const project = { id: projectdoc.id, ...projectdoc.data() };
  console.log(project);

  await deleteAsanaProject(+project.asanaProjectID);

  const phasesDoc = await firestore
    .collection("projects")
    .doc(id)
    .collection("phases")
    .get();

  const phases = phasesDoc.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  await Promise.all(phases.map(phase => deleteTogglProject(phase.togglTaskID)));

  return firestore
    .collection("projects")
    .doc(id)
    .delete()
    .then(() =>
      dispatch({
        type: DELETE_PROJECT,
        payload: id
      })
    )
    .catch();
};
