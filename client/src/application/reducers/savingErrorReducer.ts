import { AnyAction } from "../actions/actions";

interface State {
  readonly savingInProgress: boolean;
  readonly savingError: string | null;
  readonly savingSuccessMessage: string | null;
}

export type SavingErrorReducer = (state: State, action: AnyAction) => State;

export const savingErrorReducer: SavingErrorReducer = (state, action) => {
  if (action.type !== "SAVING_ERROR") {
    return state;
  }
  return {
    savingInProgress: false,
    savingError: action.payload.message,
    savingSuccessMessage: null
  };
};
