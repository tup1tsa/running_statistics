import { connect } from "react-redux";
import { Dispatch } from "redux";
import { loginViaToken } from "../actions/async/loginViaToken";
import { AutoLogin, AutoLoginProps } from "../components/AutoLogin";

type MapDispatchToProps = (dispatch: Dispatch) => AutoLoginProps;

export const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  login: () => loginViaToken()(dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(AutoLogin);
