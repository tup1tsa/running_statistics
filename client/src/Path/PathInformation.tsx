import * as React from 'react';

interface Props {
  raceType:  string;
  lastTimeCheck: number;
  totalDistance: number;
  totalTimeSecs: number;
  avgSpeed: number;
  toLocaleTime: (time: number) => string;
}

export const PathInformation = (props: Props) => {
  const time = props.toLocaleTime(props.lastTimeCheck);
  const speedPrecision = 100;
  const speed = Math.round(props.avgSpeed * speedPrecision) / speedPrecision;
  let raceTypeUpperCase = props.raceType
    .split('')
    .map((letter, index) => index === 0 ? letter.toUpperCase() : letter)
    .join('');
  return (
    <ul>
      <li>{raceTypeUpperCase} is in progress.</li>
      <li>Last check was at {time}</li>
      <li>Total distance is {props.totalDistance} metres</li>
      <li>Total time is {props.totalTimeSecs} seconds.</li>
      <li>Average speed is {speed} kmh</li>
    </ul>
  );
};