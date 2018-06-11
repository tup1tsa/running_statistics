import * as React from 'react';
import { RaceInformation } from './RaceInformation';

export interface ToLocaleDate {
  (time: number): string;
}

interface Props {
  totalDistance: number;
  totalTimeSecs: number;
  avgSpeed: number;
  lastTimeCheck: number;
  raceType: string;
  toLocaleDate: ToLocaleDate;
}

export const FinishedRaceInfo = (props: Props) => (
  <ul>
    <li>Date: {props.toLocaleDate(props.lastTimeCheck)}</li>
    <li>Race type: {props.raceType}</li>
    <RaceInformation
      totalDistance={props.totalDistance}
      totalTimeSecs={props.totalTimeSecs}
      avgSpeed={props.avgSpeed}
    />
  </ul>
);