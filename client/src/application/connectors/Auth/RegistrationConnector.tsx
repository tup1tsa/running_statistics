import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  changeRegistrationEmail,
  changeRegistrationName,
  changeRegistrationPassword,
  changeRegistrationPasswordConfirmation,
  removeErrors
} from "../../actions/actionCreators";
import { registrationRequest } from "../../actions/async/registrationRequest";
import {
  Registration,
  RegistrationProps
} from "../../components/Auth/Registration";
import { GlobalState } from "../../reducers/rootReducer";

type MapStateToProps = (
  state: GlobalState
) => Pick<
  RegistrationProps,
  "name" | "email" | "password" | "passwordCopy" | "error" | "inProgress"
>;

export const mapStateToProps: MapStateToProps = ({ user, registration }) => ({
  name: user.name,
  email: user.email,
  password: registration.passwordFirstInput,
  passwordCopy: registration.passwordSecondInput,
  error: registration.error,
  inProgress: registration.inProgress
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
  | "removeRegistrationError"
>;

export const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  changeEmail: payload => dispatch(changeRegistrationEmail(payload)),
  changeName: payload => dispatch(changeRegistrationName(payload)),
  changePassword: payload => dispatch(changeRegistrationPassword(payload)),
  changePasswordConfirmation: payload =>
    dispatch(changeRegistrationPasswordConfirmation(payload)),
  register: payload => registrationRequest(payload)(dispatch),
  removeRegistrationError: () => dispatch(removeErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
