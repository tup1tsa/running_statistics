import { PathWatcherView } from './PathWatcherView';
import * as React from 'react';
import { Race } from '../common_files/interfaces';
import { getRaceInfoFactory } from './pathUtilsFactories';
import { getReadableDateFactory } from '../utilsFactories';

interface Props {
  race: Race;
  stopWatcher: () => Promise<{}>;
}

export const PathWatcherViewFactory = (props: Props) => {
  return (
    <PathWatcherView
      race={props.race}
      getRaceInfo={getRaceInfoFactory}
      stopWatcher={props.stopWatcher}
      toLocaleTime={getReadableDateFactory}
    />
  );
};