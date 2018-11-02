import { clearGpsId } from "../../application/actions/actionCreators";
import { AnyAction, RaceType } from "../../application/actions/actions";
import { startRaceReducer } from "../../application/reducers/startRaceReducer";

const defaultRaceType: RaceType = "walking";

const defaultState = {
  raceInProgress: false,
  raceType: defaultRaceType,
  gpsId: 44
};

it("should not change state if action is incorrect", () => {
  const action = clearGpsId();
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
    gpsId: 13
  });
});
