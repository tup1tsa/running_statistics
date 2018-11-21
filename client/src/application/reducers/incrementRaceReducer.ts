import { AnyAction } from "../actions/actions";
import { Race } from "../common_files/interfaces";

interface State {
  readonly currentRaceIndex: number;
  readonly downloadedRaces: ReadonlyArray<Race>;
}

type IncrementRaceReducer = (state: State, action: AnyAction) => State;

export const incrementRaceReducer: IncrementRaceReducer = (state, action) => {
  if (action.type !== "INCREMENT_RACE") {
    return state;
  }
  let nextIndex = state.currentRaceIndex + 1;
  if (nextIndex === state.downloadedRaces.length) {
    nextIndex = 0;
  }
  return {
    ...state,
    currentRaceIndex: nextIndex
  };
};
