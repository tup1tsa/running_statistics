import * as React from "react";
import { Race } from "../../application/common_files/interfaces";
import { PathWatcherView } from "../../application/Path/PathWatcherView";
import { getLocalTimeFactory } from "../utilsFactories";
import { getRaceInfoFactory } from "./pathUtilsFactories";

interface Props {
  readonly race: Race;
  readonly stopWatcher: () => Promise<{}>;
}

export const PathWatcherViewFactory = (props: Props) => {
  return (
    <PathWatcherView
      race={props.race}
      getRaceInfo={getRaceInfoFactory}
      stopWatcher={props.stopWatcher}
      toLocaleTime={getLocalTimeFactory}
    />
  );
};
