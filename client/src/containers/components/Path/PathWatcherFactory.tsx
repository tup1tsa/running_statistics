import * as GeoLib from "geolib";
import * as React from "react";
import { PathWatcher } from "../../../application/components/Path/PathWatcher";
import { isMiddlePointAccurate } from "../../../application/logic/pathUtils";
import { FinishRaceContainer } from "../../logic/finishRaceContainer";

interface Props {
  readonly raceType: string;
  readonly minimumDistanceDiff: number;
  readonly delaySecs: number;
  readonly saveRace: FinishRaceContainer;
  readonly setSaveResult: (message: string) => void;
}

export const PathWatcherFactory = (props: Props) => (
  <PathWatcher
    {...props}
    geoLocation={navigator.geolocation}
    getDistance={GeoLib.getDistance}
    isMiddlePointAccurate={isMiddlePointAccurate}
    setSaveResult={props.setSaveResult}
  />
);
