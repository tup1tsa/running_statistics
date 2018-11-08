import * as React from "react";

export interface NavigationProps {
  readonly startRaceBlock: () => void;
  readonly detailedRaceStats: () => void;
  readonly overallRaceStats: () => void;
}

export const Navigation = (props: NavigationProps) => (
  <div id="navigation">
    <button className="blue" id="start_race" onClick={props.startRaceBlock}>
      Start race
    </button>
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
