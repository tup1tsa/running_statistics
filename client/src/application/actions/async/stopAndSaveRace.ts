import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { FinishRaceContainer } from "../../../containers/logic/finishRaceContainer";
import { SetMessageUrlContainer } from "../../../containers/logic/setMessageUrlContainer";
import { Race } from "../../common_files/interfaces";
import { stopGps, toggleSaving } from "../actionCreators";

export type StopAndSaveRace = (
  race: Race,
  finishRace: FinishRaceContainer,
  setMessageUrl: SetMessageUrlContainer
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
