import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { MESSAGES } from "../../common_files/config";
import {
  NetworkRequest,
  networkRequest
} from "../../logic/network/networkRequest";
import { SetMessageUrl, setMessageUrl } from "../../logic/setMessageUrl";
import {
  failRegistration,
  startRegistration,
  successRegistration
} from "../actionCreators";

interface UserInfo {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

type RegistrationRequest = (userInfo: UserInfo) => (dispatch: Dispatch) => void;
type RegistrationRequestFactory = (
  networkRequest: NetworkRequest,
  setMessageUrl: SetMessageUrl
) => RegistrationRequest;

export const registrationRequestFactory: RegistrationRequestFactory = (
  networkRequestFunc,
  setMessageUrlFunc
) => userInfo => async dispatch => {
  dispatch(startRegistration());
  const result = await networkRequestFunc("/registration", "post", userInfo);
  if (result.errorMessage) {
    dispatch(failRegistration(new Error(result.errorMessage)));
    return;
  }
  dispatch(successRegistration());
  dispatch(push(setMessageUrlFunc({ message: MESSAGES[9], isError: false })));
};

export const registrationRequest: RegistrationRequest = userInfo =>
  registrationRequestFactory(networkRequest, setMessageUrl)(userInfo);
