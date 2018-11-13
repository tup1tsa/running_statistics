import { AnyAction, RaceType } from "../actions/actions";

interface State {
  raceType: RaceType;
}

export type ChangeRaceTypeReducer = (state: State, action: AnyAction) => State;

export const changeRaceTypeReducer: ChangeRaceTypeReducer = (state, action) => {
  if (action.type !== "CHANGE_RACE_TYPE") {
    return state;
  }
  return { ...state, raceType: action.payload };
};
