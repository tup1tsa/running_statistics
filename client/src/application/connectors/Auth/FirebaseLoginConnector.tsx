import { push } from "connected-react-router";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import FirebaseLogin, {
  FirebaseLoginDispatchProps,
  FirebaseLoginStateProps
} from "../../components/Auth/FirebaseLogin";
import { GlobalState } from "../../reducers/rootReducer";

type MapStateToProps = (state: GlobalState) => FirebaseLoginStateProps;
type MapDispatchToProps = (dispatch: Dispatch) => FirebaseLoginDispatchProps;

const mapStateToProps: MapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});
const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  redirectToMainPage: () => dispatch(push("/"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FirebaseLogin);
