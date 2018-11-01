import * as React from "react";
import {
  GetReadableDateContainer,
  HumanizeDurationContainer
} from "../../../containers/logic/utilsContainers";
import { RaceInformation } from "./RaceInformation";

interface Props {
  readonly totalDistance: number;
  readonly totalTimeSecs: number;
  readonly avgSpeed: number;
  readonly lastTimeCheck: number;
  readonly toLocaleTime: GetReadableDateContainer;
  readonly raceType: string;
  readonly humanizeDuration: HumanizeDurationContainer;
}

export const OngoingRaceInfo = (props: Props) => (
  <ul>
    <li>Last time check was at {props.toLocaleTime(props.lastTimeCheck)}</li>
    <li>{props.raceType} is in progress</li>
    <RaceInformation
      totalDistance={props.totalDistance}
      totalTimeSecs={props.totalTimeSecs}
      avgSpeed={props.avgSpeed}
      humanizeDuration={props.humanizeDuration}
    />
  </ul>
);
