import { getTestPosition } from "running_app_core";
import { GeoLocationMock } from "../../__mocks__/GeoLocation";
import {
  addGpsPosition,
  changeRaceType,
  gpsError,
  registrationStart,
  stopGps,
  toggleSaving
} from "../../application/actions/actionCreators";
import { AnyAction, RaceType } from "../../application/actions/actions";
import { raceInProgressReducerFactory } from "../../application/reducers/raceInProgressReducer";

const dependencies = {
  geoLocation: new GeoLocationMock(),
  processNextPosition: jest.fn()
};

const raceType: RaceType = "running";

const defaultState = {
  gpsError: null,
  inProgress: false,
  lastTimeCheck: null,
  type: raceType,
  gpsId: 0,
  positions: [],
  savingInProgress: false
};

it("should not change state if action is incorrect", () => {
  const action = registrationStart();
  expect(
    raceInProgressReducerFactory(dependencies)(defaultState, action)
  ).toEqual(defaultState);
});

it("add position should update positions and remove gps error", () => {
  const nextPosition = getTestPosition({
    latitude: 24,
    longitude: 44,
    timestamp: 23422
  });
  const action = addGpsPosition(nextPosition);
  const processNextPosition = jest.fn().mockReturnValue({
    lastTimeCheck: 124,
    positions: [{ latitude: 44, longitude: 15, timestamp: 22 }]
  });
  expect(
    raceInProgressReducerFactory({ ...dependencies, processNextPosition })(
      defaultState,
      action
    )
  ).toEqual({
    ...defaultState,
    positions: [{ latitude: 44, longitude: 15, timestamp: 22 }],
    lastTimeCheck: 124,
    gpsError: null
  });
  expect(processNextPosition.mock.calls.length).toBe(1);
  expect(processNextPosition.mock.calls[0][0].lastTimeCheck).toEqual(
    defaultState.lastTimeCheck
  );
  expect(processNextPosition.mock.calls[0][0].positions).toEqual(
    defaultState.positions
  );
});

it("should change race type properly", () => {
  const action = changeRaceType("driving");
  expect(
    raceInProgressReducerFactory(dependencies)(defaultState, action)
  ).toEqual({
    ...defaultState,
    type: "driving"
  });
});

it("should set gps error message", () => {
  const action = gpsError({
    message: "gps error",
    code: 10,
    PERMISSION_DENIED: 0,
    POSITION_UNAVAILABLE: 0,
    TIMEOUT: 1
  });
  expect(
    raceInProgressReducerFactory(dependencies)(defaultState, action)
  ).toEqual({
    ...defaultState,
    gpsError: "gps error"
  });
});

it("should set proper fields on race start", () => {
  const action: AnyAction = {
    type: "START_RACE",
    payload: {
      raceType: "walking",
      gpsId: 13
    }
  };
  expect(
    raceInProgressReducerFactory(dependencies)(defaultState, action)
  ).toEqual({
    inProgress: true,
    type: "walking",
    gpsId: 13,
    lastTimeCheck: null,
    positions: [],
    savingInProgress: false,
    gpsError: null
  });
});

it("should delete all tracked positions on race restart", () => {
  const action: AnyAction = {
    type: "START_RACE",
    payload: {
      raceType: "driving",
      gpsId: 47
    }
  };
  const state = {
    ...defaultState,
    inProgress: true,
    lastTimeCheck: 2352,
    gpsId: 39,
    positions: [{ latitude: 13, longitude: 37, time: 2322 }]
  };
  const nextState = {
    inProgress: true,
    type: "driving",
    gpsId: 47,
    positions: [],
    lastTimeCheck: null,
    savingInProgress: false,
    gpsError: null
  };
  expect(raceInProgressReducerFactory(dependencies)(state, action)).toEqual(
    nextState
  );
});

it("should turn on saving and turn off race in progress", () => {
  const action = toggleSaving();
  const nextState = raceInProgressReducerFactory(dependencies)(
    defaultState,
    action
  );
  expect(nextState.inProgress).toBe(false);
  expect(nextState.savingInProgress).toBe(true);
});

it("should turn off saving and turn off race in progress", () => {
  const action = toggleSaving();
  const nextState = raceInProgressReducerFactory(dependencies)(
    {
      ...defaultState,
      inProgress: true,
      savingInProgress: true
    },
    action
  );
  expect(nextState.inProgress).toBe(false);
  expect(nextState.savingInProgress).toBe(false);
});

it("should call clear gps and change state", () => {
  const clearWatch = jest.fn();
  const geoLocation = new GeoLocationMock();
  geoLocation.clearWatch = clearWatch;
  const action = stopGps();
  expect(
    raceInProgressReducerFactory({ ...dependencies, geoLocation })(
      { ...defaultState },
      action
    )
  ).toEqual({
    ...defaultState,
    gpsId: 0
  });
  expect(clearWatch.mock.calls.length).toBe(1);
  expect(clearWatch.mock.calls[0][0]).toBe(defaultState.gpsId);
});
