import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { FinishRaceContainer } from "../../../containers/logic/finishRaceContainer";
import { MESSAGES } from "../../common_files/config";
import { Race } from "../../common_files/interfaces";
import { SetMessageUrl } from "../../logic/setMessageUrl";
import { stopGps, toggleSaving } from "../actionCreators";

export type StopAndSaveRace = (
  race: Race,
  finishRace: FinishRaceContainer,
  setMessageUrl: SetMessageUrl
) => (dispatch: Dispatch) => void;
export const stopAndSaveRace: StopAndSaveRace = (
  race,
  finishRace,
  setMessageUrl
) => async dispatch => {
  dispatch(stopGps());
  dispatch(toggleSaving());
  try {
    const message = await finishRace(race);
    dispatch(toggleSaving());
    const url = setMessageUrl({ message, isError: false }, MESSAGES);
    dispatch(push(url));
  } catch (err) {
    dispatch(toggleSaving());
    const url = setMessageUrl(
      { message: err.message, isError: true },
      MESSAGES
    );
    dispatch(push(url));
  }
};
