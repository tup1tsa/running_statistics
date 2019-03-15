import {
  changeRegistrationPassword,
  changeRegistrationPasswordConfirmation,
  failRegistration,
  startRegistration,
  successRegistration,
  toggleSaving
} from "../../application/actions/actionCreators";
import registrationReducer, {
  RegistrationState
} from "../../application/reducers/registrationReducer";

const defaultState: RegistrationState = {
  passwordFirstInput: "",
  passwordSecondInput: "",
  inProgress: false,
  error: null
};

it("should return the same state if action is not valid", () => {
  const state = {
    ...defaultState,
    passwordFirstInput: "ba"
  };
  const action = toggleSaving();
  expect(registrationReducer(state, action)).toEqual(state);
});

it("should change the password properly", () => {
  const action = changeRegistrationPassword("basba");
  expect(registrationReducer(defaultState, action)).toEqual({
    ...defaultState,
    passwordFirstInput: "basba"
  });
});

it("should change the password confirmation properly", () => {
  const action = changeRegistrationPasswordConfirmation("somma");
  expect(registrationReducer(defaultState, action)).toEqual({
    ...defaultState,
    passwordSecondInput: "somma"
  });
});

it("should stop registration progress and set registration error message on fail", () => {
  const error = new Error("bad weather");
  const action = failRegistration(error);
  const nextAction = registrationReducer(
    {
      ...defaultState,
      inProgress: true
    },
    action
  );
  expect(nextAction.error).toBe("bad weather");
  expect(nextAction.inProgress).toBe(false);
});

it("should clear password fields of registration fail", () => {
  const action = failRegistration(new Error("some internet error"));
  expect(
    registrationReducer(
      {
        ...defaultState,
        passwordFirstInput: "sob"
      },
      action
    ).passwordFirstInput
  ).toBe("");
  expect(
    registrationReducer(
      {
        ...defaultState,
        passwordSecondInput: "gma"
      },
      action
    ).passwordSecondInput
  ).toBe("");
});

it("should toggle registration on and remove error on start", () => {
  const action = startRegistration();
  expect(
    registrationReducer(
      {
        ...defaultState,
        inProgress: false,
        error: "bas"
      },
      action
    )
  ).toEqual({
    ...defaultState,
    error: null,
    inProgress: true
  });
});

it("should turn off registration progress and clear passwords on sucess registration", () => {
  const action = successRegistration();
  const state = {
    ...defaultState,
    inProgress: true,
    passwordFirstInput: "ba",
    passwordSecondInput: "basg"
  };
  expect(registrationReducer(state, action)).toEqual({
    ...defaultState,
    inProgress: false,
    passwordFirstInput: "",
    passwordSecondInput: ""
  });
});
