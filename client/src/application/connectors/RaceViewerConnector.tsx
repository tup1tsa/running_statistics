import { connect } from "react-redux";
import { Dispatch } from "redux";
import { decrementRace, incrementRace } from "../actions/actionCreators";
import { downloadAllRaces } from "../actions/async/downloadAllRaces";
import {
  RacesOnMapDispatchProps,
  RacesOnMapStateProps
} from "../components/RacesOnMap";
import {
  RaceViewer,
  RaceViewerDispatchProps,
  RaceViewerStateProps
} from "../components/RaceViewer";
import { GlobalState } from "../reducers/rootReducer";

type MapStateToProps = (
  state: GlobalState
) => RaceViewerStateProps & RacesOnMapStateProps;
export const mapStateToProps: MapStateToProps = ({ racesOnMap }) => {
  return {
    racesNumber: racesOnMap.downloadedRaces
      ? racesOnMap.downloadedRaces.length
      : 0,
    downloadInProgress: racesOnMap.racesAreBeingDownloaded,
    downloadHasBeenCompleted: racesOnMap.downloadedRaces !== undefined,
    races: racesOnMap.downloadedRaces ? racesOnMap.downloadedRaces : [],
    currentRaceIndex: racesOnMap.currentRaceIndex,
    partialRaceStart: racesOnMap.partialRaceStart,
    partialRaceFinish: racesOnMap.partialRaceFinish
  };
};

type MapDispatchToProps = (
  dispatch: Dispatch
) => RaceViewerDispatchProps & RacesOnMapDispatchProps;
export const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  startDownloadingRaces: () => downloadAllRaces()(dispatch),
  incrementRace: () => dispatch(incrementRace()),
  decrementRace: () => dispatch(decrementRace())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RaceViewer);
