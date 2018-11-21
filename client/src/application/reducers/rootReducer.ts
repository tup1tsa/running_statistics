import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { AnyAction, RaceType } from "../actions/actions";
import { PositionInTime, Race } from "../common_files/interfaces";
import { addGpsPositionReducer } from "./addGpsPositionReducer";
import { changeRaceTypeReducer } from "./changeRaceTypeReducer";
import { changeRegistrationFieldReducer } from "./changeRegistrationFieldReducer";
import { decrementRaceReducer } from "./decrementRaceReducer";
import { failRegistationReducer } from "./failRegistrationReducer";
import { gpsErrorReducer } from "./gpsErrorReducer";
import { incrementRaceReducer } from "./incrementRaceReducer";
import { setRacesReducer } from "./setRacesReducer";
import { startRaceReducer } from "./startRaceReducer";
import { startRacesDownloadReducer } from "./startRacesDownloadReducer";
import { startRegistrationReducer } from "./startRegistrationReducer";
import { stopGpsReducer } from "./stopGpsReducer";
import { successRegistrationReducer } from "./successRegistrationReducer";
import { toggleSavingReducer } from "./toggleSavingReducer";

export interface GlobalState {
  readonly raceInProgress: boolean;
  readonly raceType: RaceType;
  readonly gpsId: number;
  readonly gpsError: string | null;
  readonly positions: ReadonlyArray<PositionInTime>;
  readonly lastTimeCheck: number | null;
  readonly savingInProgress: boolean;
  readonly router: RouterState;
  readonly racesAreBeingDownloaded: boolean;
  readonly downloadedRaces?: ReadonlyArray<Race>;
  readonly currentRaceIndex: number;
  readonly partialRaceStart: number;
  readonly partialRaceFinish: number;
  readonly login: string;
  readonly email: string;
  readonly passwordFirstInput: string;
  readonly passwordSecondInput: string;
  readonly registrationInProgress: boolean;
  readonly registrationError: string | null;
  readonly isLogged: boolean;
}

type Reducer = (
  state: Partial<GlobalState>,
  action: AnyAction
) => Partial<GlobalState>;

type RootReducer = (
  history: History
) => (state: GlobalState, action: AnyAction) => GlobalState;
type RootReducerFactory = (...reducers: Reducer[]) => RootReducer;

const defaultState: GlobalState = {
  gpsError: null,
  lastTimeCheck: null,
  raceInProgress: false,
  raceType: "running",
  gpsId: 0,
  positions: [],
  savingInProgress: false,
  racesAreBeingDownloaded: false,
  currentRaceIndex: 0,
  partialRaceStart: 0,
  partialRaceFinish: 100,
  login: "",
  email: "",
  passwordFirstInput: "",
  passwordSecondInput: "",
  registrationInProgress: false,
  registrationError: null,
  isLogged: true,
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

const rootReducerFactory: RootReducerFactory = (...reducers) => history => (
  state = defaultState,
  action
) => {
  if (action.type !== "@@router/LOCATION_CHANGE") {
    return reducers.reduce(
      (currentState, currentReducer) => ({
        ...currentState,
        ...currentReducer(currentState, action)
      }),
      state
    );
  }
  return { ...state, router: connectRouter(history)(state.router, action) };
};

export const rootReducer: RootReducer = history =>
  rootReducerFactory(
    addGpsPositionReducer,
    decrementRaceReducer,
    incrementRaceReducer,
    gpsErrorReducer,
    setRacesReducer,
    startRaceReducer,
    startRacesDownloadReducer,
    stopGpsReducer,
    toggleSavingReducer,
    changeRaceTypeReducer,
    changeRegistrationFieldReducer,
    startRegistrationReducer,
    failRegistationReducer,
    successRegistrationReducer
  )(history);
