import { push } from "connected-react-router";
import {
  emailVerificationFail,
  emailVerificationStart,
  emailVerificationSuccess
} from "../../../application/actions/actionCreators";
import { verifyEmailFactory } from "../../../application/actions/async/verifyEmail";
import { encodeMessageToUrl } from "../../../application/logic/encodeMessageToUrl";

const networkRequestMock = jest.fn().mockResolvedValue({ status: 200 });

it("should dispatch start action immediately", () => {
  const dispatch = jest.fn();
  verifyEmailFactory(networkRequestMock)("")(dispatch);
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0]).toEqual(emailVerificationStart());
});

it("should call network request with correct params", () => {
  const networkRequest = jest.fn().mockResolvedValue({ status: 200 });
  verifyEmailFactory(networkRequest)("some hash")(jest.fn());
  expect(networkRequest.mock.calls.length).toBe(1);
  expect(networkRequest.mock.calls[0][0]).toBe("/verifyEmail");
  expect(networkRequest.mock.calls[0][1]).toBe("post");
  expect(networkRequest.mock.calls[0][2]).toEqual({
    emailVerificationLink: "some hash"
  });
});

it("should call fail action on fail", async done => {
  const dispatch = jest.fn();
  const networkRequest = jest
    .fn()
    .mockResolvedValue({ status: 404, errorMessage: "something went wrong" });
  await verifyEmailFactory(networkRequest)("")(dispatch);
  expect(dispatch.mock.calls.length).toBe(2);
  expect(dispatch.mock.calls[1][0]).toEqual(
    emailVerificationFail(new Error("something went wrong"))
  );
  done();
});

it("should call success action on success and redirect", async done => {
  const dispatch = jest.fn();
  const networkRequest = jest.fn().mockResolvedValue({ status: 200 });
  await verifyEmailFactory(networkRequest)("")(dispatch);
  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[1][0]).toEqual(emailVerificationSuccess());
  expect(dispatch.mock.calls[2][0]).toEqual(
    push(
      encodeMessageToUrl({
        message: "Your email has been verified",
        isError: false
      })
    )
  );
  done();
});
