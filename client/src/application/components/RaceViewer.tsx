import * as React from "react";
import RacesOnMap, {
  RacesOnMapDispatchProps,
  RacesOnMapStateProps
} from "./RacesOnMap";

export interface RaceViewerStateProps {
  readonly downloadInProgress: boolean;
  readonly downloadHasBeenCompleted: boolean;
}

export interface RaceViewerDispatchProps {
  readonly startDownloadingRaces: () => void;
}

type Props = RaceViewerStateProps &
  RaceViewerDispatchProps &
  RacesOnMapDispatchProps &
  RacesOnMapStateProps;

export const RaceViewer = (props: Props) => {
  const downloadNotifier = <p>Races are being downloaded at the moment</p>;
  if (props.downloadInProgress) {
    return downloadNotifier;
  }
  if (props.downloadHasBeenCompleted === false) {
    props.startDownloadingRaces();
    return downloadNotifier;
  }
  if (props.races.length === 0) {
    return <p>No races are available</p>;
  }
  return <RacesOnMap {...props} />;
};
