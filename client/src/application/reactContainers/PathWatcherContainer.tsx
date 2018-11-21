import { connect } from "react-redux";
import { Dispatch } from "redux";
import { stopAndSaveRace } from "../actions/async/stopAndSaveRace";
import { Race } from "../common_files/interfaces";
import { PathWatcher } from "../components/Path/PathWatcher";
import { GlobalState } from "../reducers/rootReducer";

type MapStateToProps = (
  state: GlobalState
) => {
  readonly race: Race;
  readonly raceInProgress: boolean;
};

export const mapStateToProps: MapStateToProps = state => ({
  raceInProgress: state.raceInProgress,
  race: { type: state.raceType, path: state.positions }
});

type MapDispatchToProps = (
  dispatch: Dispatch
) => {
  stopWatcher: (race: Race) => void;
};

const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  stopWatcher: (race: Race) => stopAndSaveRace(race)(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PathWatcher);
