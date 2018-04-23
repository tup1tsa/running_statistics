import * as React from 'react';

interface Props {
  latitude: number;
  longitude: number;
  time: number;
  totalDistance: number;
  avgSpeed: number;
  toLocaleTime: (time: number) => string;
}

export const PathInformation = (props: Props) => {
  const time = props.toLocaleTime(props.time);
  // todo: add rounding here
  return (
    <div>
      <p>Latitude is {props.latitude}</p>
      <p>Longitude is {props.longitude}</p>
      <p>Last check was at {time}</p>
      <p>Total distance is {props.totalDistance} metres</p>
      <p>Average speed is {props.avgSpeed} kmh</p>
    </div>
  );
};