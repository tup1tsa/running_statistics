import { GeoLocationMock } from "../../__mocks__/GeoLocation";
import {
  stopGps,
  toggleSaving
} from "../../application/actions/actionCreators";
import { stopGpsReducer } from "../../application/reducers/stopGpsReducer";

const defaultState = {
  gpsId: 66
};

it("should not change state if action is incorrect", () => {
  const action = toggleSaving();
  const geoLocationMock = new GeoLocationMock();
  expect(stopGpsReducer({ ...defaultState }, action, geoLocationMock)).toEqual(
    defaultState
  );
});

it("should call clear gps and change state", () => {
  const clearWatch = jest.fn();
  const mock = new GeoLocationMock();
  mock.clearWatch = clearWatch;
  const action = stopGps();
  expect(stopGpsReducer({ ...defaultState }, action, mock)).toEqual({
    gpsId: 0
  });
  expect(clearWatch.mock.calls.length).toBe(1);
  expect(clearWatch.mock.calls[0][0]).toBe(defaultState.gpsId);
});
