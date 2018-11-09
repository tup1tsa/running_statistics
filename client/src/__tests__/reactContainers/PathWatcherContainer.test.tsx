import * as _ from "lodash";
import { stopAndSaveRace } from "../../application/actions/async/stopAndSaveRace";
import { MESSAGES } from "../../application/common_files/config";
import { Race } from "../../application/common_files/interfaces";
import {
  mapDispatchToPropsFactory,
  mapStateToProps
} from "../../application/reactContainers/PathWatcherContainer";
import { GlobalState } from "../../application/reducers/rootReducer";

export const testGlobalState = () => {
  const state: GlobalState = {
    raceInProgress: false,
    raceType: "walking",
    gpsId: 33,
    gpsError: null,
    lastTimeCheck: null,
    positions: [],
    savingInProgress: false,
    racesAreBeingDownloaded: false,
    currentRaceIndex: 0,
    partialRaceStart: 0,
    partialRaceFinish: 1,
    router: {
      location: {
        pathname: "",
        search: "",
        hash: "",
        state: ""
      },
      action: "POP"
    }
  };
  return _.cloneDeep(state);
};

it("should pass race to props", () => {
  const position = { latitude: 23, longitude: 23, time: 663 };
  const state: GlobalState = {
    ...testGlobalState(),
    raceType: "running",
    positions: [position]
  };
  expect(mapStateToProps(state).race).toEqual({
    type: "running",
    path: [position]
  });
});

it("should pass proper stop watcher handler", async done => {
  const dispatch = jest.fn();
  const functions = {
    stopAndSaveRace,
    finishRace: jest.fn().mockResolvedValue(MESSAGES[1]),
    showMessage: jest.fn()
  };
  const props = mapDispatchToPropsFactory(functions)(dispatch);
  const race: Race = {
    type: "running",
    path: [{ latitude: 12, longitude: 32, time: 44 }]
  };
  await props.stopWatcher(race);
  expect(dispatch.mock.calls.length).toBe(3);
  expect(functions.finishRace.mock.calls.length).toBe(1);
  expect(functions.finishRace.mock.calls[0][0]).toBe(race);
  done();
});
