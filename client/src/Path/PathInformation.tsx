import * as React from 'react';

interface Props {
  runningType:  string;
  time: number;
  totalDistance: number;
  avgSpeed: number;
  toLocaleTime: (time: number) => string;
}

export const PathInformation = (props: Props) => {
  const time = props.toLocaleTime(props.time);
  const speedPrecision = 100;
  const speed = Math.round(props.avgSpeed * speedPrecision) / speedPrecision;
  let runTypeUppercase = props.runningType
    .split('')
    .map((letter, index) => index === 0 ? letter.toUpperCase() : letter)
    .join('');
  return (
    <ul>
      <li>{runTypeUppercase} is in progress.</li>
      <li>Last check was at {time}</li>
      <li>Total distance is {props.totalDistance} metres</li>
      <li>Average speed is {speed} kmh</li>
    </ul>
  );
};