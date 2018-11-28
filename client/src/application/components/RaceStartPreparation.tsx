import React from "react";
import { RaceType } from "../actions/actions";

export interface RaceStartPreparationProps {
  readonly startTrackingRace: (race: RaceType) => void;
}

export const RaceStartPreparation = (props: RaceStartPreparationProps) => (
  <div>
    <button
      className="blue"
      id="start_walking"
      onClick={props.startTrackingRace.bind(null, "walking")}
    >
      Walking
    </button>
    <button
      className="blue"
      id="start_running"
      onClick={props.startTrackingRace.bind(null, "running")}
    >
      Running
    </button>
    <button
      className="blue"
      id="start_cycling"
      onClick={props.startTrackingRace.bind(null, "cycling")}
    >
      Cycling
    </button>
    <button
      className="blue"
      id="start_driving"
      onClick={props.startTrackingRace.bind(null, "driving")}
    >
      Driving
    </button>
  </div>
);
