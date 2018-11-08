import { toggleSaving } from "../../application/actions/actionCreators";
import { AnyAction, RaceType } from "../../application/actions/actions";
import { startRaceReducer } from "../../application/reducers/startRaceReducer";

const defaultRaceType: RaceType = "walking";

const defaultState = {
  raceInProgress: false,
  raceType: defaultRaceType,
  gpsId: 44,
  positions: []
};

it("should not change state if action is incorrect", () => {
  const action = toggleSaving();
  expect(startRaceReducer(defaultState, action)).toEqual(defaultState);
});

it("should set proper fields in state", () => {
  const action: AnyAction = {
    type: "START_RACE",
    payload: {
      raceType: "running",
      gpsId: 13
    }
  };
  expect(startRaceReducer(defaultState, action)).toEqual({
    raceInProgress: true,
    raceType: "running",
    gpsId: 13,
    positions: []
  });
});

it("should delete all tracked positions", () => {
  const action: AnyAction = {
    type: "START_RACE",
    payload: {
      raceType: "driving",
      gpsId: 47
    }
  };
  const state = {
    ...defaultState,
    raceInProgress: true,
    gpsId: 39,
    positions: [{ latitude: 13, longitude: 37, time: 2322 }]
  };
  const nextState = {
    raceInProgress: true,
    raceType: "driving",
    gpsId: 47,
    positions: []
  };
  expect(startRaceReducer(state, action)).toEqual(nextState);
});
