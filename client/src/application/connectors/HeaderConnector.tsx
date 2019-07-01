import { push } from "connected-react-router";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  Header,
  HeaderDispatchProps,
  HeaderStateProps
} from "../components/Header";
import { GlobalState } from "../reducers/rootReducer";

type MapStateToProps = (state: GlobalState) => HeaderStateProps;
type MapDispatchToProps = (dispatch: Dispatch) => HeaderDispatchProps;

const mapStateToProps: MapStateToProps = ({ user }) => ({
  ...user,
  // todo: Fix it
  isLoggingIn: false,
  name: user.displayName ? user.displayName : ""
});

const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  goToLoginPage: () => dispatch(push("/firebase-login")),
  goToRegistrationPage: () => dispatch(push("/firebase-login")),
  logout: () => firebase.auth().signOut()
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
