import { MESSAGES, Race, ValidateRaces, validateRaces } from "running_app_core";
import { NetworkRequest, networkRequest } from "./networkRequest";

interface Races {
  races?: object[];
}

export type DownloadRaces = () => Promise<ReadonlyArray<Race>>;
type DownloadRacesFactory = (
  networkRequest: NetworkRequest,
  validateRaces: ValidateRaces
) => DownloadRaces;

export const downloadRacesFactory: DownloadRacesFactory = (
  networkRequestFunc,
  validateRacesFunc
) => async () => {
  const result = await networkRequestFunc("/fetchRaces", "get");
  if (result.errorMessage) {
    throw new Error(result.errorMessage);
  }
  // cast is used because typescript for some reason doesn't understand next:
  // if (typeof result.data === 'object' && result.data && result.data.races) {
  //   here races should be valid value
  //   but typescript response is 'races is not valid key of result.data'
  // }
  const racesObj = result.data as Races;
  if (
    typeof racesObj === "object" &&
    racesObj &&
    racesObj.races &&
    validateRacesFunc(racesObj.races)
  ) {
    return racesObj.races;
  }
  throw new Error(MESSAGES.racesAreNotValid);
};

export const downloadRaces: DownloadRaces = downloadRacesFactory(
  networkRequest,
  validateRaces
);
