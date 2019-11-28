import { GET_CLIENTS, ADD_CLIENT, GET_CLIENT, EDIT_CLIENT } from "./types";
import history from "../history";
import {
  createClient as createTogglClient,
  getTogglClientProjects
} from "../utils/toggl";

import { addClient as addGIClient } from "../utils/greenInvoice";
import { getProject as getAsanaProject } from "../utils/asana";

export const getClients = () => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("clients")
    .get()
    .then(async snapshot => {
      const clientP = snapshot.docs.map(async doc => {
        const client = { id: doc.id, ...doc.data() };

        const projectsRes = await firestore
          .collection("projects")
          .where("client_id", "==", client.togglID + "")
          .get();

        const projects = projectsRes.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        const asanaProjects = (await Promise.all(
          projects.map(async project => {
            try {
              return await getAsanaProject(project.asanaProjectID);
            } catch (error) {
              return null;
            }
          })
        )).filter(e => e);
        client.projects = asanaProjects;
        return client;
      });
      const clients = await Promise.all(clientP);
      dispatch({
        type: GET_CLIENTS,
        payload: clients
      });
    });
};
export const getClient = id => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("clients")
    .doc(id)
    .get()
    .then(async doc => {
      const client = { id: doc.id, ...doc.data() };
      const projectsRes = await firestore
        .collection("projects")
        .where("client_id", "==", client.togglID + "")
        .get();

      const projects = projectsRes.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      const asanaProjects = await Promise.all(
        projects.map(
          async project => await getAsanaProject(project.asanaProjectID)
        )
      );
      client.projects = asanaProjects;

      dispatch({
        type: GET_CLIENT,
        payload: client
      });
    });
};
export const addClient = newClient => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const togglClient = await createTogglClient({
    name: newClient.official_name
  });
  newClient.togglID = togglClient.id;
  const firestore = getFirestore();

  const GIclient = await addGIClient(newClient);
  newClient["GIclientID"] = GIclient.id ;
  console.log("new data client",newClient)
  return firestore
    .collection("clients")
    .add(newClient)
    .then(snapshot => {
      dispatch({
        type: ADD_CLIENT,
        payload: { id: snapshot.id, ...newClient, greeninvoiceID: GIclient.id }
      });
      history.push("/clients");
    });
};

export const editClient = (id, updClient) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("clients")
    .doc(id)
    .update(updClient)
    .then(doc => {
      dispatch({
        type: EDIT_CLIENT,
        payload: { id, ...updClient }
      });
    });
};
