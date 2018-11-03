import { savingError, stopGps } from "../../application/actions/actionCreators";
import { savingErrorReducer } from "../../application/reducers/savingErrorReducer";

const defaultState = {
  savingInProgress: true,
  savingError: "some error",
  savingSuccessMessage: "success"
};

it("should not change state if action is incorrect", () => {
  const action = stopGps();
  expect(savingErrorReducer({ ...defaultState }, action)).toEqual(defaultState);
});

it("should turn off saving setting, remove success message and place error", () => {
  const errorMessage = "something went wrong";
  const action = savingError(new Error(errorMessage));
  expect(savingErrorReducer({ ...defaultState }, action)).toEqual({
    savingInProgress: false,
    savingError: errorMessage,
    savingSuccessMessage: null
  });
});
