import firebase from "firebase/app";
import FirebaseAuthMock from "../../../__mocks__/FirebaseAuth";
import firebaseAuth from "../../../application/actions/async/firebaseAuth";

const wait = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 0);
  });

it("should dispatch login action on success firebase callback", async done => {
  const firebaseAuthMock = (new FirebaseAuthMock() as unknown) as firebase.auth.Auth;
  const user = {
    displayName: "Sasha"
  } as firebase.User;
  const dispatch = jest.fn();
  firebaseAuth(firebaseAuthMock)(dispatch);
  await wait();
  firebaseAuthMock.updateCurrentUser(user);
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0]).toEqual({
    type: "LOGIN_SUCCESS",
    payload: user
  });
  done();
});

it("should dispatch logout action on fail firebase callback", async done => {
  const firebaseAuthMock = (new FirebaseAuthMock() as unknown) as firebase.auth.Auth;
  const dispatch = jest.fn();
  firebaseAuth(firebaseAuthMock)(dispatch);
  await wait();
  firebaseAuthMock.updateCurrentUser(null);
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0]).toEqual({
    type: "LOGOUT"
  });
  done();
});
