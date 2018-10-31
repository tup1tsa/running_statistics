import * as React from "react";
import { RaceInformationFactory } from "../../factories/Path/RaceInformationFactory";
import { GetReadableDateFactory } from "../../factories/utilsFactories";

interface Props {
  readonly totalDistance: number;
  readonly totalTimeSecs: number;
  readonly avgSpeed: number;
  readonly lastTimeCheck: number;
  readonly raceType: string;
  readonly toLocaleDate: GetReadableDateFactory;
}

export const FinishedRaceInfo = (props: Props) => (
  <ul>
    <li>Date: {props.toLocaleDate(props.lastTimeCheck)}</li>
    <li>Race type: {props.raceType}</li>
    <RaceInformationFactory
      totalDistance={props.totalDistance}
      totalTimeSecs={props.totalTimeSecs}
      avgSpeed={props.avgSpeed}
    />
  </ul>
);
