import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  StopAndSaveRace,
  stopAndSaveRace
} from "../actions/async/stopAndSaveRace";
import { Race } from "../common_files/interfaces";
import { PathWatcher } from "../components/Path/PathWatcher";
import { finishRace, FinishRace } from "../logic/finishRace";
import { SetMessageUrl, setMessageUrl } from "../logic/setMessageUrl";
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

type MapDispatchToPropsFactory = (
  functions: {
    readonly stopAndSaveRace: StopAndSaveRace;
    readonly finishRace: FinishRace;
    readonly setMessageUrl: SetMessageUrl;
  }
) => (
  dispatch: Dispatch
) => {
  stopWatcher: (race: Race) => void;
};

export const mapDispatchToPropsFactory: MapDispatchToPropsFactory = functions => dispatch => ({
  stopWatcher: (race: Race) =>
    functions.stopAndSaveRace(
      race,
      functions.finishRace,
      functions.setMessageUrl
    )(dispatch)
});

const mapDispatchToProps = mapDispatchToPropsFactory({
  stopAndSaveRace,
  finishRace,
  setMessageUrl
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PathWatcher);
