import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { AnyAction } from "../../application/actions/actions";
import { gpsErrorReducer } from "../../application/reducers/gpsErrorReducer";
import {
  GlobalState,
  rootReducer
} from "../../application/reducers/rootReducer";
import { savingErrorReducer } from "../../application/reducers/savingErrorReducer";
import { showSavingMessageReducer } from "../../application/reducers/showSavingMessageReducer";
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
    savingErrorReducer,
    showSavingMessageReducer,
    startRaceReducer,
    stopGpsReducerContainer,
    toggleSavingReducer
  ]);

export default (state: GlobalState, action: AnyAction): GlobalState => ({
  ...rootReducerContainer(state, action),
  ...connectRouter(history)(rootReducerContainer)
});
