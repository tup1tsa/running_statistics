import {
  showSavingMessage,
  stopGps
} from "../../application/actions/actionCreators";
import { showSavingMessageReducer } from "../../application/reducers/showSavingMessageReducer";

const defaultState = {
  savingInProgress: true,
  savingError: "some error",
  savingSuccessMessage: null
};

it("should not change state if action is incorrect", () => {
  expect(showSavingMessageReducer({ ...defaultState }, stopGps())).toEqual(
    defaultState
  );
});

it("should toggle saving, turn off error and set message", () => {
  const action = showSavingMessage("success");
  expect(showSavingMessageReducer({ ...defaultState }, action)).toEqual({
    savingInProgress: false,
    savingError: null,
    savingSuccessMessage: "success"
  });
});
