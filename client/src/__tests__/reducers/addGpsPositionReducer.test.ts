import {
  addGpsPosition,
  toggleSaving
} from "../../application/actions/actionCreators";
import { Coordinates } from "../../application/common_files/interfaces";
import { addGpsPositionReducer } from "../../application/reducers/addGpsPositionReducer";

const defaultState = {
  positions: [],
  lastTimeCheck: null,
  gpsError: "previous error"
};

const defaultConfig = {
  delayBetweenCallsMs: 10000,
  minimumDistanceDiffMetres: 10
};

const defaultFunctions = {
  getDistance: jest.fn(),
  isMiddlePointAccurate: jest.fn()
};

it("should not change state if action is incorrect", () => {
  const action = toggleSaving();
  expect(
    addGpsPositionReducer(defaultState, action, defaultConfig, defaultFunctions)
  ).toEqual(defaultState);
});

it("should successfully save first position and remove gps error", () => {
  const action = addGpsPosition({
    coords: { latitude: 24, longitude: 44 },
    timestamp: 2342434
  });
  expect(
    addGpsPositionReducer(defaultState, action, defaultConfig, defaultFunctions)
  ).toEqual({
    positions: [{ latitude: 24, longitude: 44, time: 2342434 }],
    lastTimeCheck: 2342434,
    gpsError: null
  });
});

it("should convert date to timestamp when saving position", () => {
  const action = addGpsPosition({
    coords: { latitude: 24, longitude: 44 },
    timestamp: new Date(25000)
  });
  expect(
    addGpsPositionReducer(defaultState, action, defaultConfig, defaultFunctions)
  ).toEqual({
    positions: [{ latitude: 24, longitude: 44, time: 25000 }],
    lastTimeCheck: 25000,
    gpsError: null
  });
});

it("should not save very close positions", () => {
  const getDistance = jest.fn();
  const closeDistance = 2;
  const normalDistance = 12;
  getDistance.mockReturnValueOnce(closeDistance);
  getDistance.mockReturnValueOnce(normalDistance);
  const functions = { ...defaultFunctions, getDistance };

  const savedPosition = { latitude: 24, longitude: 44, time: 1000 };
  const state = {
    positions: [savedPosition],
    lastTimeCheck: 1000,
    gpsError: "some irrelevant error"
  };

  const closePositionAction = addGpsPosition({
    coords: { latitude: 12, longitude: -17 },
    timestamp: 15000
  });
  const normalPositionAction = addGpsPosition({
    coords: { latitude: 65, longitude: 34 },
    timestamp: 35000
  });

  expect(
    addGpsPositionReducer(state, closePositionAction, defaultConfig, functions)
  ).toEqual({ ...state, lastTimeCheck: 15000, gpsError: null });
  expect(
    addGpsPositionReducer(state, normalPositionAction, defaultConfig, functions)
  ).toEqual({
    positions: [savedPosition, { latitude: 65, longitude: 34, time: 35000 }],
    lastTimeCheck: 35000,
    gpsError: null
  });
  expect(getDistance.mock.calls.length).toBe(2);
});

it("should remove inaccurate middle position", () => {
  const getDistanceMock = (start: Coordinates, end: Coordinates) =>
    Math.abs(start.latitude - end.latitude) * 1000;

  const firstPosition = { latitude: 24, longitude: 79, time: 1000 };
  const secondPosition = { latitude: 26, longitude: 79, time: 12000 };
  const thirdPosition = { latitude: 77, longitude: 79, time: 23000 };
  const fourthPosition = { latitude: 25, longitude: 79, time: 35000 };

  const state = {
    positions: [firstPosition, secondPosition, thirdPosition],
    lastTimeCheck: 23000,
    gpsError: "some error"
  };
  const functions = { ...defaultFunctions, getDistance: getDistanceMock };

  const action = addGpsPosition({
    coords: { latitude: 25, longitude: 79 },
    timestamp: 35000
  });

  // third position is a geo location api error.
  // in this example position with latitude 77 will be corrected by the next position
  // with latitude of 25 (which is much closer to the previous positions)
  expect(
    addGpsPositionReducer(state, action, defaultConfig, functions)
  ).toEqual({
    positions: [firstPosition, secondPosition, fourthPosition],
    lastTimeCheck: 35000,
    gpsError: null
  });
});

it("should not save very recent positions", () => {
  const savedPosition = { latitude: 24, longitude: 44, time: 1000 };
  const recentPositionAction = addGpsPosition({
    coords: { latitude: 42, longitude: 22 },
    timestamp: 7000
  });
  const normalPositionAction = addGpsPosition({
    coords: { latitude: 42, longitude: 22 },
    timestamp: 12000
  });
  const state = {
    positions: [savedPosition],
    lastTimeCheck: 1000,
    gpsError: "some error"
  };
  expect(
    addGpsPositionReducer(
      state,
      recentPositionAction,
      defaultConfig,
      defaultFunctions
    )
  ).toEqual({
    positions: [savedPosition],
    lastTimeCheck: 1000,
    gpsError: null
  });
  expect(
    addGpsPositionReducer(
      state,
      normalPositionAction,
      defaultConfig,
      defaultFunctions
    )
  ).toEqual({
    positions: [savedPosition, { latitude: 42, longitude: 22, time: 12000 }],
    gpsError: null,
    lastTimeCheck: 12000
  });
});
