import { MESSAGES, Race } from "running_app_core";
import { NetworkRequest, networkRequest } from "./networkRequest";

interface Result {
  readonly success: boolean;
  readonly errorMessage?: string;
}

export type SendRaces = (races: ReadonlyArray<Race>) => Promise<Result>;
type SendRacesFactory = (networkRequest: NetworkRequest) => SendRaces;

export const sendRacesFactory: SendRacesFactory = networkRequestFunc => async races => {
  if (races.length === 0) {
    return { success: false, errorMessage: MESSAGES.nothingToSave };
  }
  const result = await networkRequestFunc("/saveRaces", "post", races);
  if (result.errorMessage) {
    return { success: false, errorMessage: result.errorMessage };
  }
  return { success: true };
};

export const sendRaces: SendRaces = sendRacesFactory(networkRequest);
