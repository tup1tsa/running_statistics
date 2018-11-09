import {
  startRacesDownload,
  stopGps
} from "../../application/actions/actionCreators";
import { startRacesDownloadReducer } from "../../application/reducers/startRacesDownloadReducer";

const defaultState = {
  racesAreBeingDownloaded: false
};

it("should not change state if action is incorrect", () => {
  const action = stopGps();
  expect(startRacesDownloadReducer({ ...defaultState }, action)).toEqual(
    defaultState
  );
});

it("should toggle downloaded races field", () => {
  const action = startRacesDownload();
  expect(startRacesDownloadReducer(defaultState, action)).toEqual({
    racesAreBeingDownloaded: true
  });
});
