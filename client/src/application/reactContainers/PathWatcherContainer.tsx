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
  getReadableDateContainer,
  GetReadableDateContainer,
  HumanizeDurationContainer,
  humanizeDurationContainer
} from "../../containers/logic/utilsContainers";
import {
  StopAndSaveRace,
  stopAndSaveRace
} from "../actions/async/stopAndSaveRace";
import { Race } from "../common_files/interfaces";
import { PathWatcher } from "../components/Path/PathWatcher";
import { SetMessageUrl, setMessageUrl } from "../logic/setMessageUrl";
import { GlobalState } from "../reducers/rootReducer";

type MapStateToProps = (
  state: GlobalState
) => {
  readonly race: Race;
  readonly getRaceInfo: GetRaceInfoContainer;
  readonly toLocaleTime: GetReadableDateContainer;
  readonly humanizeDuration: HumanizeDurationContainer;
};

export const mapStateToProps: MapStateToProps = state => ({
  race: { type: state.raceType, path: state.positions },
  getRaceInfo: getRaceInfoContainer,
  toLocaleTime: getReadableDateContainer,
  humanizeDuration: humanizeDurationContainer
});

type MapDispatchToPropsFactory = (
  functions: {
    readonly stopAndSaveRace: StopAndSaveRace;
    readonly finishRace: FinishRaceContainer;
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
  finishRace: finishRaceContainer,
  setMessageUrl
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PathWatcher);
