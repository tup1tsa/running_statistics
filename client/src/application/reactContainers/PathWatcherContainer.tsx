import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  FinishRaceContainer,
  finishRaceContainer
} from "../../containers/logic/finishRaceContainer";
import { getRaceInfoContainer } from "../../containers/logic/path/getRaceInfoContainer";
import { getReadableDateContainer } from "../../containers/logic/utilsContainers";
import {
  StopAndSaveRace,
  stopAndSaveRace
} from "../actions/async/stopAndSaveRace";
import { Race } from "../common_files/interfaces";
import { PathWatcherView } from "../components/Path/PathWatcherView";
import { SetMessageUrl, setMessageUrl } from "../logic/setMessageUrl";
import { humanizeDuration } from "../logic/utils";
import { GlobalState } from "../reducers/rootReducer";

type MapStateToProps = (state: GlobalState) => { readonly race: Race };

export const mapStateToProps: MapStateToProps = state => ({
  race: { type: state.raceType, path: state.positions },
  getRaceInfo: getRaceInfoContainer,
  toLocaleTime: getReadableDateContainer,
  humanizeDuration
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
)(PathWatcherView);
