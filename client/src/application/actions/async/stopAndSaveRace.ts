import { Dispatch } from "redux";
import { FinishRaceContainer } from "../../../containers/logic/finishRaceContainer";
import { ShowMessageContainer } from "../../../containers/logic/routing/showMessageContainer";
import { Race } from "../../common_files/interfaces";
import { stopGps, toggleSaving } from "../actionCreators";

export type StopAndSaveRace = (
  race: Race,
  finishRace: FinishRaceContainer,
  showMessage: ShowMessageContainer
) => (dispatch: Dispatch) => void;
export const stopAndSaveRace: StopAndSaveRace = (
  race,
  finishRace,
  showMessage
) => async dispatch => {
  dispatch(stopGps());
  dispatch(toggleSaving());
  try {
    const message = await finishRace(race);
    dispatch(toggleSaving());
    showMessage(message, false);
  } catch (err) {
    dispatch(toggleSaving());
    showMessage(err.message, true);
  }
};
