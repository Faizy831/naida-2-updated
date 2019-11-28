import { GET_PAYMENTS, ADD_PAYMENT, GET_PAYMENT, EDIT_PAYMENT } from "./types";
import history from "../history";
import parse from "date-fns/parse";
import toDate from "date-fns/toDate";
export const getPayments = () => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("payments")
    .get()
    .then(snapshot => {
      const payments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      dispatch({
        type: GET_PAYMENTS,
        payload: payments
      });
    });
};

export const getPayment = id => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("payments")
    .doc(id)
    .get()
    .then(async doc => {
      const payment = { id: doc.id, ...doc.data() };
      dispatch({
        type: GET_PAYMENT,
        payload: payment
      });
    });
};

export const addPayment = newPayment => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const state = getState();

  newPayment.project_name = state.projects.projects.find(
    project => project.id === newPayment.project_id
  ).asanaData.name;
  newPayment.status = "scheduled";
  return firestore
    .collection("payments")
    .add(newPayment)
    .then(snapshot => {
      dispatch({
        type: ADD_PAYMENT,
        payload: { id: snapshot.id, ...newPayment }
      });
      history.push("/payments");
    });
};

export const editPayment = (id, updPayment) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("payments")
    .doc(id)
    .update(updPayment)
    .then(doc => {
      dispatch({
        type: EDIT_PAYMENT,
        payload: { id, ...updPayment }
      });
      history.push("/payments");
    });
};
