import { GeoLocationMock } from "../../__mocks__/GeoLocation";
import {
  addGpsPosition,
  clearGpsId
} from "../../application/actions/actionCreators";
import { clearGpsIdReducer } from "../../application/reducers/clearGpsIdReducer";

const defaultState = {
  raceInProgress: true,
  gpsId: 17
};

it("should not change state if action is incorrect", () => {
  const action = addGpsPosition({
    coords: { latitude: 33, longitude: 32 },
    timestamp: 33
  });
  expect(
    clearGpsIdReducer(defaultState, action, new GeoLocationMock())
  ).toEqual(defaultState);
});

it("should call clear id with proper id and change state", () => {
  const action = clearGpsId();
  const clearWatch = jest.fn();
  const geoMock = new GeoLocationMock();
  geoMock.clearWatch = clearWatch;
  expect(clearGpsIdReducer(defaultState, action, geoMock)).toEqual({
    raceInProgress: false,
    gpsId: 0
  });
  expect(clearWatch.mock.calls.length).toBe(1);
  expect(clearWatch.mock.calls[0][0]).toBe(defaultState.gpsId);
});
