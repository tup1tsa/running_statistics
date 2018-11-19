import { GeoLocationMock } from "../../__mocks__/GeoLocation";
import {
  stopGps,
  toggleSaving
} from "../../application/actions/actionCreators";
import { stopGpsReducerFactory } from "../../application/reducers/stopGpsReducer";

const defaultState = {
  gpsId: 66
};

it("should not change state if action is incorrect", () => {
  const action = toggleSaving();
  const geoLocationMock = new GeoLocationMock();
  expect(
    stopGpsReducerFactory(geoLocationMock)({ ...defaultState }, action)
  ).toEqual(defaultState);
});

it("should call clear gps and change state", () => {
  const clearWatch = jest.fn();
  const mock = new GeoLocationMock();
  mock.clearWatch = clearWatch;
  const action = stopGps();
  expect(stopGpsReducerFactory(mock)({ ...defaultState }, action)).toEqual({
    gpsId: 0
  });
  expect(clearWatch.mock.calls.length).toBe(1);
  expect(clearWatch.mock.calls[0][0]).toBe(defaultState.gpsId);
});
