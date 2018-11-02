import * as GeoLib from "geolib";
import { AnyAction } from "../../application/actions/actions";
import {
  delayBetweenGeoCalls,
  minimumDistanceDiffBetweenPositions
} from "../../application/common_files/config";
import {
  addGpsPositionReducer,
  AddGpsPositionReducerState
} from "../../application/reducers/addGpsPositionReducer";
import { isMiddlePointAccurateContainer } from "../logic/path/isMiddlePointAccurateContainer";

export type AddGpsPositionReducerContainer = (
  state: AddGpsPositionReducerState,
  action: AnyAction
) => AddGpsPositionReducerState;

export const addGpsPositionReducerContainer: AddGpsPositionReducerContainer = (
  state,
  action
) =>
  addGpsPositionReducer(
    state,
    action,
    {
      delayBetweenCallsMs: delayBetweenGeoCalls,
      minimumDistanceDiffMetres: minimumDistanceDiffBetweenPositions
    },
    {
      isMiddlePointAccurate: isMiddlePointAccurateContainer,
      getDistance: GeoLib.getDistance
    }
  );
