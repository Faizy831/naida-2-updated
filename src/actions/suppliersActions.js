import {
  GET_SUPPLIERS,
  ADD_SUPPLIER,
  GET_SUPPLIER,
  EDIT_SUPPLIER
} from "./types";
import history from "../history";
import { addClient as addGIClient } from "../utils/greenInvoice";
export const getSuppliers = () => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("suppliers")
    .get()
    .then(snapshot => {
      const suppliers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      dispatch({
        type: GET_SUPPLIERS,
        payload: suppliers
      });
    });
};
export const getSupplier = id => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("suppliers")
    .doc(id)
    .get()
    .then(async doc => {
      const supplier = { id: doc.id, ...doc.data() };
      dispatch({
        type: GET_SUPPLIER,
        payload: supplier
      });
    });
};

export const addSupplier = newSupplier => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const GIClient = await addGIClient(newSupplier);
  return firestore
    .collection("suppliers")
    .add({ ...newSupplier, greeninvoiceID: GIClient.id })
    .then(snapshot => {
      dispatch({
        type: ADD_SUPPLIER,
        payload: { id: snapshot.id, ...newSupplier }
      });
      history.push("/suppliers");
    });
};

export const editSupplier = (id, updSupplier) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("suppliers")
    .doc(id)
    .update(updSupplier)
    .then(doc => {
      dispatch({
        type: EDIT_SUPPLIER,
        payload: { id, ...updSupplier }
      });
      history.push("/suppliers");
    });
};
