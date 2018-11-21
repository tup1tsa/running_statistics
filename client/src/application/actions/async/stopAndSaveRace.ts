import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { Race } from "../../common_files/interfaces";
import { FinishRace, finishRace } from "../../logic/finishRace";
import { SetMessageUrl, setMessageUrl } from "../../logic/setMessageUrl";
import { stopGps, toggleSaving } from "../actionCreators";

export type StopAndSaveRace = (race: Race) => (dispatch: Dispatch) => void;
type StopAndSaveRaceFactory = (
  finishRace: FinishRace,
  setMessageUrl: SetMessageUrl
) => StopAndSaveRace;

export const stopAndSaveRaceFactory: StopAndSaveRaceFactory = (
  finishRaceFunc,
  setMessageUrlFunc
) => race => async dispatch => {
  dispatch(stopGps());
  dispatch(toggleSaving());
  try {
    const message = await finishRaceFunc(race);
    dispatch(toggleSaving());
    dispatch(push(setMessageUrlFunc({ message, isError: false })));
  } catch (err) {
    dispatch(toggleSaving());
    dispatch(push(setMessageUrlFunc({ message: err.message, isError: true })));
  }
};

export const stopAndSaveRace: StopAndSaveRace = race =>
  stopAndSaveRaceFactory(finishRace, setMessageUrl)(race);
