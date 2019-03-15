import {
  mapDispatchToProps,
  mapStateToProps
} from "../../application/connectors/RaceViewerConnector";
import { testGlobalState } from "./PathWatcherConnector.test";

it("should provide correct state props", () => {
  const state = testGlobalState();
  expect(mapStateToProps(state)).toEqual({
    racesNumber: 0,
    downloadInProgress: state.racesOnMap.racesAreBeingDownloaded,
    downloadHasBeenCompleted: false,
    races: [],
    partialRaceFinish: state.racesOnMap.partialRaceFinish,
    partialRaceStart: state.racesOnMap.partialRaceStart,
    currentRaceIndex: state.racesOnMap.currentRaceIndex
  });
});

it("should provide correct dispatch props", () => {
  const dispatch = jest.fn();
  const props = mapDispatchToProps(dispatch);
  props.startDownloadingRaces();
  props.decrementRace();
  props.incrementRace();
  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[0][0]).toEqual({
    type: "START_RACES_DOWNLOAD"
  });
  expect(dispatch.mock.calls[1][0]).toEqual({
    type: "DECREMENT_RACE"
  });
  expect(dispatch.mock.calls[2][0]).toEqual({
    type: "INCREMENT_RACE"
  });
});
