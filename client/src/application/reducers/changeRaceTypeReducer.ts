import { AnyAction } from "../actions/actions";
import { GlobalState } from "./rootReducer";

type State = Pick<GlobalState, "raceType">;

export type ChangeRaceTypeReducer = (state: State, action: AnyAction) => State;

export const changeRaceTypeReducer: ChangeRaceTypeReducer = (state, action) => {
  if (action.type !== "CHANGE_RACE_TYPE") {
    return state;
  }
  return { ...state, raceType: action.payload };
};
