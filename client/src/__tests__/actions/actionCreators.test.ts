import { getTestPosition } from "running_app_core";
import {
  addGpsPosition,
  changeRaceType,
  changeRegistrationEmail,
  changeRegistrationName,
  changeRegistrationPassword,
  changeRegistrationPasswordConfirmation,
  decrementRace,
  gpsError,
  incrementRace,
  loginFail,
  loginStart,
  loginSuccess,
  logout,
  registrationFail,
  registrationStart,
  registrationSuccess,
  setRaces,
  startRace,
  startRacesDownload,
  stopGps,
  toggleSaving
} from "../../application/actions/actionCreators";
import { RaceType } from "../../application/actions/actions";

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

it(
  "should create add position and pass payload even if position " +
    "is specified in prototype",
  () => {
    const protoPosition = getTestPosition({
      latitude: 12,
      longitude: 12,
      timestamp: 55
    });
    const currentPosition = {} as Position;
    // @ts-ignore
    currentPosition.__proto__ = protoPosition;
    expect(addGpsPosition(currentPosition).payload).toEqual(protoPosition);
  }
);

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

it("should create change race type action", () => {
  expect(changeRaceType("walking")).toEqual({
    type: "CHANGE_RACE_TYPE",
    payload: "walking"
  });
});

it("should create change registration name action", () => {
  expect(changeRegistrationName("my name")).toEqual({
    type: "CHANGE_REGISTRATION_NAME",
    payload: "my name"
  });
});

it("should create change registration email action", () => {
  expect(changeRegistrationEmail("some@gmail.com")).toEqual({
    type: "CHANGE_REGISTRATION_EMAIL",
    payload: "some@gmail.com"
  });
});

it("should create change registration password action", () => {
  expect(changeRegistrationPassword("secret")).toEqual({
    type: "CHANGE_REGISTRATION_PASSWORD",
    payload: "secret"
  });
});

it("should create change registration password confirmation action", () => {
  expect(changeRegistrationPasswordConfirmation("password repeated")).toEqual({
    type: "CHANGE_REGISTRATION_PASSWORD_CONFIRMATION",
    payload: "password repeated"
  });
});

it("should create start registration action", () => {
  expect(registrationStart()).toEqual({ type: "REGISTRATION_START" });
});

it("should create success registration action", () => {
  expect(registrationSuccess()).toEqual({ type: "REGISTRATION_SUCCESS" });
});

it("should create fail registration action", () => {
  const error = new Error("no internet");
  expect(registrationFail(error)).toEqual({
    type: "REGISTRATION_FAIL",
    error: true,
    payload: error
  });
});

it("should create start login action", () => {
  expect(loginStart()).toEqual({ type: "LOGIN_START" });
});

it("should create success login action", () => {
  const user = { email: "some@gmail.com", name: "bifa", isEmailVerified: true };
  expect(loginSuccess(user)).toEqual({ type: "LOGIN_SUCCESS", payload: user });
});

it("should create fail login action", () => {
  const error = new Error("something went wrong");
  expect(loginFail(error)).toEqual({
    type: "LOGIN_FAIL",
    error: true,
    payload: error
  });
});

it("should create logout acion", () => {
  expect(logout()).toEqual({
    type: "LOGOUT"
  });
});
