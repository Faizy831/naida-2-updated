import { combineReducers } from "redux";
import authReducer from "./authReducer";
import clientsReducer from "./clientsReducer";
// import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import projectsReducer from "./projectsReducer";
import usersReducer from "./usersReducer";
import settingsReducer from "./settingsReducer";
import suppliersReducer from "./suppliersReducer";
import expensesReducer from "./expensesReducer";
import paymentsReducer from "./paymentsReducer";
export default combineReducers({
  auth: authReducer,
  clients: clientsReducer,
  projects: projectsReducer,
  users: usersReducer,
  settings: settingsReducer,
  // firestore: firestoreReducer, // for realtime data
  firebase: firebaseReducer,
  suppliers: suppliersReducer,
  expenses: expensesReducer,
  payments: paymentsReducer
});
