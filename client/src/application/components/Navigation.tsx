import React from "react";
import { RaceType } from "../actions/actions";

export interface NavigationStateProps {
  readonly raceInProgress: boolean;
  readonly raceType: RaceType;
}

export interface NavigationDispatchProps {
  readonly startRaceBlock: () => void;
  readonly detailedRaceStats: () => void;
  readonly overallRaceStats: () => void;
  readonly currentRaceBlock: (raceType: RaceType) => void;
}

type Props = NavigationDispatchProps & NavigationStateProps;

export const Navigation = (props: Props) => {
  const currentRaceButton = (
    <button
      className="blue"
      id="show_current_race"
      onClick={props.currentRaceBlock.bind(null, props.raceType)}
    >
      Current race
    </button>
  );
  const startRaceButton = (
    <button className="blue" id="start_race" onClick={props.startRaceBlock}>
      Start race
    </button>
  );
  return (
    <div id="navigation">
      {props.raceInProgress ? currentRaceButton : startRaceButton}
      <button
        className="blue"
        id="show_detailed_stats"
        onClick={props.detailedRaceStats}
      >
        Detailed map stats
      </button>
      <button
        className="blue"
        id="show_overall_stats"
        onClick={props.overallRaceStats}
      >
        Overall stats
      </button>
    </div>
  );
};
