import * as React from "react";
import { Race } from "../../../application/common_files/interfaces";
import { PathWatcherView } from "../../../application/components/Path/PathWatcherView";
import { getRaceInfoContainer } from "../../logic/path/getRaceInfoContainer";
import {
  getLocalTimeContainer,
  humanizeDurationContainer
} from "../../logic/utilsContainers";

interface Props {
  readonly race: Race;
  readonly stopWatcher: () => Promise<{}>;
}

export const PathWatcherViewFactory = (props: Props) => {
  return (
    <PathWatcherView
      humanizeDuration={humanizeDurationContainer}
      race={props.race}
      getRaceInfo={getRaceInfoContainer}
      stopWatcher={props.stopWatcher}
      toLocaleTime={getLocalTimeContainer}
    />
  );
};
