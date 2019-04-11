import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  changeLoginEmail,
  changeLoginPassword,
  removeLoginError
} from "../../actions/actionCreators";
import { loginRequest } from "../../actions/async/loginRequest";
import Login, {
  LoginDispatchProps,
  LoginStateProps
} from "../../components/Auth/Login";
import { GlobalState } from "../../reducers/rootReducer";

type MapStateToProps = (state: GlobalState) => LoginStateProps;
const mapStateToProps: MapStateToProps = ({ login }) => ({
  email: login.email,
  password: login.password,
  errorMessage: login.errorMessage
});

type MapDispatchToProps = (dispatch: Dispatch) => LoginDispatchProps;
const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  changeEmail: email => dispatch(changeLoginEmail(email)),
  changePassword: password => dispatch(changeLoginPassword(password)),
  login: userInfo => loginRequest(userInfo)(dispatch),
  removeLoginError: () => dispatch(removeLoginError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
