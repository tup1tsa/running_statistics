import * as React from 'react';

interface Props {
  time: number;
  totalDistance: number;
  avgSpeed: number;
  toLocaleTime: (time: number) => string;
}

export const PathInformation = (props: Props) => {
  const time = props.toLocaleTime(props.time);
  const speedPrecision = 100;
  const speed = Math.round(props.avgSpeed * speedPrecision) / speedPrecision;
  return (
    <ul>
      <li>Last check was at {time}</li>
      <li>Total distance is {props.totalDistance} metres</li>
      <li>Average speed is {speed} kmh</li>
    </ul>
  );
};