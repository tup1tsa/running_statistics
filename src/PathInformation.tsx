import * as React from 'react';

interface Props {
  latitude: number;
  longitude: number;
  time: number;
  totalDistance: number;
  avgSpeed: number;
}

export const PathInformation = (props: Props) => {
  const time = new Date(props.time).toLocaleTimeString();
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