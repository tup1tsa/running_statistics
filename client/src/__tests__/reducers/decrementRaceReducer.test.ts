import {
  decrementRace,
  stopGps
} from "../../application/actions/actionCreators";
import { getTestRaces } from "../../application/common_files/testHelpers";
import { decrementRaceReducer } from "../../application/reducers/decrementRaceReducer";
const defaultState = {
  downloadedRaces: getTestRaces(),
  currentRaceIndex: 0
};

it("should not change state if action is incorrect", () => {
  const action = stopGps();
  expect(decrementRaceReducer(defaultState, action)).toEqual(defaultState);
});

it("should decrement races properly", () => {
  const firstRaceState = { ...defaultState, currentRaceIndex: 0 };
  const middleRaceState = { ...defaultState, currentRaceIndex: 1 };
  const lastRaceState = {
    ...defaultState,
    currentRaceIndex: 2
  };
  const action = decrementRace();
  expect(decrementRaceReducer(lastRaceState, action)).toEqual(middleRaceState);
  expect(decrementRaceReducer(middleRaceState, action)).toEqual(firstRaceState);
  expect(decrementRaceReducer(firstRaceState, action)).toEqual(lastRaceState);
});
