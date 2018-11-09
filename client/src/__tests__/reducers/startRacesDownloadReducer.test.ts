import {
  startRacesDownload,
  stopGps
} from "../../application/actions/actionCreators";
import { Race } from "../../application/common_files/interfaces";
import { startRacesDownloadReducer } from "../../application/reducers/startRacesDownloadReducer";

const races: ReadonlyArray<Race> = [];

const defaultState = {
  downloadedRaces: races,
  racesAreBeingDownloaded: false
};

it("should not change state if action is incorrect", () => {
  const action = stopGps();
  expect(startRacesDownloadReducer({ ...defaultState }, action)).toEqual(
    defaultState
  );
});

it("should toggle downloaded races field and erase races", () => {
  const action = startRacesDownload();
  const state = {
    downloadedRaces: [{ type: "walking", path: [] }],
    racesAreBeingDownloaded: false
  };
  expect(startRacesDownloadReducer(state, action)).toEqual({
    downloadedRaces: [],
    racesAreBeingDownloaded: true
  });
});
