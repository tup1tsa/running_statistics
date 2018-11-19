import * as React from "react";
import { HumanizeDuration } from "../../logic/time/humanizeDuration";

interface Props {
  readonly totalDistance: number;
  readonly totalTimeSecs: number;
  readonly avgSpeed: number;
  readonly humanizeDuration: HumanizeDuration;
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
