import firebase from "firebase/app";
import { Dispatch } from "redux";
import { loginSuccess, logout } from "../actionCreators";

type FirebaseCallbackHandler = (
  auth: firebase.auth.Auth
) => (dispatch: Dispatch) => void;

const firebaseCallbackHandler: FirebaseCallbackHandler = auth => dispatch => {
  auth.onAuthStateChanged(user => {
    if (!user) {
      dispatch(logout());
      return;
    }
    dispatch(loginSuccess(user));
  });
};

export default firebaseCallbackHandler;
