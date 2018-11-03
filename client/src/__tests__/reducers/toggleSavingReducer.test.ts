import { GeoLocationMock } from "../../__mocks__/GeoLocation";
import {
  addGpsPosition,
  toggleSaving
} from "../../application/actions/actionCreators";
import { clearGpsIdReducer } from "../../application/reducers/toggleSavingReducer";

const defaultState = {
  raceInProgress: true,
  savingInProgress: false
};

it("should not change state if action is incorrect", () => {
  const action = addGpsPosition({
    coords: { latitude: 33, longitude: 32 },
    timestamp: 33
  });
  expect(clearGpsIdReducer(defaultState, action)).toEqual(defaultState);
});

it("should call clear id with proper id and change state", () => {
  const action = toggleSaving();
  const clearWatch = jest.fn();
  const geoMock = new GeoLocationMock();
  geoMock.clearWatch = clearWatch;
  expect(clearGpsIdReducer(defaultState, action)).toEqual({
    raceInProgress: false,
    savingInProgress: true
  });
});
