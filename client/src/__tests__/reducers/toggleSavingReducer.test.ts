import {
  addGpsPosition,
  toggleSaving
} from "../../application/actions/actionCreators";
import { getTestPosition } from "../../application/common_files/testHelpers";
import { toggleSavingReducer } from "../../application/reducers/toggleSavingReducer";

const defaultState = {
  raceInProgress: true,
  savingInProgress: false
};

it("should not change state if action is incorrect", () => {
  const action = addGpsPosition(
    getTestPosition({
      latitude: 33,
      longitude: 32,
      timestamp: 33
    })
  );
  expect(toggleSavingReducer(defaultState, action)).toEqual(defaultState);
});

it("should turn on saving and turn off race in progress", () => {
  const action = toggleSaving();
  expect(toggleSavingReducer(defaultState, action)).toEqual({
    raceInProgress: false,
    savingInProgress: true
  });
});

it("should turn off saving and turn off race in progress", () => {
  const action = toggleSaving();
  expect(
    toggleSavingReducer(
      {
        raceInProgress: true,
        savingInProgress: true
      },
      action
    )
  ).toEqual({
    raceInProgress: false,
    savingInProgress: false
  });
});
