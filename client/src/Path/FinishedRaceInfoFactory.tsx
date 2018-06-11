import * as React from 'react';
import { FinishedRaceInfo } from './FinishedRaceInfo';

interface Props {
  totalDistance: number;
  totalTimeSecs: number;
  avgSpeed: number;
  lastTimeCheck: number;
  raceType: string;
}

const toLocaleTime = (time: number) => new Date().toLocaleString('en-GB');

export const FinishedRaceInfoFactory = (props: Props) => (
  <FinishedRaceInfo
    totalDistance={props.totalDistance}
    totalTimeSecs={props.totalTimeSecs}
    avgSpeed={props.avgSpeed}
    lastTimeCheck={props.lastTimeCheck}
    raceType={props.raceType}
    toLocaleDate={toLocaleTime}
  />
);