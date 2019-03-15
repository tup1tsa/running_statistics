import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  changeRegistrationEmail,
  changeRegistrationName,
  changeRegistrationPassword,
  changeRegistrationPasswordConfirmation
} from "../actions/actionCreators";
import { registrationRequest } from "../actions/async/registrationRequest";
import { Registration, RegistrationProps } from "../components/Registration";
import { GlobalState } from "../reducers/rootReducer";

type MapStateToProps = (
  state: GlobalState
) => Pick<RegistrationProps, "name" | "email" | "password" | "passwordCopy">;

export const mapStateToProps: MapStateToProps = ({ user, registration }) => ({
  name: user.name,
  email: user.email,
  password: registration.passwordFirstInput,
  passwordCopy: registration.passwordSecondInput
});

type MapDispatchToProps = (
  dispatch: Dispatch
) => Pick<
  RegistrationProps,
  | "changeName"
  | "changePassword"
  | "changePasswordConfirmation"
  | "changeEmail"
  | "register"
>;

export const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  changeEmail: payload => dispatch(changeRegistrationEmail(payload)),
  changeName: payload => dispatch(changeRegistrationName(payload)),
  changePassword: payload => dispatch(changeRegistrationPassword(payload)),
  changePasswordConfirmation: payload =>
    dispatch(changeRegistrationPasswordConfirmation(payload)),
  register: payload => registrationRequest(payload)(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);