import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { DownloadRacesContainer } from "../../../containers/logic/network/downloadRacesContainer";
import { SetMessageUrlContainer } from "../../../containers/logic/setMessageUrlContainer";
import { setRaces, startRacesDownload } from "../actionCreators";

export type DownloadAllRaces = (
  downloadRaces: DownloadRacesContainer,
  setMessageUrl: SetMessageUrlContainer
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
