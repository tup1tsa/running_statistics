import * as GeoLib from "geolib";
import * as React from "react";
import { isMiddlePointAccurate } from "../../application/Path/pathUtils";
import { PathWatcher } from "../../application/Path/PathWatcher";
import { FinishRaceFactory } from "../finishRaceFactory";

interface Props {
  readonly raceType: string;
  readonly minimumDistanceDiff: number;
  readonly delaySecs: number;
  readonly saveRace: FinishRaceFactory;
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
