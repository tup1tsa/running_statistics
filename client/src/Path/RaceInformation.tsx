import * as React from 'react';

interface Props {
  totalDistance: number;
  totalTimeSecs: number;
  avgSpeed: number;
}

export const RaceInformation = (props: Props) => {
  const speedPrecision = 100;
  const speed = Math.round(props.avgSpeed * speedPrecision) / speedPrecision;
  // todo: convert secs to hours and minutes
  return (
    <>
      <li>Total distance is {props.totalDistance} metres</li>
      <li>Total time is {props.totalTimeSecs} seconds.</li>
      <li>Average speed is {speed} kmh</li>
    </>
  );
};