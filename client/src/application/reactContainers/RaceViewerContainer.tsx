import { connect } from "react-redux";
import { Dispatch } from "redux";
import { downloadRacesContainer } from "../../containers/logic/network/downloadRacesContainer";
import { showMessageContainer } from "../../containers/logic/routing/showMessageContainer";
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
export const mapStateToProps: MapStateToProps = state => {
  return {
    racesNumber: state.downloadedRaces ? state.downloadedRaces.length : 0,
    downloadInProgress: state.racesAreBeingDownloaded,
    downloadHasBeenCompleted: state.downloadedRaces !== undefined,
    races: state.downloadedRaces ? state.downloadedRaces : [],
    currentRaceIndex: state.currentRaceIndex,
    partialRaceStart: state.partialRaceStart,
    partialRaceFinish: state.partialRaceFinish
  };
};

type MapDispatchToProps = (
  dispatch: Dispatch
) => RaceViewerDispatchProps & RacesOnMapDispatchProps;
export const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  startDownloadingRaces: () =>
    downloadAllRaces(downloadRacesContainer, showMessageContainer)(dispatch),
  incrementRace: () => dispatch(incrementRace()),
  decrementRace: () => dispatch(decrementRace())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RaceViewer);
