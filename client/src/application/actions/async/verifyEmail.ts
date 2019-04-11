import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { encodeMessageToUrl } from "../../logic/encodeMessageToUrl";
import {
  NetworkRequest,
  networkRequest
} from "../../logic/network/networkRequest";
import {
  emailVerificationFail,
  emailVerificationStart,
  emailVerificationSuccess
} from "../actionCreators";

export type VerifyEmail = (hash: string) => (dispatch: Dispatch) => void;
type VerifyEmailFactory = (networkRequest: NetworkRequest) => VerifyEmail;

export const verifyEmailFactory: VerifyEmailFactory = networkRequestFunc => hash => async dispatch => {
  dispatch(emailVerificationStart());

  const result = await networkRequestFunc("/verifyEmail", "post", {
    emailVerificationLink: hash
  });
  if (result.errorMessage) {
    dispatch(emailVerificationFail(new Error(result.errorMessage)));
    return;
  }
  dispatch(emailVerificationSuccess());
  dispatch(
    push(
      encodeMessageToUrl({
        message: "Your email has been verified",
        isError: false
      })
    )
  );
};

const verifyEmail: VerifyEmail = hash =>
  verifyEmailFactory(networkRequest)(hash);

export default verifyEmail;
