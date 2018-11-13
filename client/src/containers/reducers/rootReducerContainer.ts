import { connectRouter } from "connected-react-router";
import { History } from "history";
import { AnyAction } from "../../application/actions/actions";
import { changeRaceTypeReducer } from "../../application/reducers/changeRaceTypeReducer";
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

type RootReducerContainer = (
  state: GlobalState,
  action: AnyAction
) => GlobalState;

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
    toggleSavingReducer,
    changeRaceTypeReducer
  ]);

export default (history: History) => (
  state: GlobalState,
  action: AnyAction
): GlobalState => {
  if (action.type !== "@@router/LOCATION_CHANGE") {
    return rootReducerContainer(state, action);
  }
  return { ...state, router: connectRouter(history)(state.router, action) };
};
