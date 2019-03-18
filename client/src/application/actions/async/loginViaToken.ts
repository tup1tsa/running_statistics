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

type LoginRequest = () => (dispatch: Dispatch) => void;
type LoginRequestFactory = (
  networkRequest: NetworkRequest,
  validatePublicUserInfo: ValidatePublicUserInfo
) => LoginRequest;

export const loginRequestFactory: LoginRequestFactory = (
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

export const loginRequest: LoginRequest = () =>
  loginRequestFactory(networkRequest, validatePublicUserInfo)();
