import { AnyAction } from "../actions/actions";
import { GlobalState } from "./rootReducer";

type State = Pick<
  GlobalState,
  "raceInProgress" | "raceType" | "gpsId" | "positions" | "lastTimeCheck"
>;

type StartRaceReducer = (state: State, action: AnyAction) => State;

export const startRaceReducer: StartRaceReducer = (state, action) => {
  if (action.type !== "START_RACE") {
    return state;
  }
  return {
    raceInProgress: true,
    raceType: action.payload.raceType,
    gpsId: action.payload.gpsId,
    positions: [],
    lastTimeCheck: null
  };
};
