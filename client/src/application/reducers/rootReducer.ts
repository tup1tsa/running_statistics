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
  readonly savingError: string | null;
  readonly savingSuccessMessage: string | null;
  readonly router?: RouterState;
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
  savingError: null,
  savingSuccessMessage: null,
  lastTimeCheck: null,
  raceInProgress: false,
  raceType: "running",
  gpsId: 0,
  positions: [],
  savingInProgress: false
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
