import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { Race } from "running_app_core";
import {
  EncodeMessageToUrl,
  encodeMessageToUrl
} from "../../logic/encodeMessageToUrl";
import { FinishRace, finishRace } from "../../logic/finishRace";
import { stopGps, toggleSaving } from "../actionCreators";

export type StopAndSaveRace = (race: Race) => (dispatch: Dispatch) => void;
type StopAndSaveRaceFactory = (
  finishRace: FinishRace,
  encodeMessageToUrl: EncodeMessageToUrl
) => StopAndSaveRace;

export const stopAndSaveRaceFactory: StopAndSaveRaceFactory = (
  finishRaceFunc,
  encodeMessageToUrlFunc
) => race => async dispatch => {
  dispatch(stopGps());
  dispatch(toggleSaving());
  try {
    const message = await finishRaceFunc(race);
    dispatch(toggleSaving());
    dispatch(push(encodeMessageToUrlFunc({ message, isError: false })));
  } catch (err) {
    dispatch(toggleSaving());
    dispatch(
      push(encodeMessageToUrlFunc({ message: err.message, isError: true }))
    );
  }
};

export const stopAndSaveRace: StopAndSaveRace = race =>
  stopAndSaveRaceFactory(finishRace, encodeMessageToUrl)(race);
