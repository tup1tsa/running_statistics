import { AnyAction, RaceType } from "../actions/actions";
import { PositionInTime } from "../common_files/interfaces";

export interface GlobalState {
  readonly raceInProgress: boolean;
  readonly raceType: RaceType;
  readonly gpsId: number;
  readonly gpsError?: string;
  readonly positions: ReadonlyArray<PositionInTime>;
  readonly lastTimeCheck?: number;
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
  raceInProgress: false,
  raceType: "running",
  gpsId: 0,
  positions: []
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
