import * as React from 'react';
import { RaceInformation } from './RaceInformation';

export interface ToLocaleTime {
  (time: number): string;
}

interface Props {
  totalDistance: number;
  totalTimeSecs: number;
  avgSpeed: number;
  lastTimeCheck: number;
  toLocaleTime: ToLocaleTime;
  raceType: string;
}

export const OngoingRaceInfo = (props: Props) => (
  <ul>
    <li>Last time check was at {props.toLocaleTime(props.lastTimeCheck)}</li>
    <li>{props.raceType} is in progress</li>
    <RaceInformation
      totalDistance={props.totalDistance}
      totalTimeSecs={props.totalTimeSecs}
      avgSpeed={props.avgSpeed}
    />
  </ul>
);