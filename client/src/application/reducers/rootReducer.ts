import { RouterState } from "connected-react-router";
import { AnyAction, RaceType } from "../actions/actions";
import { PositionInTime } from "../common_files/interfaces";

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
}

export type Reducer = (
  state: Partial<GlobalState>,
  action: AnyAction
) => Partial<GlobalState>;

export type RootReducer = (
  state: GlobalState,
  action: AnyAction,
  reducers: ReadonlyArray<Reducer>
) => GlobalState;

const defaultState: GlobalState = {
  gpsError: null,
  lastTimeCheck: null,
  raceInProgress: false,
  raceType: "running",
  gpsId: 0,
  positions: [],
  savingInProgress: false,
  racesAreBeingDownloaded: false,
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

export const rootReducer: RootReducer = (
  state = defaultState,
  action,
  reducers
) =>
  reducers.reduce(
    (currentState, currentReducer) => ({
      ...currentState,
      ...currentReducer(currentState, action)
    }),
    state
  );
