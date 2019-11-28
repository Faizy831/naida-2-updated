import { GET_PRESETS, GET_ALERTS } from "./types";
import history from "../history";

export const getPresets = () => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("settings")
    .doc("settings")
    .get()
    .then(res => {
      if (res.exists) {
        const settings = { id: res.id, ...res.data() };
        dispatch({
          type: GET_PRESETS,
          payload: settings.presets
        });
      } else {
        dispatch({
          type: GET_PRESETS,
          payload: {}
        });
      }
    });
};
export const updatePresets = newPresets => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("settings")
    .doc("settings")
    .update({ presets: newPresets })
    .then(res => {
      dispatch({
        type: GET_PRESETS,
        payload: newPresets
      });
    });
};
export const getAlerts = () => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("settings")
    .doc("settings")
    .get()
    .then(res => {
      if (res.exists) {
        const settings = { id: res.id, ...res.data() };
        dispatch({
          type: GET_ALERTS,
          payload: settings.alerts || {}
        });
      } else {
        dispatch({
          type: GET_ALERTS,
          payload: {}
        });
      }
    });
};
export const updateAlerts = newAlerts => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  console.log(newAlerts);
  const firestore = getFirestore();
  return firestore
    .collection("settings")
    .doc("settings")
    .update({ alerts: newAlerts || {} })
    .then(res => {
      dispatch({
        type: GET_ALERTS,
        payload: newAlerts
      });
    });
};
