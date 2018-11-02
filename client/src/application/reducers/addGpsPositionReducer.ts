import { IsMiddlePointAccurateContainer } from "../../containers/logic/path/isMiddlePointAccurateContainer";
import { AnyAction } from "../actions/actions";
import { GetDistance, PositionInTime } from "../common_files/interfaces";

export interface AddGpsPositionReducerState {
  readonly positions: ReadonlyArray<PositionInTime>;
  readonly lastTimeCheck?: number;
  readonly gpsError?: string;
}

export type AddGpsPositionReducer = (
  state: AddGpsPositionReducerState,
  action: AnyAction,
  config: {
    readonly delayBetweenCallsMs: number;
    readonly minimumDistanceDiffMetres: number;
  },
  functions: {
    readonly getDistance: GetDistance;
    readonly isMiddlePointAccurate: IsMiddlePointAccurateContainer;
  }
) => AddGpsPositionReducerState;

export const addGpsPositionReducer: AddGpsPositionReducer = (
  state,
  action,
  config,
  functions
) => {
  if (action.type !== "ADD_GPS_POSITION") {
    return state;
  }
  const positionResponse = action.payload;
  const timeStamp =
    typeof positionResponse.timestamp === "number"
      ? positionResponse.timestamp
      : positionResponse.timestamp.getTime();
  const currentPosition: PositionInTime = {
    latitude: positionResponse.coords.latitude,
    longitude: positionResponse.coords.longitude,
    time: timeStamp
  };
  // it's first position. Save it anyways
  if (state.lastTimeCheck === undefined) {
    return {
      lastTimeCheck: currentPosition.time,
      positions: [currentPosition]
    };
  }
  // this position is too recent -> ignore it
  if (currentPosition.time - state.lastTimeCheck < config.delayBetweenCallsMs) {
    return state;
  }

  const savedPositionsNumber = state.positions.length;
  const lastSavedPosition = state.positions[savedPositionsNumber - 1];
  const beforeLastSavedPosition = state.positions[savedPositionsNumber - 2];
  const differenceInMetres = functions.getDistance(
    lastSavedPosition,
    currentPosition
  );
  // this position is very close to the last saved -> ignore it
  if (differenceInMetres <= config.minimumDistanceDiffMetres) {
    return { ...state, lastTimeCheck: currentPosition.time };
  }
  if (savedPositionsNumber > 1) {
    const arePositionsAccurate = functions.isMiddlePointAccurate(
      beforeLastSavedPosition,
      lastSavedPosition,
      currentPosition
    );
    // last saved position was geo location error and was corrected by
    // current position. Remove it
    if (!arePositionsAccurate) {
      return {
        lastTimeCheck: currentPosition.time,
        positions: [...state.positions, currentPosition].filter(
          position => position.time !== lastSavedPosition.time
        )
      };
    }
  }
  return {
    lastTimeCheck: currentPosition.time,
    positions: [...state.positions, currentPosition]
  };
};
