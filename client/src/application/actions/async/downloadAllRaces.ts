import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { DownloadRaces } from "../../logic/network/downloadRaces";
import { SetMessageUrl } from "../../logic/setMessageUrl";
import { setRaces, startRacesDownload } from "../actionCreators";

export type DownloadAllRaces = (
  downloadRaces: DownloadRaces,
  setMessageUrl: SetMessageUrl
) => (dispatch: Dispatch) => void;

export const downloadAllRaces: DownloadAllRaces = (
  downloadRaces,
  setMessageUrl
) => async dispatch => {
  dispatch(startRacesDownload());
  try {
    const races = await downloadRaces();
    dispatch(setRaces(races));
  } catch (err) {
    dispatch(setRaces([]));
    dispatch(push(setMessageUrl({ message: err.message, isError: true })));
  }
};
