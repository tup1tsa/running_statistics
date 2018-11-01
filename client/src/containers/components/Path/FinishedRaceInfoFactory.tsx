import * as React from "react";
import { FinishedRaceInfo } from "../../../application/components/Path/FinishedRaceInfo";
import {
  getReadableDateContainer,
  humanizeDurationContainer
} from "../../logic/utilsContainers";

interface Props {
  readonly totalDistance: number;
  readonly totalTimeSecs: number;
  readonly avgSpeed: number;
  readonly lastTimeCheck: number;
  readonly raceType: string;
}

export const FinishedRaceInfoFactory = (props: Props) => (
  <FinishedRaceInfo
    humanizeDuration={humanizeDurationContainer}
    totalDistance={props.totalDistance}
    totalTimeSecs={props.totalTimeSecs}
    avgSpeed={props.avgSpeed}
    lastTimeCheck={props.lastTimeCheck}
    raceType={props.raceType}
    toLocaleDate={getReadableDateContainer}
  />
);
