import * as React from "react";
import { Race } from "../../common_files/interfaces";
import OngoingRaceInfo from "./OngoingRaceInfo";

interface Props {
  readonly race: Race;
  readonly raceInProgress: boolean;
  readonly stopWatcher: (race: Race) => void;
}

export const PathWatcher = (props: Props) => {
  if (!props.raceInProgress) {
    return <div>There is no race in progress</div>;
  }
  const stopButton = (
    <button className="blue" onClick={props.stopWatcher.bind(null, props.race)}>
      Finish
    </button>
  );
  if (props.race.path.length === 0) {
    return (
      <div>
        <div>geo location is initializing</div>
        {stopButton}
      </div>
    );
  }
  const lastPosition = props.race.path[props.race.path.length - 1];
  return (
    <div>
      <OngoingRaceInfo race={props.race} lastTimeCheck={lastPosition.time} />
      {stopButton}
    </div>
  );
};
