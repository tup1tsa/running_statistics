import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  FinishRaceContainer,
  finishRaceContainer
} from "../../containers/logic/finishRaceContainer";
import {
  SetMessageUrlContainer,
  setMessageUrlContainer
} from "../../containers/logic/setMessageUrlContainer";
import {
  StopAndSaveRace,
  stopAndSaveRace
} from "../actions/async/stopAndSaveRace";
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

type MapDispatchToPropsFactory = (
  functions: {
    readonly stopAndSaveRace: StopAndSaveRace;
    readonly finishRace: FinishRaceContainer;
    readonly setMessageUrl: SetMessageUrlContainer;
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
  finishRace: finishRaceContainer,
  setMessageUrl: setMessageUrlContainer
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PathWatcher);
