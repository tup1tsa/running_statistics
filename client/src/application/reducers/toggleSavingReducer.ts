import { AnyAction } from "../actions/actions";

interface State {
  readonly raceInProgress: boolean;
  readonly savingInProgress: boolean;
}

export type ToggleSavingReducer = (state: State, action: AnyAction) => State;

export const toggleSavingReducer: ToggleSavingReducer = (state, action) => {
  if (action.type !== "TOGGLE_SAVING") {
    return state;
  }
  return {
    raceInProgress: false,
    savingInProgress: !state.savingInProgress
  };
};
