import { push } from "connected-react-router";
import { Dispatch } from "redux";
import {
  ValidatePublicUserInfo,
  validatePublicUserInfo
} from "running_app_core";
import {
  NetworkRequest,
  networkRequest
} from "../../logic/network/networkRequest";
import { loginFail, loginStart, loginSuccess } from "../actionCreators";

export type LoginViaToken = () => (dispatch: Dispatch) => void;
type LoginViaTokenFactory = (
  networkRequest: NetworkRequest,
  validatePublicUserInfo: ValidatePublicUserInfo
) => LoginViaToken;

export const loginViaTokenFactory: LoginViaTokenFactory = (
  networkRequestFunc,
  validateFunc
) => () => async dispatch => {
  dispatch(loginStart());
  const result = await networkRequestFunc("/loginViaToken", "get");
  if (!validateFunc(result.data)) {
    dispatch(
      loginFail(
        new Error("Automatic authorization has failed. Try to login again")
      )
    );
    return;
  }
  if (result.status === 200) {
    dispatch(loginSuccess(result.data));
    dispatch(push("/"));
    return;
  }
  dispatch(loginFail(new Error(result.errorMessage)));
};

export const loginViaToken: LoginViaToken = () =>
  loginViaTokenFactory(networkRequest, validatePublicUserInfo)();
