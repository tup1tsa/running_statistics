import { connect } from "react-redux";
import {
  AuthChecker,
  AuthCheckerProps
} from "../../components/Auth/AuthChecker";
import { GlobalState } from "../../reducers/rootReducer";

type MapStateToProps = (state: GlobalState) => AuthCheckerProps;
export const mapStateToProps: MapStateToProps = ({ user }) => ({
  loginErrorMessage: undefined,
  isLoggedIn: user.isLoggedIn,
  // todo: fix it. Is loggin in is not implemented
  isLoggingIn: false,
  isEmailVerified: user.emailVerified
});

export default connect(mapStateToProps)(AuthChecker);
