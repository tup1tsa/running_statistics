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
  readonly raceType: string;
  readonly toLocaleDate: GetReadableDateContainer;
  readonly humanizeDuration: HumanizeDurationContainer;
}

export const FinishedRaceInfo = (props: Props) => (
  <ul>
    <li>Date: {props.toLocaleDate(props.lastTimeCheck)}</li>
    <li>Race type: {props.raceType}</li>
    <RaceInformation
      totalDistance={props.totalDistance}
      totalTimeSecs={props.totalTimeSecs}
      avgSpeed={props.avgSpeed}
      humanizeDuration={props.humanizeDuration}
    />
  </ul>
);
