import * as React from 'react';
import { FinishedRaceInfo } from '../../application/Path/FinishedRaceInfo';
import { getReadableDateFactory } from '../utilsFactories';

interface Props {
  totalDistance: number;
  totalTimeSecs: number;
  avgSpeed: number;
  lastTimeCheck: number;
  raceType: string;
}

export const FinishedRaceInfoFactory = (props: Props) => (
  <FinishedRaceInfo
    totalDistance={props.totalDistance}
    totalTimeSecs={props.totalTimeSecs}
    avgSpeed={props.avgSpeed}
    lastTimeCheck={props.lastTimeCheck}
    raceType={props.raceType}
    toLocaleDate={getReadableDateFactory}
  />
);