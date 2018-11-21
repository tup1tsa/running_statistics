import { push } from "connected-react-router";
import { Dispatch } from "redux";
import {
  DownloadRaces,
  downloadRaces
} from "../../logic/network/downloadRaces";
import { SetMessageUrl, setMessageUrl } from "../../logic/setMessageUrl";
import { setRaces, startRacesDownload } from "../actionCreators";

type DownloadAllRaces = () => (dispatch: Dispatch) => void;
type DownloadAllRacesFactory = (
  downloadRaces: DownloadRaces,
  setMessageUrl: SetMessageUrl
) => DownloadAllRaces;

export const downloadAllRacesFactory: DownloadAllRacesFactory = (
  downloadRacesFunc,
  setMessageUrlFunc
) => () => async dispatch => {
  dispatch(startRacesDownload());
  try {
    const races = await downloadRacesFunc();
    dispatch(setRaces(races));
  } catch (err) {
    dispatch(setRaces([]));
    dispatch(push(setMessageUrlFunc({ message: err.message, isError: true })));
  }
};

export const downloadAllRaces: DownloadAllRaces = downloadAllRacesFactory(
  downloadRaces,
  setMessageUrl
);
