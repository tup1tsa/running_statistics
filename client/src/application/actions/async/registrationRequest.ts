import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { RegularRegistrationInfo } from "running_app_core";
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
  let message = "User was registered";
  if (typeof result.data === "string") {
    message = result.data;
  }
  dispatch(
    push(
      encodeMessageToUrlFunc({
        message,
        isError: false
      })
    )
  );
};

export const registrationRequest: RegistrationRequest = userInfo =>
  registrationRequestFactory(networkRequest, encodeMessageToUrl)(userInfo);
