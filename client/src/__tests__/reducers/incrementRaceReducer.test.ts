import {
  incrementRace,
  stopGps
} from "../../application/actions/actionCreators";
import { getTestRaces } from "running_app_core";
import { incrementRaceReducer } from "../../application/reducers/incrementRaceReducer";

const defaultState = {
  downloadedRaces: getTestRaces(),
  currentRaceIndex: 0
};

it("should not change state if action is incorrect", () => {
  const action = stopGps();
  expect(incrementRaceReducer(defaultState, action)).toEqual(defaultState);
});

it("should increment races properly", () => {
  const firstRaceState = { ...defaultState, currentRaceIndex: 0 };
  const middleRaceState = { ...defaultState, currentRaceIndex: 1 };
  const lastRaceState = {
    ...defaultState,
    currentRaceIndex: 2
  };
  const action = incrementRace();
  expect(incrementRaceReducer(firstRaceState, action)).toEqual(middleRaceState);
  expect(incrementRaceReducer(middleRaceState, action)).toEqual(lastRaceState);
  expect(incrementRaceReducer(lastRaceState, action)).toEqual(firstRaceState);
});

it("should not change state if races are not downloaded", () => {
  const action = incrementRace();
  expect(incrementRaceReducer({ currentRaceIndex: 0 }, action)).toEqual({
    currentRaceIndex: 0
  });
});
