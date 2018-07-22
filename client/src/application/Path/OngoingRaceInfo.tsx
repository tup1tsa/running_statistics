import * as React from 'react';
import { RaceInformationFactory } from '../../factories/Path/RaceInformationFactory';
import { GetReadableDateFactory } from '../../factories/utilsFactories';

interface Props {
  totalDistance: number;
  totalTimeSecs: number;
  avgSpeed: number;
  lastTimeCheck: number;
  toLocaleTime: GetReadableDateFactory;
  raceType: string;
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