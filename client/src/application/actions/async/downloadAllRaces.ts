import { Dispatch } from "redux";
import { DownloadRacesContainer } from "../../../containers/logic/network/downloadRacesContainer";
import { ShowMessageContainer } from "../../../containers/logic/routing/showMessageContainer";
import { setRaces, startRacesDownload } from "../actionCreators";

export type DownloadAllRaces = (
  downloadRaces: DownloadRacesContainer,
  showMessage: ShowMessageContainer
) => (dispatch: Dispatch) => void;

export const downloadAllRaces: DownloadAllRaces = (
  downloadRaces,
  showMessage
) => async dispatch => {
  dispatch(startRacesDownload());
  try {
    const races = await downloadRaces();
    dispatch(setRaces(races));
  } catch (err) {
    dispatch(setRaces([]));
    showMessage(err.message, true);
  }
};
