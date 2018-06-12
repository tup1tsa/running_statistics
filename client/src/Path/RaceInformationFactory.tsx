import * as React from 'react';
import { RaceInformation } from './RaceInformation';
import { humanizeDurationFactory } from '../utilsFactories';

interface Props {
  totalDistance: number;
  totalTimeSecs: number;
  avgSpeed: number;
}

export const RaceInformationFactory = (props: Props) => (
  <RaceInformation
    totalDistance={props.totalDistance}
    totalTimeSecs={props.totalTimeSecs}
    avgSpeed={props.avgSpeed}
    humanizeDuration={humanizeDurationFactory}
  />
);