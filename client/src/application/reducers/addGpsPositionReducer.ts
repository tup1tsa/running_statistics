import { AnyAction } from "../actions/actions";
import {
  delayBetweenGeoCalls,
  minimumDistanceDiffBetweenPositions
} from "running_app_core";
import { GetDistance, PositionInTime } from "running_app_core";
import { getDistance } from "../logic/geoLibHelpers";
import {
  IsMiddlePointAccurate,
  isMiddlePointAccurate
} from "../logic/path/isMiddlePointAccurate";
import { GlobalState } from "./rootReducer";

type State = Pick<GlobalState, "positions" | "lastTimeCheck" | "gpsError">;

type AddGpsPositionReducer = (state: State, action: AnyAction) => State;
type AddGpsPositionReducerFactory = (
  config: {
    readonly delayBetweenCallsMs: number;
    readonly minimumDistanceDiffMetres: number;
  },
  functions: {
    readonly getDistance: GetDistance;
    readonly isMiddlePointAccurate: IsMiddlePointAccurate;
  }
) => AddGpsPositionReducer;

export const addGpsPositionReducerFactory: AddGpsPositionReducerFactory = (
  config,
  functions
) => (state, action) => {
  if (action.type !== "ADD_GPS_POSITION") {
    return state;
  }
  const positionResponse = action.payload;
  const timeStamp =
    typeof positionResponse.timestamp === "number"
      ? positionResponse.timestamp
      : // timestamp should be a number, but it is Date in UC mini browser
        // @ts-ignore
        positionResponse.timestamp.getTime();
  const currentPosition: PositionInTime = {
    latitude: positionResponse.coords.latitude,
    longitude: positionResponse.coords.longitude,
    time: timeStamp
  };
  // it's first position. Save it anyways
  if (state.lastTimeCheck === null) {
    return {
      lastTimeCheck: currentPosition.time,
      positions: [currentPosition],
      gpsError: null
    };
  }
  // this position is too recent -> ignore it
  if (currentPosition.time - state.lastTimeCheck < config.delayBetweenCallsMs) {
    return { ...state, gpsError: null };
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
    return { ...state, lastTimeCheck: currentPosition.time, gpsError: null };
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
        gpsError: null,
        lastTimeCheck: currentPosition.time,
        positions: [...state.positions, currentPosition].filter(
          position => position.time !== lastSavedPosition.time
        )
      };
    }
  }
  return {
    gpsError: null,
    lastTimeCheck: currentPosition.time,
    positions: [...state.positions, currentPosition]
  };
};

export const addGpsPositionReducer: AddGpsPositionReducer = (state, action) =>
  addGpsPositionReducerFactory(
    {
      delayBetweenCallsMs: delayBetweenGeoCalls,
      minimumDistanceDiffMetres: minimumDistanceDiffBetweenPositions
    },
    {
      isMiddlePointAccurate,
      getDistance
    }
  )(state, action);
