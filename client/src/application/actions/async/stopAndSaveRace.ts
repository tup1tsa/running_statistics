import { Dispatch } from "redux";
import { FinishRaceContainer } from "../../../containers/logic/finishRaceContainer";
import { Race } from "../../common_files/interfaces";
import {
  savingError,
  showSavingMessage,
  stopGps,
  toggleSaving
} from "../actionCreators";

export type StopAndSaveRace = (
  race: Race,
  finishRace: FinishRaceContainer
) => (dispatch: Dispatch) => void;
export const stopAndSaveRace: StopAndSaveRace = (
  race,
  finishRace
) => async dispatch => {
  dispatch(stopGps());
  dispatch(toggleSaving());
  try {
    const message = await finishRace(race);
    dispatch(showSavingMessage(message));
  } catch (err) {
    dispatch(savingError(err));
  }
};

// stop race action should stop race (dispatch clear gps) and dispatch saving (first state)
// on success dispatch success saving action (second state possibly)
// on fail dispatch fail action (second state possibly)
