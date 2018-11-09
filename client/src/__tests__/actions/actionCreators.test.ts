import {
  addGpsPosition,
  decrementRace,
  gpsError,
  incrementRace,
  setRaces,
  startRace,
  startRacesDownload,
  stopGps,
  toggleSaving
} from "../../application/actions/actionCreators";
import { RaceType } from "../../application/actions/actions";
import { getTestPosition } from "../../application/common_files/testHelpers";

it("should create start race action", () => {
  const raceType: RaceType = "running";
  const payload = {
    gpsId: 27,
    raceType
  };
  expect(startRace(payload)).toEqual({ type: "START_RACE", payload });
});

it("should create toggle saving action", () => {
  expect(toggleSaving()).toEqual({ type: "TOGGLE_SAVING" });
});

it("should create add position action", () => {
  const position = getTestPosition({
    latitude: 25,
    longitude: 52,
    timestamp: 5232
  });
  expect(addGpsPosition(position)).toEqual({
    type: "ADD_GPS_POSITION",
    payload: position
  });
});

it("should create add position and pass payload even if position is specified in prototype", () => {
  const protoPosition = getTestPosition({
    latitude: 12,
    longitude: 12,
    timestamp: 55
  });
  const currentPosition = {} as Position;
  // @ts-ignore
  currentPosition.__proto__ = protoPosition;
  expect(addGpsPosition(currentPosition).payload).toEqual(protoPosition);
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

it("should create stop gps action", () => {
  expect(stopGps()).toEqual({ type: "STOP_GPS" });
});

it("should create start races download action", () => {
  expect(startRacesDownload()).toEqual({
    type: "START_RACES_DOWNLOAD"
  });
});

it("should create set races action", () => {
  const races = [{ type: "walking", path: [] }];
  expect(setRaces(races)).toEqual({
    type: "SET_RACES",
    payload: races
  });
});

it("should create increment race action", () => {
  expect(incrementRace()).toEqual({
    type: "INCREMENT_RACE"
  });
});

it("should create decrement race action", () => {
  expect(decrementRace()).toEqual({
    type: "DECREMENT_RACE"
  });
});
