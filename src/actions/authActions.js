import { signInWithGoogle, auth, firestore as db } from "../config/firebase";
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  REGISTER_ERROR,
  RECOVER_EMAIL_SENT,
  RECOVER_EMAIL_ERROR,
  GET_GREENINVOICE_TOKEN
} from "./types";
import { verifyUser as verifyTogglUser } from "../utils/toggl";
import { verifyUser as verifyAssanaUser } from "../utils/asana";

export const googleLogin = () => async dispatch => {
  const res = await signInWithGoogle();

  const teamRes = await db
    .collection("team")
    .where("email", "==", res.user.email.toLowerCase())
    .get();

  if (teamRes.empty) {
    await auth.signOut();
    return dispatch({
      type: LOGIN_ERROR,
      payload: {
        message: "User does Not Exist"
      }
    });
  } else {
    // const teamMember = { id: teamRes.docs[0].id, ...teamRes.docs[0].data() };
    // const toggl = await verifyTogglUser(teamMember.email);
    // if (!toggl) {
    //   await auth.signOut();
    //   return dispatch({
    //     type: LOGIN_ERROR,
    //     payload: {
    //       message: "User is not in Toggl Team , please contact your admin"
    //     }
    //   });
    // } else {
    //   await db
    //     .collection("team")
    //     .doc(teamMember.id)
    //     .update({
    //       togglID: toggl.id
    //     });
    // }
    // const asana = await verifyAssanaUser(teamMember.email);
    // if (!asana) {
    //   await auth.signOut();
    //   return dispatch({
    //     type: LOGIN_ERROR,
    //     payload: {
    //       message: "User is not in Asana Team , please contact your admin"
    //     }
    //   });
    // } else {
    //   await db
    //     .collection("team")
    //     .doc(teamMember.id)
    //     .update({
    //       asanaID: asana.gid
    //     });
    // }
  }

  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      firstName: res.additionalUserInfo.profile.given_name,
      lastName: res.additionalUserInfo.profile.family_name,
      email: res.additionalUserInfo.profile.email
    }
  });
};

export const login = ({ email, password }) => async dispatch => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user
      });
    })
    .catch(err => {
      dispatch({
        type: LOGIN_ERROR,
        payload: err
      });
    });
};
export const register = ({ firstName, lastName, email, password }) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    // save to firebase

    await res.user.updateProfile({ displayName: `${firstName} ${lastName}` });

    await db
      .collection("users")
      .doc(res.user.uid)
      .set({
        firstName,
        lastName,
        email
      });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { firstName, lastName, email }
    });
  } catch (error) {
    dispatch({
      type: REGISTER_ERROR,
      payload: error
    });
  }
};
export const logout = () => dispatch => {
  auth.signOut().then(
    dispatch({
      type: LOGOUT
    })
  );
};
export const sendRecoverCode = email => dispatch => {
  auth
    .sendPasswordResetEmail(email)
    .then(res => {
      dispatch({
        type: RECOVER_EMAIL_SENT,
        payload: {
          error: false,
          message: "Reset link Sent"
        }
      });
    })
    .catch(err =>
      dispatch({
        type: RECOVER_EMAIL_ERROR,
        payload: {
          error: true,
          message: err.message
        }
      })
    );
};

export const verifyUser = user => async dispatch => {
  if (user) {
    // const asana = await verifyAssanaUser(user.email);
    // const toggl = await verifyTogglUser(user.email);

    // if (asana && toggl)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user
    });
  }
};
