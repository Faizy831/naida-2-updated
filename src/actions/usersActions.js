import {
  GET_USERS,
  ADD_TEAM_MEMBER,
  GET_TEAM_MEMBERS,
  GET_TEAM_MEMBER,
  UPDATE_TEAM_MEMBER
} from "./types";
import history from "../history";
export const getUsers = () => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("users")
    .get()
    .then(snapshot => {
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      dispatch({
        type: GET_USERS,
        payload: users
      });
    });
};
export const getTeamMembers = () => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("team")
    .get()
    .then(snapshot => {
      const team = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      dispatch({
        type: GET_TEAM_MEMBERS,
        payload: team
      });
    });
};

export const createTeamMember = ({
  name,
  email,
  role,
  team,
  department,
  toggl = true,
  asana = true,
  greeninvoice = true
}) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  return firestore
    .collection("team")
    .add({ name, email, role, team, department, toggl, asana, greeninvoice })
    .then(doc => {
      dispatch({
        type: ADD_TEAM_MEMBER,
        payload: {
          id: doc.id,
          name,
          email,
          role,
          team,
          department,
          toggl,
          asana,
          greeninvoice
        }
      });

      history.push("/settings/team");
    });
};
export const updateTeamMember = (
  id,
  {
    name,
    email,
    role,
    team,
    department,
    toggl = true,
    asana = true,
    greeninvoice = true
  }
) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  return firestore
    .collection("team")
    .doc(id)
    .update({ name, email, role, team, department, toggl, asana, greeninvoice })
    .then(doc => {
      dispatch({
        type: UPDATE_TEAM_MEMBER,
        payload: {
          id,
          name,
          email,
          role,
          team,
          department,
          toggl,
          asana,
          greeninvoice
        }
      });

      history.push("/settings/team");
    });
};
export const getTeamMember = id => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("team")
    .doc(id)
    .get()
    .then(doc => {
      dispatch({
        type: GET_TEAM_MEMBER,
        payload: {
          id: doc.id,
          ...doc.data()
        }
      });
    });
};
