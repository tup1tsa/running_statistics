import { GeoLocationMock } from "../../../__mocks__/GeoLocation";
import {
  RaceType,
  StartRaceAction
} from "../../../application/actions/actions";
import { startTrackingRace } from "../../../application/actions/async/startTrackingRace";
import { getTestPosition } from "../../../application/common_files/testHelpers";

it("should dispatch sync start action", () => {
  const geoLocationMock = new GeoLocationMock();
  const dispatch = jest.fn();
  const raceType: RaceType = "walking";
  startTrackingRace(raceType, geoLocationMock)(dispatch);
  const action: StartRaceAction = {
    type: "START_RACE",
    payload: {
      raceType,
      // it should not be null. Ternary is used instead of direct casting
      // to number
      gpsId: geoLocationMock.watchId === null ? 23 : geoLocationMock.watchId
    }
  };
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0]).toEqual(action);
});

it("start race action should dispatch error action if gps threw", () => {
  const geoLocationMock = new GeoLocationMock();
  const dispatch = jest.fn();
  startTrackingRace("walking", geoLocationMock)(dispatch);
  const errorMessage = "bad weather for gps";
  geoLocationMock.sendError(errorMessage);
  // 1-st call is connecting to gps and second one is error handling
  expect(dispatch.mock.calls.length).toBe(2);
  expect(dispatch.mock.calls[1][0]).toEqual({
    type: "GPS_ERROR",
    error: true,
    payload: geoLocationMock.lastError
  });
});

it("should dispatch update position action on every update", () => {
  const geoLocationMock = new GeoLocationMock();
  const dispatch = jest.fn();
  startTrackingRace("walking", geoLocationMock)(dispatch);
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
  // 1-st call is connecting to gps and two calls for every position
  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[1][0]).toEqual({
    type: "ADD_GPS_POSITION",
    payload: firstPosition
  });
  expect(dispatch.mock.calls[2][0]).toEqual({
    type: "ADD_GPS_POSITION",
    payload: secondPosition
  });
});

it("should provide correct geoLocation options", () => {
  const geoLocationMock = new GeoLocationMock();
  const dispatch = jest.fn();
  startTrackingRace("walking", geoLocationMock)(dispatch);
  expect(geoLocationMock.options).toEqual({ enableHighAccuracy: true });
});
