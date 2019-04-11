import { connect } from "react-redux";
import {
  AuthChecker,
  AuthCheckerProps
} from "../../components/Auth/AuthChecker";
import { GlobalState } from "../../reducers/rootReducer";

type MapStateToProps = (state: GlobalState) => AuthCheckerProps;
export const mapStateToProps: MapStateToProps = state => ({
  loginErrorMessage: state.login.errorMessage,
  isLoggedIn: state.login.isLoggedIn,
  isLoggingIn: state.login.inProgress,
  isEmailVerified: state.user.isEmailVerified
});

export default connect(mapStateToProps)(AuthChecker);
