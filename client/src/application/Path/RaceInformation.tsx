import * as React from 'react';
import { HumanizeDurationFactory } from '../../factories/utilsFactories';

interface Props {
  totalDistance: number;
  totalTimeSecs: number;
  avgSpeed: number;
  humanizeDuration: HumanizeDurationFactory;
}

export const RaceInformation = (props: Props) => {
  const speedPrecision = 100;
  const speed = Math.round(props.avgSpeed * speedPrecision) / speedPrecision;
  return (
    <>
      <li>Total distance is {props.totalDistance} metres</li>
      <li>Total time is {props.humanizeDuration(props.totalTimeSecs)}</li>
      <li>Average speed is {speed} kmh</li>
    </>
  );
};