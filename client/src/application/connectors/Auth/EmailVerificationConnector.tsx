import { connect } from "react-redux";
import { Dispatch } from "redux";
import { removeErrors } from "../../actions/actionCreators";
import verifyEmail from "../../actions/async/verifyEmail";
import EmailVerification, {
  EmailVerificationDispatchProps,
  EmailVerificationStateProps
} from "../../components/Auth/EmailVerification";
import { GlobalState } from "../../reducers/rootReducer";

type MapStateToProps = (state: GlobalState) => EmailVerificationStateProps;
type MapDispatchToProps = (
  dispatch: Dispatch
) => EmailVerificationDispatchProps;

const mapStateToProps: MapStateToProps = ({ emailVerification }) =>
  emailVerification;

const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  verify: hash => verifyEmail(hash)(dispatch),
  removeErrors: () => dispatch(removeErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailVerification);
