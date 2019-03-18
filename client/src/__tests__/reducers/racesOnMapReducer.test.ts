import { getTestRaces } from "running_app_core";
import {
  decrementRace,
  incrementRace,
  registrationStart,
  setRaces,
  startRacesDownload
} from "../../application/actions/actionCreators";
import racesOnMapReducer, {
  RacesOnMapState
} from "../../application/reducers/racesOnMapReducer";

const defaultState: RacesOnMapState = {
  downloadedRaces: [],
  racesAreBeingDownloaded: false,
  currentRaceIndex: 0,
  partialRaceFinish: 1,
  partialRaceStart: 0
};

it("should not change state if action is not correct", () => {
  const action = registrationStart();
  expect(racesOnMapReducer(defaultState, action)).toEqual(defaultState);
});

it("should toggle downloaded races field on download start", () => {
  const action = startRacesDownload();
  expect(racesOnMapReducer(defaultState, action)).toEqual({
    ...defaultState,
    racesAreBeingDownloaded: true
  });
});

it("should set races properly", () => {
  const races = [{ type: "walking", path: [] }];
  const action = setRaces(races);
  expect(
    racesOnMapReducer(
      { ...defaultState, racesAreBeingDownloaded: true },
      action
    )
  ).toEqual({
    ...defaultState,
    racesAreBeingDownloaded: false,
    downloadedRaces: races
  });
});

it("should decrement races properly", () => {
  const firstRaceState = {
    ...defaultState,
    currentRaceIndex: 0,
    downloadedRaces: getTestRaces()
  };
  const middleRaceState = { ...firstRaceState, currentRaceIndex: 1 };
  const lastRaceState = {
    ...firstRaceState,
    currentRaceIndex: 2
  };
  const action = decrementRace();
  expect(racesOnMapReducer(lastRaceState, action)).toEqual(middleRaceState);
  expect(racesOnMapReducer(middleRaceState, action)).toEqual(firstRaceState);
  expect(racesOnMapReducer(firstRaceState, action)).toEqual(lastRaceState);
});

it("should increment races properly", () => {
  const firstRaceState = {
    ...defaultState,
    currentRaceIndex: 0,
    downloadedRaces: getTestRaces()
  };
  const middleRaceState = { ...firstRaceState, currentRaceIndex: 1 };
  const lastRaceState = {
    ...firstRaceState,
    currentRaceIndex: 2
  };
  const action = incrementRace();
  expect(racesOnMapReducer(firstRaceState, action)).toEqual(middleRaceState);
  expect(racesOnMapReducer(middleRaceState, action)).toEqual(lastRaceState);
  expect(racesOnMapReducer(lastRaceState, action)).toEqual(firstRaceState);
});

it("should not change state on decrement/increment action if races are not downloaded", () => {
  const state = { ...defaultState };
  delete state.downloadedRaces;
  expect(racesOnMapReducer(state, incrementRace())).toEqual(state);
  expect(racesOnMapReducer(state, decrementRace())).toEqual(state);
});
