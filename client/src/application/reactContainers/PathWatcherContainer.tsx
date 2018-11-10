import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  FinishRaceContainer,
  finishRaceContainer
} from "../../containers/logic/finishRaceContainer";
import {
  ShowMessageContainer,
  showMessageContainer
} from "../../containers/logic/routing/showMessageContainer";
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
};

export const mapStateToProps: MapStateToProps = state => ({
  race: { type: state.raceType, path: state.positions }
});

type MapDispatchToPropsFactory = (
  functions: {
    readonly stopAndSaveRace: StopAndSaveRace;
    readonly finishRace: FinishRaceContainer;
    readonly showMessage: ShowMessageContainer;
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
      functions.showMessage
    )(dispatch)
});

const mapDispatchToProps = mapDispatchToPropsFactory({
  stopAndSaveRace,
  finishRace: finishRaceContainer,
  showMessage: showMessageContainer
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PathWatcher);
