import * as React from "react";
import { RaceInformationFactory } from "../../../containers/components/Path/RaceInformationFactory";
import { GetReadableDateContainer } from "../../../containers/logic/utilsContainers";

interface Props {
  readonly totalDistance: number;
  readonly totalTimeSecs: number;
  readonly avgSpeed: number;
  readonly lastTimeCheck: number;
  readonly raceType: string;
  readonly toLocaleDate: GetReadableDateContainer;
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
