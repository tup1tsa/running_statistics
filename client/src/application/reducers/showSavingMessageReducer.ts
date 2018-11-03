import { AnyAction } from "../actions/actions";

interface State {
  readonly savingInProgress: boolean;
  readonly savingError: string | null;
  readonly savingSuccessMessage: string | null;
}

export type ShowSavingMessageReducer = (
  state: State,
  action: AnyAction
) => State;

export const showSavingMessageReducer: ShowSavingMessageReducer = (
  state,
  action
) => {
  if (action.type !== "SHOW_SAVING_MESSAGE") {
    return state;
  }
  return {
    savingInProgress: false,
    savingError: null,
    savingSuccessMessage: action.payload
  };
};
