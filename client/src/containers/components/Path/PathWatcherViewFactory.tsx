import * as React from "react";
import { Race } from "../../../application/common_files/interfaces";
import { PathWatcherView } from "../../../application/components/Path/PathWatcherView";
import { getRaceInfoContainer } from "../../logic/pathUtilsContainers";
import { getLocalTimeContainer } from "../../logic/utilsContainers";

interface Props {
  readonly race: Race;
  readonly stopWatcher: () => Promise<{}>;
}

export const PathWatcherViewFactory = (props: Props) => {
  return (
    <PathWatcherView
      race={props.race}
      getRaceInfo={getRaceInfoContainer}
      stopWatcher={props.stopWatcher}
      toLocaleTime={getLocalTimeContainer}
    />
  );
};
