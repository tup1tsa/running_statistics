import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { AnyAction } from "../../application/actions/actions";
import { gpsErrorReducer } from "../../application/reducers/gpsErrorReducer";
import {
  GlobalState,
  rootReducer
} from "../../application/reducers/rootReducer";

import { startRaceReducer } from "../../application/reducers/startRaceReducer";
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
    gpsErrorReducer,
    startRaceReducer,
    stopGpsReducerContainer,
    toggleSavingReducer
  ]);

export default (state: GlobalState, action: AnyAction): GlobalState => {
  const nextState = rootReducerContainer(state, action);
  return {
    ...nextState,
    // for some reason connectRouter(history) return function which expects
    // router state and action, but it typed as it expects reducer
    // @ts-ignore
    router: connectRouter(history)(nextState.router, action)
  };
};
