import * as React from "react";
import { RaceInformationFactory } from "../../../containers/components/Path/RaceInformationFactory";
import { GetReadableDateContainer } from "../../../containers/logic/utilsContainers";

interface Props {
  readonly totalDistance: number;
  readonly totalTimeSecs: number;
  readonly avgSpeed: number;
  readonly lastTimeCheck: number;
  readonly toLocaleTime: GetReadableDateContainer;
  readonly raceType: string;
}

export const OngoingRaceInfo = (props: Props) => (
  <ul>
    <li>Last time check was at {props.toLocaleTime(props.lastTimeCheck)}</li>
    <li>{props.raceType} is in progress</li>
    <RaceInformationFactory
      totalDistance={props.totalDistance}
      totalTimeSecs={props.totalTimeSecs}
      avgSpeed={props.avgSpeed}
    />
  </ul>
);
