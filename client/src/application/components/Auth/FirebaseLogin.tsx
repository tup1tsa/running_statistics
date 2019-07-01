import firebase from "firebase/app";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

interface FactoryProps {
  readonly auth: firebase.auth.Auth;
  readonly uiConfig: firebaseui.auth.Config;
}

export interface FirebaseLoginStateProps {
  readonly isLoggedIn: boolean;
}
export interface FirebaseLoginDispatchProps {
  readonly redirectToMainPage: () => void;
}

type Props = FirebaseLoginStateProps &
  FirebaseLoginDispatchProps &
  FactoryProps;

export class FirebaseLoginFactory extends React.Component<Props> {
  public render() {
    const { auth, uiConfig, isLoggedIn, redirectToMainPage } = this.props;
    if (isLoggedIn) {
      redirectToMainPage();
      return null;
    }
    return (
      <div>
        <h1>Log in</h1>
        <p>Please, sign-in</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    );
  }
}

const FirebaseLogin = (
  props: FirebaseLoginStateProps & FirebaseLoginDispatchProps
) => (
  <FirebaseLoginFactory
    {...props}
    uiConfig={{
      signInFlow: "popup",
      signInSuccessUrl: "/firebase-login",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    }}
    auth={firebase.auth()}
  />
);

export default FirebaseLogin;
