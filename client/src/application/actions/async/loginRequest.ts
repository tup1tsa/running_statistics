import { Dispatch } from "redux";
import { RegularLoginInfo } from "running_app_core";
import {
  NetworkRequest,
  networkRequest
} from "../../logic/network/networkRequest";
import { loginFail, loginStart } from "../actionCreators";
import { LoginViaToken, loginViaToken } from "./loginViaToken";

interface HelperFunctions {
  readonly networkRequest: NetworkRequest;
  readonly loginViaToken: LoginViaToken;
}
type LoginRequest = (
  userInfo: RegularLoginInfo
) => (dispatch: Dispatch) => void;
type LoginRequestFactory = (helperFunctions: HelperFunctions) => LoginRequest;

export const loginRequestFactory: LoginRequestFactory = helperFuncs => userInfo => async dispatch => {
  dispatch(loginStart());
  const result = await helperFuncs.networkRequest(
    "/loginViaPassword",
    "post",
    userInfo
  );
  if (result.errorMessage) {
    dispatch(loginFail(new Error(result.errorMessage)));
    return;
  }
  helperFuncs.loginViaToken()(dispatch);
};

export const loginRequest: LoginRequest = userInfo =>
  loginRequestFactory({ networkRequest, loginViaToken })(userInfo);
