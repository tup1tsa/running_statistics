import { push } from "connected-react-router";
import { Dispatch } from "redux";
import {
  EncodeMessageToUrl,
  encodeMessageToUrl
} from "../../logic/encodeMessageToUrl";
import {
  DownloadRaces,
  downloadRaces
} from "../../logic/network/downloadRaces";
import { setRaces, startRacesDownload } from "../actionCreators";

type DownloadAllRaces = () => (dispatch: Dispatch) => void;
type DownloadAllRacesFactory = (
  downloadRaces: DownloadRaces,
  encodeMessageToUrl: EncodeMessageToUrl
) => DownloadAllRaces;

export const downloadAllRacesFactory: DownloadAllRacesFactory = (
  downloadRacesFunc,
  encodeMessageToUrlFunc
) => () => async dispatch => {
  dispatch(startRacesDownload());
  try {
    const races = await downloadRacesFunc();
    dispatch(setRaces(races));
  } catch (err) {
    dispatch(setRaces([]));
    dispatch(
      push(encodeMessageToUrlFunc({ message: err.message, isError: true }))
    );
  }
};

export const downloadAllRaces: DownloadAllRaces = downloadAllRacesFactory(
  downloadRaces,
  encodeMessageToUrl
);
