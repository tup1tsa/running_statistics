import { getTestPosition } from "running_app_core";
import { GeoLocationMock } from "../../../__mocks__/GeoLocation";
import {
  RaceType,
  StartRaceAction
} from "../../../application/actions/actions";
import { startTrackingRaceFactory } from "../../../application/actions/async/startTrackingRace";

it("should dispatch stop gps action before starting another one just in case", () => {
  const geoLocation = new GeoLocationMock();
  const dispatch = jest.fn();
  const raceType: RaceType = "driving";
  startTrackingRaceFactory(geoLocation)(raceType)(dispatch);
  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[0][0]).toEqual({
    type: "STOP_GPS"
  });
});

it("should dispatch sync start action", () => {
  const geoLocationMock = new GeoLocationMock();
  const dispatch = jest.fn();
  const raceType: RaceType = "walking";
  startTrackingRaceFactory(geoLocationMock)(raceType)(dispatch);
  const action: StartRaceAction = {
    type: "START_RACE",
    payload: {
      raceType,
      // it should not be null. Ternary is used instead of direct casting
      // to number
      gpsId: geoLocationMock.watchId === null ? 23 : geoLocationMock.watchId
    }
  };
  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[1][0]).toEqual(action);
});

it("should change url", () => {
  const geoLocation = new GeoLocationMock();
  const dispatch = jest.fn();
  const raceType: RaceType = "driving";
  startTrackingRaceFactory(geoLocation)(raceType)(dispatch);
  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[2][0].payload).toEqual({
    method: "push",
    args: ["/race/driving"]
  });
});

it("start race action should dispatch error action if gps threw", () => {
  const geoLocationMock = new GeoLocationMock();
  const dispatch = jest.fn();
  startTrackingRaceFactory(geoLocationMock)("walking")(dispatch);
  const errorMessage = "bad weather for gps";
  geoLocationMock.sendError(errorMessage);
  // 1-st call is stopping gps, 2-nd — connecting to gps
  // 3-rd — changing url
  // 4-th — error handling
  expect(dispatch.mock.calls.length).toBe(4);
  expect(dispatch.mock.calls[3][0]).toEqual({
    type: "GPS_ERROR",
    error: true,
    payload: geoLocationMock.lastError
  });
});

it("should dispatch update position action on every update", () => {
  const geoLocationMock = new GeoLocationMock();
  const dispatch = jest.fn();
  startTrackingRaceFactory(geoLocationMock)("walking")(dispatch);
  const firstPosition: Position = getTestPosition({
    latitude: 44,
    longitude: 32,
    timestamp: 23
  });
  const secondPosition: Position = getTestPosition({
    latitude: 12,
    longitude: 17,
    timestamp: 553
  });
  geoLocationMock.sendPosition(firstPosition);
  geoLocationMock.sendPosition(secondPosition);
  // 1-st call is stopping gps, 2-nd — connecting to gps
  // 3-rd — changing url
  // 4-rd — first position, 5-th — second position
  expect(dispatch.mock.calls.length).toBe(5);
  expect(dispatch.mock.calls[3][0]).toEqual({
    type: "ADD_GPS_POSITION",
    payload: firstPosition
  });
  expect(dispatch.mock.calls[4][0]).toEqual({
    type: "ADD_GPS_POSITION",
    payload: secondPosition
  });
});

it("should provide correct geoLocation options", () => {
  const geoLocationMock = new GeoLocationMock();
  const dispatch = jest.fn();
  startTrackingRaceFactory(geoLocationMock)("walking")(dispatch);
  expect(geoLocationMock.options).toEqual({ enableHighAccuracy: true });
});
