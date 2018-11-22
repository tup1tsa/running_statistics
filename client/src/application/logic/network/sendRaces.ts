import { MESSAGES } from "../../common_files/config";
import { Race } from "../../common_files/interfaces";
import { NetworkRequest, networkRequest } from "./networkRequest";

interface Result {
  readonly success: boolean;
  readonly errorMessage?: string;
}

export type SendRaces = (races: ReadonlyArray<Race>) => Promise<Result>;
type SendRacesFactory = (networkRequest: NetworkRequest) => SendRaces;

export const sendRacesFactory: SendRacesFactory = networkRequestFunc => async races => {
  if (races.length === 0) {
    return { success: false, errorMessage: MESSAGES[4] };
  }
  const result = await networkRequestFunc("/saveRaces", "post", races);
  if (result.errorMessage) {
    return { success: false, errorMessage: result.errorMessage };
  }
  return { success: true };
};

export const sendRaces: SendRaces = sendRacesFactory(networkRequest);
