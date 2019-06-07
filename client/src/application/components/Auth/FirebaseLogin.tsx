import firebase from "firebase/app";
import "firebase/auth";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const config = {
  apiKey: "AIzaSyCaKMWiGREUdaabzAMjN3SZBpXa4wwHFyo",
  authDomain: "running-stats-29393.firebaseapp.com"
};
firebase.initializeApp(config);

const uiConfig = {
  signInFlow: "popup",
  signInSuccessurl: "/firebase-login",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

class FirebaseLogin extends React.Component {
  public render() {
    return (
      <div>
        <h1>Log in</h1>
        <p>Please, sign-in</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}

export default FirebaseLogin;
