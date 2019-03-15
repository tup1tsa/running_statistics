import _ from "lodash";
import { mapStateToProps } from "../../application/connectors/PathWatcherConnector";
import { GlobalState } from "../../application/reducers/rootReducer";

export const testGlobalState = () => {
  const state: GlobalState = {
    raceInProgress: {
      inProgress: false,
      gpsId: 33,
      gpsError: null,
      positions: [],
      lastTimeCheck: null,
      savingInProgress: false,
      type: "walking"
    },
    racesOnMap: {
      racesAreBeingDownloaded: false,
      currentRaceIndex: 0,
      partialRaceStart: 0,
      partialRaceFinish: 1
    },
    user: {
      isLoggedIn: false,
      name: "",
      email: ""
    },
    registration: {
      passwordFirstInput: "",
      passwordSecondInput: "",
      inProgress: false,
      error: null
    },
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
    raceInProgress: {
      inProgress: true,
      type: "running",
      positions: [position],
      gpsId: 0,
      gpsError: null,
      lastTimeCheck: null,
      savingInProgress: false
    }
  };
  expect(mapStateToProps(state)).toEqual({
    race: {
      type: "running",
      path: [position]
    },
    raceInProgress: true
  });
});
