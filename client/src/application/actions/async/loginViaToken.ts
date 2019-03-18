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

type LoginViaToken = () => (dispatch: Dispatch) => void;
type LoginViaTokenFactory = (
  networkRequest: NetworkRequest,
  validatePublicUserInfo: ValidatePublicUserInfo
) => LoginViaToken;

export const loginViaTokenFactory: LoginViaTokenFactory = (
  networkRequestFunc,
  validateFunc
) => () => async dispatch => {
  dispatch(loginStart());
  const result = await networkRequestFunc("/login", "get");
  if (!validateFunc(result.data)) {
    dispatch(
      loginFail(new Error("user data is corrupted. Try to login again"))
    );
    return;
  }
  if (result.status === 200) {
    dispatch(loginSuccess(result.data));
    return;
  }
  dispatch(loginFail(new Error(result.errorMessage)));
};

export const loginViaToken: LoginViaToken = () =>
  loginViaTokenFactory(networkRequest, validatePublicUserInfo)();
