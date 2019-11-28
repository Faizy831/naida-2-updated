import { GET_EXPENSES, ADD_EXPENSE, GET_EXPENSE, EDIT_EXPENSE } from "./types";
import history from "../history";

export const getExpenses = () => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("expenses")
    .get()
    .then(snapshot => {
      const expenses = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      dispatch({
        type: GET_EXPENSES,
        payload: expenses
      });
    });
};
export const getExpense = id => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("expenses")
    .doc(id)
    .get()
    .then(async doc => {
      const expense = { id: doc.id, ...doc.data() };
      dispatch({
        type: GET_EXPENSE,
        payload: expense
      });
    });
};

export const addExpense = newExpense => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const storageRef = firebase.storage().ref("/attachments");
  const state = getState();

  // if attachments : upload it
  if (newExpense.attachment) {
    const attachmentImage = await storageRef
      .child(newExpense.attachment.name)
      .put(newExpense.attachment);
    newExpense.attachment = await attachmentImage.ref.getDownloadURL();
  }
  newExpense.client_name = state.clients.clients.find(
    client => client.id === newExpense.client_id
  ).official_name;
  newExpense.supplier_name = state.suppliers.suppliers.find(
    supplier => supplier.id === newExpense.supplier_id
  ).official_name;
  newExpense.project_name = state.projects.projects.find(
    project => project.id === newExpense.project_id
  ).asanaData.name;

  return firestore
    .collection("expenses")
    .add(newExpense)
    .then(snapshot => {
      dispatch({
        type: ADD_EXPENSE,
        payload: { id: snapshot.id, ...newExpense }
      });
      history.push("/expenses");
    });
};

export const editExpense = (id, updExpense) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const storageRef = firebase.storage().ref("/attachments");

  // if attachments : upload it
  if (updExpense.newAttachment) {
    const attachmentImage = await storageRef
      .child(updExpense.newAttachment.name)
      .put(updExpense.newAttachment);
    updExpense.attachment = await attachmentImage.ref.getDownloadURL();
    delete updExpense.newAttachment;
  }
  return firestore
    .collection("expenses")
    .doc(id)
    .update(updExpense)
    .then(doc => {
      dispatch({
        type: EDIT_EXPENSE,
        payload: { id, ...updExpense }
      });
      history.push("/expenses");
    });
};
