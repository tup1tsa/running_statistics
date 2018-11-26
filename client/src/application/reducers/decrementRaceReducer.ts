import { AnyAction } from "../actions/actions";
import { GlobalState } from "./rootReducer";

type State = Pick<GlobalState, "downloadedRaces" | "currentRaceIndex">;

type DecrementRaceReducer = (state: State, action: AnyAction) => State;

export const decrementRaceReducer: DecrementRaceReducer = (state, action) => {
  if (action.type !== "DECREMENT_RACE") {
    return state;
  }
  if (!state.downloadedRaces) {
    return state;
  }
  let nextIndex = state.currentRaceIndex - 1;
  if (nextIndex === -1) {
    nextIndex = state.downloadedRaces.length - 1;
  }
  return {
    ...state,
    currentRaceIndex: nextIndex
  };
};
