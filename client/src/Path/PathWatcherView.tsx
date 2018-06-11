import { Race } from '../common_files/interfaces';
import * as React from 'react';
import { PathInformation } from './PathInformation';
import { GetRaceInfoFactory } from './pathUtilsFactories';

interface Props {
  race: Race;
  getRaceInfo: GetRaceInfoFactory;
  stopWatcher: () => Promise<{}>;
  toLocaleTime: (time: number) => string;
}

export const PathWatcherView = (props: Props) => {
  const stopButton =  <button className="blue" onClick={props.stopWatcher}>Finish</button>;
  if (props.race.path.length === 0) {
    return (
      <div>
        <div>geo location is initializing</div>
        {stopButton}
      </div>
    );
  }
  const lastPosition = props.race.path[props.race.path.length - 1];
  const raceInfo = props.getRaceInfo(props.race);
  return (
    <div>
      <PathInformation
        raceType={props.race.type}
        lastTimeCheck={lastPosition.time}
        toLocaleTime={props.toLocaleTime}
        totalDistance={raceInfo.distance}
        totalTimeSecs={raceInfo.timeSecs}
        avgSpeed={raceInfo.averageSpeed}
      />
      {stopButton}
    </div>
  );
};