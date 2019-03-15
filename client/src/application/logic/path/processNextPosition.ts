import {
  delayBetweenGeoCalls,
  GetDistance,
  minimumDistanceDiffBetweenPositions,
  PositionInTime
} from "running_app_core";
import { getDistance } from "../geoLibHelpers";
import {
  IsMiddlePointAccurate,
  isMiddlePointAccurate
} from "./isMiddlePointAccurate";

interface State {
  readonly lastTimeCheck: null | number;
  readonly positions: ReadonlyArray<PositionInTime>;
}

export type ProcessNextPosition = (state: State, position: Position) => State;
type ProcessNextPositionFactory = (
  config: {
    readonly delayBetweenCallsMs: number;
    readonly minimumDistanceDiffMetres: number;
  },
  functions: {
    readonly getDistance: GetDistance;
    readonly isMiddlePointAccurate: IsMiddlePointAccurate;
  }
) => ProcessNextPosition;

export const processNextPositionFactory: ProcessNextPositionFactory = (
  config,
  functions
) => (state, nextPosition) => {
  const positionResponse = nextPosition;
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
      positions: [currentPosition]
    };
  }
  // this position is too recent -> ignore it
  if (currentPosition.time - state.lastTimeCheck < config.delayBetweenCallsMs) {
    return { ...state };
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

export const processNextPosition = processNextPositionFactory(
  {
    delayBetweenCallsMs: delayBetweenGeoCalls,
    minimumDistanceDiffMetres: minimumDistanceDiffBetweenPositions
  },
  {
    isMiddlePointAccurate,
    getDistance
  }
);
