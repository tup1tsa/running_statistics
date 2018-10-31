import * as React from "react";
import { RaceInformation } from "../../application/Path/RaceInformation";
import { humanizeDurationFactory } from "../utilsFactories";

interface Props {
  readonly totalDistance: number;
  readonly totalTimeSecs: number;
  readonly avgSpeed: number;
}

export const RaceInformationFactory = (props: Props) => (
  <RaceInformation
    totalDistance={props.totalDistance}
    totalTimeSecs={props.totalTimeSecs}
    avgSpeed={props.avgSpeed}
    humanizeDuration={humanizeDurationFactory}
  />
);
