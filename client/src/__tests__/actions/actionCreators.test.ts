import {
  addGpsPosition,
  gpsError,
  savingError,
  showSavingMessage,
  startRace,
  stopGps,
  toggleSaving
} from "../../application/actions/actionCreators";
import { RaceType } from "../../application/actions/actions";
import { PositionResponse } from "../../application/components/Path/PathWatcher";

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

it("should create show saving message action", () => {
  const message = "saved successfully";
  expect(showSavingMessage(message)).toEqual({
    type: "SHOW_SAVING_MESSAGE",
    payload: message
  });
});

it("should create saving error action", () => {
  const error = new Error("no internet connection");
  expect(savingError(error)).toEqual({
    type: "SAVING_ERROR",
    payload: error,
    error: true
  });
});

it("should create stop gps action", () => {
  expect(stopGps()).toEqual({ type: "STOP_GPS" });
});
