import { PathWatcherView } from './PathWatcherView';
import * as React from 'react';
import { Race } from '../common_files/interfaces';
import { getRaceInfoFactory } from './pathUtilsFactories';

interface Props {
  race: Race;
  stopWatcher: () => Promise<{}>;
}

const toLocaleTime = (time: number) => new Date(time).toLocaleTimeString();

export const PathWatcherViewFactory = (props: Props) => {
  return (
    <PathWatcherView
      race={props.race}
      getRaceInfo={getRaceInfoFactory}
      stopWatcher={props.stopWatcher}
      toLocaleTime={toLocaleTime}
    />
  );
};