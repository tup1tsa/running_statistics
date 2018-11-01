import { GeoLocationMock } from "../../__mocks__/GeoLocation";
import {
  addGpsPosition,
  clearGpsId,
  gpsError,
  startRaceFactory
} from "../../application/actions/actionCreators";
import { RaceType, StartRaceAction } from "../../application/actions/actions";
import { PositionResponse } from "../../application/components/Path/PathWatcher";

describe("start race action", () => {
  it("should dispatch sync start action", () => {
    const geoLocationMock = new GeoLocationMock();
    const dispatch = jest.fn();
    const raceType: RaceType = "walking";
    const startRace = startRaceFactory(geoLocationMock);
    startRace(raceType)(dispatch);
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
    startRaceFactory(geoLocationMock)("walking")(dispatch);
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
    startRaceFactory(geoLocationMock)("walking")(dispatch);
    const firstPosition: PositionResponse = {
      coords: { latitude: 44, longitude: 32 },
      timestamp: 23
    };
    const secondPosition: PositionResponse = {
      coords: { latitude: 12, longitude: 17 },
      timestamp: 553
    };
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
    startRaceFactory(geoLocationMock)("walking")(dispatch);
    expect(geoLocationMock.options).toEqual({ enableHighAccuracy: true });
  });
});

it("should create clear gps id action", () => {
  expect(clearGpsId()).toEqual({ type: "CLEAR_GPS_ID" });
});

it("should create add position action", () => {
  const position: PositionResponse = {
    coords: { latitude: 25, longitude: 52 },
    timestamp: 5232
  };
  expect(addGpsPosition(position)).toEqual({
    type: "ADD_GPS_POSITION",
    payload: position
  });
});

it("should create gps error action", () => {
  const error: PositionError = {
    message: "gps error",
    code: 13,
    PERMISSION_DENIED: 0,
    POSITION_UNAVAILABLE: 2,
    TIMEOUT: 2000
  };
  expect(gpsError(error)).toEqual({
    type: "GPS_ERROR",
    error: true,
    payload: error
  });
});
