import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { MESSAGES, RegularRegistrationInfo } from "running_app_core";
import {
  EncodeMessageToUrl,
  encodeMessageToUrl
} from "../../logic/encodeMessageToUrl";
import {
  NetworkRequest,
  networkRequest
} from "../../logic/network/networkRequest";
import {
  registrationFail,
  registrationStart,
  registrationSuccess
} from "../actionCreators";

type RegistrationRequest = (
  userInfo: RegularRegistrationInfo
) => (dispatch: Dispatch) => void;
type RegistrationRequestFactory = (
  networkRequest: NetworkRequest,
  encodeMessageToUrl: EncodeMessageToUrl
) => RegistrationRequest;

export const registrationRequestFactory: RegistrationRequestFactory = (
  networkRequestFunc,
  encodeMessageToUrlFunc
) => userInfo => async dispatch => {
  dispatch(registrationStart());
  const result = await networkRequestFunc("/registration", "post", userInfo);
  if (result.errorMessage) {
    dispatch(registrationFail(new Error(result.errorMessage)));
    return;
  }
  dispatch(registrationSuccess());
  dispatch(
    push(
      encodeMessageToUrlFunc({
        message: MESSAGES.registrationSuccess,
        isError: false
      })
    )
  );
};

export const registrationRequest: RegistrationRequest = userInfo =>
  registrationRequestFactory(networkRequest, encodeMessageToUrl)(userInfo);
