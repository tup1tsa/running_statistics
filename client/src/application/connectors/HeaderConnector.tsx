import { push } from "connected-react-router";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { logout } from "../actions/actionCreators";
import {
  Header,
  HeaderDispatchProps,
  HeaderStateProps
} from "../components/Header";
import { GlobalState } from "../reducers/rootReducer";

type MapStateToProps = (state: GlobalState) => HeaderStateProps;
type MapDispatchToProps = (dispatch: Dispatch) => HeaderDispatchProps;

const mapStateToProps: MapStateToProps = ({ login, user }) => ({
  isUserLoggedIn: login.isLoggedIn,
  user
});

const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  goToLoginPage: () => dispatch(push("/login")),
  goToRegistrationPage: () => dispatch(push("/registration")),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
