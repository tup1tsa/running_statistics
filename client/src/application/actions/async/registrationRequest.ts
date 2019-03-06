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
  failRegistration,
  startRegistration,
  successRegistration
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
  dispatch(startRegistration());
  const result = await networkRequestFunc("/registration", "post", userInfo);
  if (result.errorMessage) {
    dispatch(failRegistration(new Error(result.errorMessage)));
    return;
  }
  dispatch(successRegistration());
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
