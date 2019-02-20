import { MESSAGES, Race, ValidateRaces, validateRaces } from "running_app_core";
import { NetworkRequest, networkRequest } from "./networkRequest";

export type DownloadRaces = () => Promise<ReadonlyArray<Race>>;
type DownloadRacesFactory = (
  networkRequest: NetworkRequest,
  validateRaces: ValidateRaces
) => DownloadRaces;

export const downloadRacesFactory: DownloadRacesFactory = (
  networkRequestFunc,
  validateRacesFunc
) => async () => {
  const result = await networkRequestFunc("/fetchRaces", "post");
  if (result.errorMessage) {
    throw new Error(result.errorMessage);
  }
  if (!validateRacesFunc(result.data)) {
    throw new Error(MESSAGES[8]);
  }
  return result.data;
};

export const downloadRaces: DownloadRaces = downloadRacesFactory(
  networkRequest,
  validateRaces
);
