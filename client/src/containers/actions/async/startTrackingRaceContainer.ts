import { Dispatch } from "redux";
import { RaceType } from "../../../application/actions/actions";
import { startTrackingRace } from "../../../application/actions/async/startTrackingRace";

export type StartTrackingRaceContainer = (
  raceType: RaceType
) => (dispatch: Dispatch) => void;

export const startTrackingRaceContainer: StartTrackingRaceContainer = raceType =>
  startTrackingRace(raceType, navigator.geolocation);
