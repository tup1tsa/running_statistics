import { GetDistance, getTestPosition } from "running_app_core";
import { processNextPositionFactory } from "../../../application/logic/path/processNextPosition";

const defaultState = {
  positions: [],
  lastTimeCheck: null
};

const defaultConfig = {
  delayBetweenCallsMs: 10000,
  minimumDistanceDiffMetres: 10
};

const defaultFunctions = {
  getDistance: jest.fn(),
  isMiddlePointAccurate: jest.fn()
};

it("should successfully save first position", () => {
  const position = getTestPosition({
    latitude: 24,
    longitude: 44,
    timestamp: 2342434
  });
  expect(
    processNextPositionFactory(defaultConfig, defaultFunctions)(
      defaultState,
      position
    )
  ).toEqual({
    positions: [{ latitude: 24, longitude: 44, time: 2342434 }],
    lastTimeCheck: 2342434
  });
});

it("should convert date to timestamp when saving position", () => {
  const position = {
    coords: { latitude: 24, longitude: 44 },
    timestamp: new Date(25000)
  };
  expect(
    processNextPositionFactory(defaultConfig, defaultFunctions)(
      defaultState,
      // @ts-ignore
      position
    )
  ).toEqual({
    positions: [{ latitude: 24, longitude: 44, time: 25000 }],
    lastTimeCheck: 25000
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
    lastTimeCheck: 1000
  };
  const closePosition = getTestPosition({
    latitude: 12,
    longitude: -17,
    timestamp: 15000
  });
  const normalPosition = getTestPosition({
    latitude: 65,
    longitude: 34,
    timestamp: 35000
  });
  expect(
    processNextPositionFactory(defaultConfig, functions)(state, closePosition)
  ).toEqual({ ...state, lastTimeCheck: 15000 });
  expect(
    processNextPositionFactory(defaultConfig, functions)(state, normalPosition)
  ).toEqual({
    positions: [savedPosition, { latitude: 65, longitude: 34, time: 35000 }],
    lastTimeCheck: 35000
  });
  expect(getDistance.mock.calls.length).toBe(2);
});

it("should remove inaccurate middle position", () => {
  const getDistanceMock: GetDistance = (start, end) =>
    Math.abs(start.latitude - end.latitude) * 1000;

  const firstPosition = { latitude: 24, longitude: 79, time: 1000 };
  const secondPosition = { latitude: 26, longitude: 79, time: 12000 };
  const thirdPosition = { latitude: 77, longitude: 79, time: 23000 };
  const fourthPosition = { latitude: 25, longitude: 79, time: 35000 };
  const state = {
    positions: [firstPosition, secondPosition, thirdPosition],
    lastTimeCheck: 23000
  };
  const functions = { ...defaultFunctions, getDistance: getDistanceMock };
  const position = getTestPosition({
    latitude: 25,
    longitude: 79,
    timestamp: 35000
  });
  // third position is a geo location api error.
  // in this example position with latitude 77 will be corrected by the next position
  // with latitude of 25 (which is much closer to the previous positions)
  expect(
    processNextPositionFactory(defaultConfig, functions)(state, position)
  ).toEqual({
    positions: [firstPosition, secondPosition, fourthPosition],
    lastTimeCheck: 35000
  });
});

it("should not save very recent positions", () => {
  const savedPosition = { latitude: 24, longitude: 44, time: 1000 };
  const recentPosition = getTestPosition({
    latitude: 42,
    longitude: 22,
    timestamp: 7000
  });
  const normalPosition = getTestPosition({
    latitude: 42,
    longitude: 22,
    timestamp: 12000
  });
  const state = {
    positions: [savedPosition],
    lastTimeCheck: 1000
  };
  expect(
    processNextPositionFactory(defaultConfig, defaultFunctions)(
      state,
      recentPosition
    )
  ).toEqual({
    positions: [savedPosition],
    lastTimeCheck: 1000
  });
  expect(
    processNextPositionFactory(defaultConfig, defaultFunctions)(
      state,
      normalPosition
    )
  ).toEqual({
    positions: [savedPosition, { latitude: 42, longitude: 22, time: 12000 }],
    lastTimeCheck: 12000
  });
});
