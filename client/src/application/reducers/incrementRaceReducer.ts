import { AnyAction } from "../actions/actions";
import { GlobalState } from "./rootReducer";

type State = Pick<GlobalState, "currentRaceIndex" | "downloadedRaces">;

type IncrementRaceReducer = (state: State, action: AnyAction) => State;

export const incrementRaceReducer: IncrementRaceReducer = (state, action) => {
  if (action.type !== "INCREMENT_RACE") {
    return state;
  }
  if (!state.downloadedRaces) {
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
