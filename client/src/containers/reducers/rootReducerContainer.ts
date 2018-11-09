import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { AnyAction } from "../../application/actions/actions";
import { decrementRaceReducer } from "../../application/reducers/decrementRaceReducer";
import { gpsErrorReducer } from "../../application/reducers/gpsErrorReducer";
import { incrementRaceReducer } from "../../application/reducers/incrementRaceReducer";
import {
  GlobalState,
  rootReducer
} from "../../application/reducers/rootReducer";
import { setRacesReducer } from "../../application/reducers/setRacesReducer";
import { startRaceReducer } from "../../application/reducers/startRaceReducer";
import { startRacesDownloadReducer } from "../../application/reducers/startRacesDownloadReducer";
import { toggleSavingReducer } from "../../application/reducers/toggleSavingReducer";
import { addGpsPositionReducerContainer } from "./addGpsPositionReducerContainer";
import { stopGpsReducerContainer } from "./stopGpsReducerContainer";

export type RootReducerContainer = (
  state: GlobalState,
  action: AnyAction
) => GlobalState;

export const history = createBrowserHistory();

const rootReducerContainer: RootReducerContainer = (state, action) =>
  rootReducer(state, action, [
    addGpsPositionReducerContainer,
    decrementRaceReducer,
    gpsErrorReducer,
    incrementRaceReducer,
    setRacesReducer,
    startRaceReducer,
    startRacesDownloadReducer,
    stopGpsReducerContainer,
    toggleSavingReducer
  ]);

export default (state: GlobalState, action: AnyAction): GlobalState => {
  const nextState = rootReducerContainer(state, action);
  return {
    ...nextState,
    // for some reason connectRouter(history) returns function which expects
    // router state and action, but it typed as it expects reducer
    // @ts-ignore
    router: connectRouter(history)(nextState.router, action)
  };
};
