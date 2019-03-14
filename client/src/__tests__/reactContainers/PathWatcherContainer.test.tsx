import _ from "lodash";
import { mapStateToProps } from "../../application/connectors/PathWatcherConnector";
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
    registrationInProgress: false,
    login: "",
    passwordFirstInput: "",
    passwordSecondInput: "",
    email: "",
    isLogged: false,
    registrationError: null,
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
    positions: [position],
    raceInProgress: true
  };
  expect(mapStateToProps(state)).toEqual({
    race: {
      type: "running",
      path: [position]
    },
    raceInProgress: true
  });
});
