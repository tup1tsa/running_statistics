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
    const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
      if (user) {
        const {
          displayName,
          email,
          emailVerified,
          photoURL,
          uid,
          phoneNumber,
          providerData
        } = user;
        // tslint:disable-next-line no-console
        console.log(
          `name is ${displayName}\n email is ${email} \n email is verified ${emailVerified} \n photo url is ${photoURL} \n uid is ${uid} \n phone number is ${phoneNumber} \n providerData is`
        );
        // tslint:disable-next-line no-console
        console.log(providerData);
      }
    });
    return (
      <div>
        <h1>Log in</h1>
        <p>Please, sign-in</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    );
  }
}

export default FirebaseLogin;
