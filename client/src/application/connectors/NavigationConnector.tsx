import { push } from "connected-react-router";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { changeRaceType } from "../actions/actionCreators";
import { RaceType } from "../actions/actions";
import {
  Navigation,
  NavigationDispatchProps,
  NavigationStateProps
} from "../components/Navigation";
import { GlobalState } from "../reducers/rootReducer";

type MapStateToProps = (state: GlobalState) => NavigationStateProps;

export const mapStateToProps: MapStateToProps = state => ({
  raceInProgress: state.raceInProgress,
  raceType: state.raceType
});

type MapDispatchToProps = (dispatch: Dispatch) => NavigationDispatchProps;

export const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  startRaceBlock: () => dispatch(push("/startRace")),
  detailedRaceStats: () => dispatch(push("/detailedRaceStats")),
  overallRaceStats: () => dispatch(push("/overallRaceStats")),
  currentRaceBlock: (raceType: RaceType) => {
    dispatch(changeRaceType(raceType));
    dispatch(push("/race/" + raceType));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
