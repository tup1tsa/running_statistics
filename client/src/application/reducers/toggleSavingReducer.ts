import { AnyAction } from "../actions/actions";
import { GlobalState } from "./rootReducer";

type State = Pick<GlobalState, "raceInProgress" | "savingInProgress">;

type ToggleSavingReducer = (state: State, action: AnyAction) => State;

export const toggleSavingReducer: ToggleSavingReducer = (state, action) => {
  if (action.type !== "TOGGLE_SAVING") {
    return state;
  }
  return {
    raceInProgress: false,
    savingInProgress: !state.savingInProgress
  };
};
