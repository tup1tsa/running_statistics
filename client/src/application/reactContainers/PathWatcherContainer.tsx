import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  FinishRaceContainer,
  finishRaceContainer
} from "../../containers/logic/finishRaceContainer";
import {
  getRaceInfoContainer,
  GetRaceInfoContainer
} from "../../containers/logic/path/getRaceInfoContainer";
import {
  ShowMessageContainer,
  showMessageContainer
} from "../../containers/logic/routing/showMessageContainer";
import {
  GetLocalTimeContainer,
  getLocalTimeContainer,
  HumanizeDurationContainer,
  humanizeDurationContainer
} from "../../containers/logic/utilsContainers";
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
  readonly getRaceInfo: GetRaceInfoContainer;
  readonly toLocaleTime: GetLocalTimeContainer;
  readonly humanizeDuration: HumanizeDurationContainer;
};

export const mapStateToProps: MapStateToProps = state => ({
  race: { type: state.raceType, path: state.positions },
  getRaceInfo: getRaceInfoContainer,
  // todo: use custom function to show how long ago last gps check was
  // e.g, 5 mins ago or 12 secs ago
  toLocaleTime: getLocalTimeContainer,
  humanizeDuration: humanizeDurationContainer
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
