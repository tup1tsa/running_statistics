import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { Race } from "../../common_files/interfaces";
import { FinishRace } from "../../logic/finishRace";
import { SetMessageUrl } from "../../logic/setMessageUrl";
import { stopGps, toggleSaving } from "../actionCreators";

export type StopAndSaveRace = (
  race: Race,
  finishRace: FinishRace,
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
    dispatch(push(setMessageUrl({ message, isError: false })));
  } catch (err) {
    dispatch(toggleSaving());
    dispatch(push(setMessageUrl({ message: err.message, isError: true })));
  }
};
