import { connect } from "react-redux";
import { Dispatch } from "redux";
import { changeInput } from "../actions/actionCreators";
import { registrationRequest } from "../actions/async/registrationRequest";
import { Registration, RegistrationProps } from "../components/Registration";
import { GlobalState } from "../reducers/rootReducer";

type MapStateToProps = (
  state: GlobalState
) => Pick<RegistrationProps, "login" | "email" | "password" | "passwordCopy">;

export const mapStateToProps: MapStateToProps = state => ({
  login: state.login,
  email: state.email,
  password: state.passwordFirstInput,
  passwordCopy: state.passwordSecondInput
});

type MapDispatchToProps = (
  dispatch: Dispatch
) => Pick<RegistrationProps, "changeInput" | "register">;

export const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  changeInput: payload => dispatch(changeInput(payload)),
  register: payload => registrationRequest(payload)(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
