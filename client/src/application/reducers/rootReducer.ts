import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers, Reducer } from "redux";
import { AnyAction } from "../actions/actions";
import raceInProgress, { RaceInProgressState } from "./raceInProgressReducer";
import racesOnMap, { RacesOnMapState } from "./racesOnMapReducer";
import registration, { RegistrationState } from "./registrationReducer";
import user, { UserState } from "./userReducer";

export interface GlobalState {
  readonly raceInProgress: RaceInProgressState;
  readonly router: RouterState;
  readonly racesOnMap: RacesOnMapState;
  readonly user: UserState;
  readonly registration: RegistrationState;
}

type RootReducerFactory = (history: History) => Reducer<GlobalState, AnyAction>;

const rootReducerFactory: RootReducerFactory = history =>
  combineReducers({
    router: connectRouter(history),
    raceInProgress,
    racesOnMap,
    user,
    registration
  });

export default rootReducerFactory;
