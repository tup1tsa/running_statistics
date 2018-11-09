import { setRaces, stopGps } from "../../application/actions/actionCreators";
import { setRacesReducer } from "../../application/reducers/setRacesReducer";

const defaultState = {
  racesAreBeingDownloaded: true,
  downloadedRaces: []
};

it("should not change state if action is incorrect", () => {
  const action = stopGps();
  expect(setRacesReducer({ ...defaultState }, action)).toEqual(defaultState);
});

it("should set races properly", () => {
  const races = [{ type: "walking", path: [] }];
  const action = setRaces(races);
  expect(setRacesReducer({ ...defaultState }, action)).toEqual({
    racesAreBeingDownloaded: false,
    downloadedRaces: races
  });
});
